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
import { FileEntity } from 'src/data-services/mgdb/entities/file.entity';

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
    @InjectRepository(FileEntity)
    private fileRepository: MongoRepository<FileEntity>,
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
    let carPoolRequestParticipantCount = 0;
    await Promise.all(
      carpoolRequests.map((carpoolRequest) => {
        carPoolRequestParticipantCount =
          carPoolRequestParticipantCount +
          (carpoolRequest.participants_count
            ? carpoolRequest.participants_count
            : 0);
      }),
    );

    return maximumTripCapacity - carPoolRequestParticipantCount;
  }

  async getAllTripParticipantsByCarpoolRequests(
    carpoolRequests: CarPoolRequestEntity[],
  ) {
    return await Promise.all(
      carpoolRequests.map(async (carpoolRequest) => {
        const user = await this.userRepository.findOne({
          where: { _id: carpoolRequest.requester },
          select: ['username', 'email', 'phone_number', 'profile_picture'],
        });

        const profilePicture = await this.fileRepository.findOneBy({
          _id: user.profile_picture,
        });

        return { ...user, profile_picture: profilePicture };
      }),
    );
  }

  async estimateTotalPerParticipantCost(
    totalTripCost: number,
    carpoolRequests: CarPoolRequestEntity[],
  ) {
    let carPoolRequestCount = 0;
    await Promise.all(
      carpoolRequests.map((carpoolRequest) => {
        carPoolRequestCount =
          carPoolRequestCount +
          (carpoolRequest.participants_count
            ? carpoolRequest.participants_count
            : 0);
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
          select: ['username', 'email', 'phone_number', 'profile_picture'],
        });

        const tripImage = await this.fileRepository.findOneBy({
          _id: trip.trip_image,
        });

        const profilePicture = await this.fileRepository.findOneBy({
          _id: planner.profile_picture,
        });

        const plannerData = { ...planner, profile_picture: profilePicture };

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
          trip_image: tripImage,
          planner: plannerData,
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
      select: ['username', 'email', 'phone_number', 'profile_picture'],
    });

    const tripImage = await this.fileRepository.findOneBy({
      _id: trip.trip_image,
    });

    const profilePicture = await this.fileRepository.findOneBy({
      _id: planner.profile_picture,
    });

    const plannerData = { ...planner, profile_picture: profilePicture };

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

    const estimatedCostPerPerson = await this.estimateTotalPerParticipantCost(
      trip.total_trip_cost,
      carPoolRequests,
    );

    const averageRatings = await this.calculateAverateRatings(tripRatings);

    const tripParticipants =
      await this.getAllTripParticipantsByCarpoolRequests(carPoolRequests);

    return {
      ...trip,
      trip_image: tripImage,
      planner: plannerData,
      estimated_cost_per_person: estimatedCostPerPerson,
      available_seats: availableSeats,
      average_ratings: averageRatings,
      trip_participants: tripParticipants ? tripParticipants : [],
    };
  }
}

// TODO :: Refactor the findTripById method to use Promise.all for parallel processing of data

// async findTripById(id: string) {
//   const trip_id = convertToObjectId(id);

//   // Parallel fetch of trip and its ratings
//   const [trip, tripRatings] = await Promise.all([
//       this.tripRepository.findOneBy({ _id: trip_id }),
//       this.tripRatingRepository.find({
//           where: { trip: trip_id },
//       })
//   ]);

//   if (!trip) {
//       throw new AppNotFoundException('Trip does not exist');
//   }

//   // Parallel fetch of user, trip image, and carpool requests
//   const [planner, tripImage, carPoolRequests] = await Promise.all([
//       this.userRepository.findOne({
//           where: { _id: trip.planner },
//           select: ['username', 'email', 'phone_number', 'profile_picture'],
//       }),
//       this.fileRepository.findOneBy({
//           _id: trip.trip_image,
//       }),
//       this.carpoolRequestRepository.find({
//           where: {
//               trip: trip._id,
//               carpool_request_status: CarPoolRequestStatusEnum.ACCEPTED,
//           },
//       })
//   ]);

//   // Parallel processing of derived data
//   const [
//       profilePicture,
//       availableSeats,
//       estimatedCostPerPerson,
//       averageRatings,
//       tripParticipants
//   ] = await Promise.all([
//       this.fileRepository.findOneBy({
//           _id: planner.profile_picture,
//       }),
//       this.calculateAvailableSeats(
//           trip.max_participants,
//           carPoolRequests,
//       ),
//       this.estimateTotalPerParticipantCost(
//           trip.total_trip_cost,
//           carPoolRequests,
//       ),
//       this.calculateAverateRatings(tripRatings),
//       this.getAllTripParticipantsByCarpoolRequests(carPoolRequests)
//   ]);

//   const plannerData = { ...planner, profile_picture: profilePicture };

//   return {
//       ...trip,
//       trip_image: tripImage,
//       planner: plannerData,
//       estimated_cost_per_person: estimatedCostPerPerson,
//       available_seats: availableSeats,
//       average_ratings: averageRatings,
//       trip_participants: tripParticipants ? tripParticipants : [],
//   };
// }
