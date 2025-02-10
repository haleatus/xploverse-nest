import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { CarPoolRequestStatusEnum } from 'src/common/enums/carpool-request-status.enum';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import {
  CreateCarPoolRequestDto,
  EditCarPoolRequestDto,
} from 'src/core/dtos/request/carpool-request.dto';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { CarPoolRequestEntity } from 'src/data-services/mgdb/entities/carpool-request.entity';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { MongoRepository } from 'typeorm';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { CarPoolProgressStatusEnum } from 'src/common/enums/carpool-progess-status.enum';
import { FileEntity } from 'src/data-services/mgdb/entities/file.entity';
import AppException from 'src/application/exception/app.exception';

@Injectable()
export class UserCarPoolRequestUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: MongoRepository<TripEntity>,

    @InjectRepository(CarPoolRequestEntity)
    private carPoolRequestRepository: MongoRepository<CarPoolRequestEntity>,

    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,

    @InjectRepository(FileEntity)
    private fileRepository: MongoRepository<FileEntity>,
  ) {}

  async findAllCarpoolRequestsByUser(userId: string) {
    const user = await this.userRepository.findOneBy({
      _id: convertToObjectId(userId),
    });
    if (!user) throw new AppNotFoundException('User does not exist');

    const profilePicture = await this.fileRepository.findOneBy({
      _id: user.profile_picture,
    });

    const requesterData = { ...user, profile_picture: profilePicture };

    const carpoolRequests = await this.carPoolRequestRepository.find({
      where: { requester: user._id },
    });

    return await Promise.all(
      carpoolRequests.map(async (carpoolRequest) => {
        const trip = await this.tripRepository.findOneBy({
          _id: carpoolRequest.trip,
        });

        return { ...carpoolRequest, trip, requester: requesterData };
      }),
    );
  }

  async findCarPoolRequestsByTrip(trip_id: string) {
    const trip = await this.tripRepository.findOneBy({
      _id: convertToObjectId(trip_id),
    });
    if (!trip)
      throw new AppNotFoundException(
        'Carpool request by this trip does not exist',
      );

    const carpoolRequests = await this.carPoolRequestRepository.find({
      where: { trip: trip._id },
    });

    return await Promise.all(
      carpoolRequests.map(async (carpoolRequest) => {
        const trip = await this.tripRepository.findOneBy({
          _id: carpoolRequest.trip,
        });
        const requester = await this.userRepository.findOne({
          where: { _id: carpoolRequest.requester },
          select: ['username', 'email', 'phone_number', 'profile_picture'],
        });

        const profilePicture = await this.fileRepository.findOneBy({
          _id: requester.profile_picture,
        });

        const requesterData = { ...requester, profile_picture: profilePicture };

        return { ...carpoolRequest, trip, requester: requesterData };
      }),
    );
  }

  async carPoolRequestAction(
    carpool_request_id: string,
    dto: EditCarPoolRequestDto,
  ) {
    const carpoolRequest = await this.carPoolRequestRepository.findOneBy({
      _id: convertToObjectId(carpool_request_id),
    });
    if (!carpoolRequest)
      throw new AppNotFoundException('Carpool request does not exist');

    const updatedCarPoolRequest = {
      ...carpoolRequest,
      carpool_request_status: dto.carpool_request_status,
    };

    updatedCarPoolRequest.carpool_progress_status = dto.carpool_request_status
      ? dto.carpool_request_status === CarPoolRequestStatusEnum.ACCEPTED
        ? CarPoolProgressStatusEnum.IN_PROGRESS
        : CarPoolProgressStatusEnum.NOT_STARTED
      : CarPoolProgressStatusEnum.NOT_STARTED;
    await this.carPoolRequestRepository.update(
      { _id: carpoolRequest._id },
      updatedCarPoolRequest,
    );

    return updatedCarPoolRequest;
  }

  async markCarPoolAsComplete(carpool_request_id: string) {
    const carpoolRequest = await this.carPoolRequestRepository.findOne({
      where: { _id: convertToObjectId(carpool_request_id) },
    });

    if (!carpoolRequest)
      throw new AppNotFoundException('Carpool request does not exist');

    if (
      carpoolRequest.carpool_request_status !==
      CarPoolRequestStatusEnum.ACCEPTED
    ) {
      throw new AppException('Carpool request has not been accepted yet');
    }

    const updatedCarPoolRequest = {
      ...carpoolRequest,
      carpool_progress_status: CarPoolProgressStatusEnum.COMPLETED,
    };

    await this.carPoolRequestRepository.update(
      { _id: carpoolRequest._id },
      updatedCarPoolRequest,
    );

    return updatedCarPoolRequest;
  }

  async getCarPoolRequestByRequester(requester_id: ObjectId) {
    const requester = await this.userRepository.findOne({
      where: {
        $or: [
          { _id: requester_id },
          {
            carpool_progress_status:
              CarPoolProgressStatusEnum.IN_PROGRESS ||
              CarPoolProgressStatusEnum.IN_PROGRESS,
          },
        ],
      },
    });

    const profilePicture = await this.fileRepository.findOneBy({
      _id: requester.profile_picture,
    });

    const requesterData = { ...requester, profile_picture: profilePicture };

    const carpoolRequest = await this.carPoolRequestRepository.findOne({
      where: { requester: requester._id },
    });

    if (!carpoolRequest)
      throw new AppNotFoundException(
        'No carpool request has been made by this user',
      );

    const trip = await this.tripRepository.findOneBy({
      _id: carpoolRequest.trip,
    });

    return { ...carpoolRequest, requester: requesterData, trip };
  }

  async createCarPoolRequest(
    requester_id: ObjectId,
    dto: CreateCarPoolRequestDto,
  ): Promise<CarPoolRequestEntity> {
    const trip = await this.tripRepository.findOneBy({
      _id: convertToObjectId(dto.trip),
    });

    if (!trip) throw new AppNotFoundException('Trip to request does not exist');

    const requester = await this.userRepository.findOneBy({
      _id: requester_id,
    });

    const carpoolRequest = await this.carPoolRequestRepository.findOne({
      where: { requester: requester._id },
    });

    if (carpoolRequest)
      throw new ConflictException('you can only make one request at a time');

    const newCarPoolRequest = this.carPoolRequestRepository.create({
      ...dto,
      trip: trip._id,
      requester: requester._id,
      carpool_request_status: dto.carpool_request_status
        ? dto.carpool_request_status
        : CarPoolRequestStatusEnum.PENDING,
      carpool_progress_status: CarPoolProgressStatusEnum.NOT_STARTED,
    });

    return await this.carPoolRequestRepository.save(newCarPoolRequest);
  }

  async updateCarPoolRequest(
    carpool_request_id: string,
    dto: EditCarPoolRequestDto,
  ) {
    const carpoolRequest = await this.carPoolRequestRepository.findOneBy({
      _id: convertToObjectId(carpool_request_id),
    });
    if (!carpoolRequest) {
      throw new AppNotFoundException('Carpool request does not exist');
    }
    const updatedCarPoolRequest = { ...carpoolRequest, ...dto };
    await this.carPoolRequestRepository.update(
      { _id: carpoolRequest._id },
      updatedCarPoolRequest,
    );
    return updatedCarPoolRequest;
  }

  async cancelCarPoolRequest(carpool_request_id: string) {
    const carpoolRequest = await this.carPoolRequestRepository.findOneBy({
      _id: convertToObjectId(carpool_request_id),
    });

    if (!carpoolRequest)
      throw new AppNotFoundException(
        'No carpool request has been made by this user',
      );

    await this.carPoolRequestRepository.delete({ _id: carpoolRequest._id });
  }
}
