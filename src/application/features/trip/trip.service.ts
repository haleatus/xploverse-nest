import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTripDto } from 'src/core/dtos/request/trip.dto';

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

  async createTrip(dto: CreateTripDto) {
    const newTrip = this.tripRepository.create(dto);
    return await this.tripRepository.save(newTrip);
  }
}
