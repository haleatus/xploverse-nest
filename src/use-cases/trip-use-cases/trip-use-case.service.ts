import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { TripRatingEntity } from 'src/data-services/mgdb/entities/trip-rating.entity';
import { CarPoolRequestEntity } from 'src/data-services/mgdb/entities/carpool-request.entity';
import { CarPoolRequestStatusEnum } from 'src/common/enums/carpool-request-status.enum';

@Injectable()
export class TripUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: MongoRepository<TripEntity>,
    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,
    @InjectRepository(TripRatingEntity)
    private tripRatingRepository: MongoRepository<TripRatingEntity>,
    @InjectRepository(CarPoolRequestEntity)
    private carpoolRequestRepository: MongoRepository<CarPoolRequestEntity>,
  ) {}

  async calculateAverateRatings(tripRatings: TripRatingEntity[]) {
    let count = 0;
    tripRatings.map((tripRating) => {
      count = count + tripRating.ratings;
    });

    const averageRatings = count / tripRatings.length;

    return !Number.isNaN(averageRatings) ? averageRatings : 0;
  }

  async calculateAvailableSeats(
    maximumTripCapacity: number,
    carpoolRequests: CarPoolRequestEntity[],
  ) {
    let carPoolRequestCount = 0;
    await Promise.all(
      carpoolRequests.map(() => {
        carPoolRequestCount = carPoolRequestCount + 1;
      }),
    );

    return maximumTripCapacity - carPoolRequestCount;
  }

  async estimateTotalCostPerParticipant(
    totalTripCost: number,
    carpoolRequests: CarPoolRequestEntity[],
  ) {
    let carPoolRequestCount = 0;
    await Promise.all(
      carpoolRequests.map(() => {
        carPoolRequestCount = carPoolRequestCount + 1;
      }),
    );

    if (carPoolRequestCount === 0) {
      return 0.0;
    }

    const estimatedCostPerPerson = totalTripCost / carPoolRequestCount;

    return !Number.isNaN(estimatedCostPerPerson) ? estimatedCostPerPerson : 0.0;
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

        const carPoolRequests = await this.carpoolRequestRepository.find({
          where: {
            trip: trip._id,
            carpool_request_status: CarPoolRequestStatusEnum.ACCEPTED,
          },
        });

        const availableSeats = await this.calculateAvailableSeats(
          trip.max_participants,
          carPoolRequests,
        );

        // TODO :: why is averateRatings NaN for when there are no tripRatings for a trip :: find a better solution later

        const averageRatings = await this.calculateAverateRatings(tripRatings);

        return {
          ...trip,
          planner,
          available_seats: availableSeats,
          average_ratings: averageRatings,
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

    const carPoolRequests = await this.carpoolRequestRepository.find({
      where: {
        trip: trip._id,
        carpool_request_status: CarPoolRequestStatusEnum.ACCEPTED,
      },
    });

    const availableSeats = await this.calculateAvailableSeats(
      trip.max_participants,
      carPoolRequests,
    );

    const estimatedCostPerPerson = await this.estimateTotalCostPerParticipant(
      trip.total_trip_cost,
      carPoolRequests,
    );

    const averageRatings = await this.calculateAverateRatings(tripRatings);

    return {
      ...trip,
      planner,
      estimated_cost_per_person: estimatedCostPerPerson,
      available_seats: availableSeats,
      average_ratings: averageRatings,
    };
  }
}
