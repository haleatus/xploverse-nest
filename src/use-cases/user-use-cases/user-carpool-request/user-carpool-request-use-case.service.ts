import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { CarPoolStatusEnum } from 'src/common/enums/carpool-status.enum';
import { convertToObjectId } from 'src/common/utils/convert-to-object-id';
import {
  CreateCarPoolRequestDto,
  EditCarPoolRequestDto,
} from 'src/core/dtos/request/carpool-request.dto';
import { CarPoolRequestEntity } from 'src/data-services/mgdb/entities/carpool-request';
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
    if (!trip) throw new NotFoundException('Trip does not exist');

    const carpool_requests = await this.carPoolRequestRepository.find({
      where: { trip: trip },
    });

    return carpool_requests;
  }

  async carPoolRequestAction(id: string, dto: EditCarPoolRequestDto) {
    const carpool_request_id = convertToObjectId(id);
    const carpool_request = await this.carPoolRequestRepository.findOneBy({
      _id: carpool_request_id,
    });
    if (!carpool_request)
      throw new NotFoundException('Carpool request does not exist');
    const updatedCarPoolRequest = {
      ...carpool_request,
      carpool_status: dto.carpool_status,
    };
    await this.carPoolRequestRepository.update(
      { _id: carpool_request_id },
      updatedCarPoolRequest,
    );
    return updatedCarPoolRequest;
  }

  async getCarPoolRequestByRequester(requester_id: ObjectId) {
    const requester = await this.userRepository.findOneBy({
      _id: requester_id,
    });

    if (!requester)
      throw new NotFoundException('Requesting user does not exist');

    const carpool_request = await this.carPoolRequestRepository.findOne({
      where: { requester: requester },
    });

    if (!carpool_request)
      throw new NotFoundException(
        'No carpool request has been made by this user',
      );

    return carpool_request;
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

    if (!requester)
      throw new NotFoundException('User to initiate request does not exist');

    const newCarPoolRequest = this.carPoolRequestRepository.create({
      ...dto,
      trip: trip,
      requester: requester,
      carpool_status: dto.carpool_status
        ? dto.carpool_status
        : CarPoolStatusEnum.PENDING,
    });

    return await this.carPoolRequestRepository.save(newCarPoolRequest);
  }

  async updateCarPoolRequest(id: string, dto: EditCarPoolRequestDto) {
    const carpool_request_id = convertToObjectId(id);
    const carpool_request = await this.carPoolRequestRepository.findOneBy({
      _id: carpool_request_id,
    });
    if (!carpool_request) {
      throw new NotFoundException('Carpool request does not exist');
    }
    const updatedCarPoolRequest = { ...carpool_request, ...dto };
    await this.carPoolRequestRepository.update(
      { _id: carpool_request_id },
      updatedCarPoolRequest,
    );
    return updatedCarPoolRequest;
  }
}
