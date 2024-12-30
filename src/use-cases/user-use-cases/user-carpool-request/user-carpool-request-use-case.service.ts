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
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserCarPoolUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CarPoolRequestEntity)
    private carPoolRequestRepository: Repository<CarPoolRequestEntity>,
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

  async createCarPoolRequest(
    trip_id: string,
    dto: CreateCarPoolRequestDto,
  ): Promise<CarPoolRequestEntity> {
    const trip = await this.tripRepository.findOneBy({
      _id: convertToObjectId(trip_id),
    });

    if (!trip) {
      throw new NotFoundException('Trip to request does not exist');
    }

    const newCarPoolRequest = this.carPoolRequestRepository.create({
      ...dto,
      trip: trip,
      carpool_status: dto.carpool_status ?? CarPoolStatusEnum.PENDING,
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
