import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { TripRatingEntity } from 'src/data-services/mgdb/entities/trip-rating.entity';

@Injectable()
export class TripUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TripRatingEntity)
    private tripRatingRepository: Repository<TripRatingEntity>,
  ) {}

  async calculateAverateRatings(tripRatings: TripRatingEntity[]) {
    let count = 0;
    tripRatings.map((tripRating) => {
      count = count + tripRating.ratings;
    });

    const averageRatings = count / tripRatings.length;

    return !Number.isNaN(averageRatings) ? averageRatings : 0;
  }

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

        const tripRatings = await this.tripRatingRepository.find({
          where: { trip: trip._id },
        });

        // TODO :: why is averateRatings NaN for when there are no tripRatings for a trip :: find a better solution later

        const averageRatings = await this.calculateAverateRatings(tripRatings);

        return {
          ...trip,
          planner,
          averageRatings,
        };
      }),
    );
  }

  async findTripById(id: string) {
    const trip_id = convertToObjectId(id);
    const trip = await this.tripRepository.findOneBy({ _id: trip_id });
    if (!trip) {
      throw new AppNotFoundException('Trip does not exist');
    }
    const planner = await this.userRepository.findOne({
      where: { _id: trip.planner },
      select: ['username', 'email', 'phone_number'],
    });

    const tripRatings = await this.tripRatingRepository.find({
      where: { trip: trip._id },
    });

    const averageRatings = await this.calculateAverateRatings(tripRatings);

    return { ...trip, planner, averageRatings };
  }
}
