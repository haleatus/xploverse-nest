import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { convertToObjectId } from 'src/common/utils/convert-to-object-id';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';

@Injectable()
export class TripUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAllTrip() {
    const trips = await this.tripRepository.find({
      where: { is_car_pool: true },
    });

    return await Promise.all(
      trips.map(async (trip) => {
        const planner = await this.userRepository.findOne({
          where: { _id: trip.planner },
          select: ['username', 'email', 'phone_number'],
        });

        return { ...trip, planner };
      }),
    );
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
