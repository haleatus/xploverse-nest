import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { TripRatingEntity } from 'src/data-services/mgdb/entities/trip-rating.entity';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { Repository } from 'typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';

@Injectable()
export class TripRatingUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(TripRatingEntity)
    private tripRatingRepository: Repository<TripRatingEntity>,
  ) {}

  async findTripRatingsByTrip(trip_id: string) {
    const trip = await this.tripRepository.findOneBy({
      _id: convertToObjectId(trip_id),
    });

    if (!trip) throw new AppNotFoundException('trip does not exist');

    const tripRatings = await this.tripRatingRepository.find({
      where: { trip: trip._id },
    });

    return await Promise.all(
      tripRatings.map(async (tripRating) => {
        const rater = await this.userRepository.findOne({
          where: { _id: tripRating.rater },
          select: ['username', 'email', 'phone_number'],
        });

        return { ...tripRating, rater };
      }),
    );
  }

  async findTripRatingById(trip_rating_id: string) {
    const tripRating = await this.tripRatingRepository.findOneBy({
      _id: convertToObjectId(trip_rating_id),
    });

    if (!tripRating)
      throw new AppNotFoundException('trip rating does not exist');

    const rater = await this.userRepository.findOne({
      where: { _id: tripRating.rater },
      select: ['username', 'email', 'phone_number'],
    });

    return { ...tripRating, rater };
  }
}
