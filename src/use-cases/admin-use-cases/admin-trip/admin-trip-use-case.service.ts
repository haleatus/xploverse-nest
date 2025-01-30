import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { TripRatingEntity } from 'src/data-services/mgdb/entities/trip-rating.entity';
import { CarPoolRequestEntity } from 'src/data-services/mgdb/entities/carpool-request.entity';

@Injectable()
export class AdminTripUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: MongoRepository<TripEntity>,

    @InjectRepository(TripRatingEntity)
    private tripRatingRepository: MongoRepository<TripRatingEntity>,

    @InjectRepository(CarPoolRequestEntity)
    private carpoolRequestRepository: MongoRepository<CarPoolRequestEntity>,
  ) {}

  async deleteTripById(tripId: string) {
    const tripObjectId = convertToObjectId(tripId);

    // Fetch the trip details
    const deletedTrip = await this.tripRepository.findOneBy({
      _id: tripObjectId,
    });
    if (!deletedTrip) {
      throw new AppNotFoundException('Trip does not exist');
    }

    // Use Promise.all to execute deletions in parallel
    const deletePromises: Promise<any>[] = [
      // Delete trip ratings associated with the trip
      this.tripRatingRepository.delete({ trip: tripObjectId }),

      // Delete carpool requests associated with the trip
      this.carpoolRequestRepository.delete({ trip: tripObjectId }),

      // Delete the trip itself
      this.tripRepository.delete({ _id: tripObjectId }),
    ];

    // Wait for all deletions to complete
    await Promise.all(deletePromises);

    return deletedTrip;
  }
}
