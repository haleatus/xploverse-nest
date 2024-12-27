import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TripDto } from 'src/core/dtos/request/trip.dto';
import { TripStatusEnum } from 'src/common/enums/trip-status.enum';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,
  ) {}

  async findAllTrip() {
    const trips = await this.tripRepository.find();
    return trips;
  }

  async createTrip(dto: TripDto): Promise<TripEntity> {
    const newTrip = this.tripRepository.create({
      ...dto,
      trip_status: dto.trip_status ?? TripStatusEnum.PENDING,
    });
    return await this.tripRepository.save(newTrip);
  }
}
