import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { convertToObjectId } from 'src/common/utils/convert-to-object-id';

@Injectable()
export class TripUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,
  ) {}

  async findAllTrip() {
    const trips = await this.tripRepository.find({
      where: { is_car_pool: true },
    });
    return trips;
  }

  async findTripById(id: string) {
    const trip_id = convertToObjectId(id);
    const trip = this.tripRepository.findOneBy({ _id: trip_id });
    if (!trip) {
      throw new NotFoundException('Trip does not exist');
    }
    return trip;
  }
}
