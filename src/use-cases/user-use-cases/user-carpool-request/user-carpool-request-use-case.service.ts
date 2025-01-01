import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { CarPoolStatusEnum } from 'src/common/enums/carpool-status.enum';
import { convertToObjectId } from 'src/common/utils/convert-to-object-id';
import {
  CreateCarPoolRequestDto,
  EditCarPoolRequestDto,
} from 'src/core/dtos/request/carpool-request.dto';
import { CarPoolRequestEntity } from 'src/data-services/mgdb/entities/carpool-request.entity';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';

@Injectable()
export class UserCarPoolRequestUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,

    @InjectRepository(CarPoolRequestEntity)
    private carPoolRequestRepository: Repository<CarPoolRequestEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findCarPoolRequestsByTrip(trip_id: string) {
    const trip = await this.tripRepository.findOneBy({
      _id: convertToObjectId(trip_id),
    });
    if (!trip)
      throw new NotFoundException(
        'Carpool request by this trip does not exist',
      );

    const carpool_requests = await this.carPoolRequestRepository.find({
      where: { trip: trip._id },
    });

    return carpool_requests;
  }

  async carPoolRequestAction(
    carpool_request_id: string,
    dto: EditCarPoolRequestDto,
  ) {
    const carpoolRequest = await this.carPoolRequestRepository.findOneBy({
      _id: convertToObjectId(carpool_request_id),
    });
    if (!carpoolRequest)
      throw new NotFoundException('Carpool request does not exist');
    const updatedCarPoolRequest = {
      ...carpoolRequest,
      carpool_status: dto.carpool_status,
    };
    await this.carPoolRequestRepository.update(
      { _id: carpoolRequest._id },
      updatedCarPoolRequest,
    );
    return updatedCarPoolRequest;
  }

  async getCarPoolRequestByRequester(requester_id: ObjectId) {
    const requester = await this.userRepository.findOneBy({
      _id: requester_id,
    });

    const carpoolRequest = await this.carPoolRequestRepository.findOne({
      where: { requester: requester._id },
    });

    if (!carpoolRequest)
      throw new NotFoundException(
        'No carpool request has been made by this user',
      );

    return carpoolRequest;
  }

  async createCarPoolRequest(
    requester_id: ObjectId,
    dto: CreateCarPoolRequestDto,
  ): Promise<CarPoolRequestEntity> {
    const trip = await this.tripRepository.findOneBy({
      _id: convertToObjectId(dto.trip),
    });

    if (!trip) throw new NotFoundException('Trip to request does not exist');

    const requester = await this.userRepository.findOneBy({
      _id: requester_id,
    });

    const newCarPoolRequest = this.carPoolRequestRepository.create({
      ...dto,
      trip: trip._id,
      requester: requester._id,
      carpool_status: dto.carpool_status
        ? dto.carpool_status
        : CarPoolStatusEnum.PENDING,
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
      throw new NotFoundException('Carpool request does not exist');
    }
    const updatedCarPoolRequest = { ...carpoolRequest, ...dto };
    await this.carPoolRequestRepository.update(
      { _id: carpoolRequest._id },
      updatedCarPoolRequest,
    );
    return updatedCarPoolRequest;
  }
}
