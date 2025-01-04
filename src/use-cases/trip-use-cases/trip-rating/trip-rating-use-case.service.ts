import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { TripRatingEntity } from 'src/data-services/mgdb/entities/trip-rating';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TripRatingUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,

    @InjectRepository(TripRatingEntity)
    private tripRatingRepository: Repository<TripRatingEntity>,
  ) {}

  async findTripRatingsByTrip(trip_id: string) {
    const trip = await this.tripRatingRepository.findOneBy({
      _id: convertToObjectId(trip_id),
    });

    if (!trip) throw new NotFoundException('trip does not exist');

    const tripRatings = await this.tripRatingRepository.find({
      where: { trip: trip._id },
    });

    return tripRatings;
  }

  async findTripRatingById(trip_rating_id: string) {
    const trip_rating = await this.tripRatingRepository.findOneBy({
      _id: convertToObjectId(trip_rating_id),
    });

    if (!trip_rating) throw new NotFoundException('trip rating does not exist');

    return trip_rating;
  }
}
