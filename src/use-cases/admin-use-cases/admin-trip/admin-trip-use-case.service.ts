import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { TripRatingEntity } from 'src/data-services/mgdb/entities/trip-rating.entity';

@Injectable()
export class AdminTripUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,

    @InjectRepository(TripRatingEntity)
    private tripRatingRepository: Repository<TripRatingEntity>,
  ) {}

  async deleteTripById(tripId: string) {
    const deletedTrip = await this.tripRepository.findOneBy({
      _id: convertToObjectId(tripId),
    });
    if (!deletedTrip) {
      throw new AppNotFoundException('Trip does not exist');
    }

    let deletedTripRatings = null;

    const tripRatings = await this.tripRatingRepository.find({
      where: { trip: deletedTrip._id },
    });

    if (tripRatings && tripRatings.length !== 0) {
      deletedTripRatings = tripRatings;
      await Promise.all(
        tripRatings.map(async (tripRating) => {
          await this.tripRatingRepository.delete({ _id: tripRating._id });
        }),
      );
    }

    await this.tripRepository.delete({ _id: deletedTrip._id });

    return deletedTripRatings
      ? { deletedTrip: deletedTrip, deletedTripRatings: deletedTripRatings }
      : { deletedTrip: deletedTrip };
  }
}
