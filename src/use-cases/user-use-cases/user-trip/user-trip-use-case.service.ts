import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { CreateTripDto, updateTripDto } from 'src/core/dtos/request/trip.dto';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { ObjectId } from 'mongodb';
import { CarPoolRequestEntity } from 'src/data-services/mgdb/entities/carpool-request.entity';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { TripStatusEnum } from 'src/common/enums/trip-status.enum';
import { TripRatingEntity } from 'src/data-services/mgdb/entities/trip-rating.entity';
import { CarPoolProgressStatusEnum } from 'src/common/enums/carpool-progess-status.enum';
import { FileEntity } from 'src/data-services/mgdb/entities/file.entity';

@Injectable()
export class UserTripUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: MongoRepository<TripEntity>,
    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,
    @InjectRepository(CarPoolRequestEntity)
    private carPoolRequestRepository: MongoRepository<CarPoolRequestEntity>,
    @InjectRepository(TripRatingEntity)
    private tripRatingRepository: MongoRepository<TripRatingEntity>,
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

  async findTripByUserCarpoolRequests(user_id: ObjectId) {
    const carpoolRequests = await this.carPoolRequestRepository.find({
      where: { requester: user_id },
    });

    const userTrips = await Promise.all(
      carpoolRequests.map(async (carpoolRequest) => {
        return await this.tripRepository.findOneBy({
          _id: carpoolRequest.trip,
        });
      }),
    );

    return await Promise.all(
      userTrips.map(async (userTrip) => {
        const planner = await this.userRepository.findOneBy({
          _id: userTrip.planner,
        });

        const tripImage = await this.fileRepository.findOneBy({
          _id: userTrip.trip_image,
        });

        const profilePicture = await this.fileRepository.findOneBy({
          _id: planner.profile_picture,
        });

        const plannerData = { ...planner, profile_picture: profilePicture };

        const tripRatings = await this.tripRatingRepository.find({
          where: { trip: userTrip._id },
        });

        const averageRatings = await this.calculateAverateRatings(tripRatings);

        return {
          ...userTrip,
          trip_image: tripImage,
          planner: plannerData,
          averageRatings,
        };
      }),
    );
  }

  async findTripsByPlanner(planner_id: ObjectId) {
    const planner = await this.userRepository.findOneBy({
      _id: planner_id,
    });

    const profilePicture = await this.fileRepository.findOneBy({
      _id: planner.profile_picture,
    });

    const plannerData = { ...planner, profile_picture: profilePicture };

    const trips = await this.tripRepository.find({
      where: { planner: planner._id },
    });

    return await Promise.all(
      trips.map(async (trip) => {
        const tripRatings = await this.tripRatingRepository.find({
          where: { trip: trip._id },
        });

        console.log(trip.trip_image);

        const tripImage = await this.fileRepository.findOneBy({
          _id: trip.trip_image,
        });

        console.log(tripImage);

        const averageRatings = await this.calculateAverateRatings(tripRatings);

        return {
          ...trip,
          trip_image: tripImage,
          planner: plannerData,
          averageRatings,
        };
      }),
    );
  }

  async createTrip(
    planner_id: ObjectId,
    dto: CreateTripDto,
  ): Promise<TripEntity> {
    const planner = await this.userRepository.findOneBy({
      _id: planner_id,
    });

    const newTrip = this.tripRepository.create({
      ...dto,
      trip_image: convertToObjectId(dto.trip_image),
      planner: planner._id,
      trip_status: TripStatusEnum.UPCOMING,
      is_car_pool: dto.is_car_pool ?? false,
    });
    return await this.tripRepository.save(newTrip);
  }

  async updateTrip(trip_id: string, dto: updateTripDto) {
    const trip = await this.tripRepository.findOneBy({
      _id: convertToObjectId(trip_id),
    });
    if (!trip) {
      throw new AppNotFoundException('Trip does not exist');
    }

    const updatedTrip = {
      ...trip,
      ...dto,
      trip_image: convertToObjectId(dto.trip_image),
    };

    if (dto?.trip_status === TripStatusEnum.COMPLETED) {
      updatedTrip.is_car_pool = false;
      const carPoolRequests = await this.carPoolRequestRepository.find({
        where: { trip: trip._id },
      });
      await Promise.all(
        carPoolRequests.map(async (carPoolRequest) => {
          await this.carPoolRequestRepository.update(
            { _id: carPoolRequest._id },
            { carpool_progress_status: CarPoolProgressStatusEnum.COMPLETED },
          );
        }),
      );
    }

    await this.tripRepository.update({ _id: trip._id }, updatedTrip);
    return updatedTrip;
  }

  async deleteTripById(trip_id: string) {
    const deletedTrip = await this.tripRepository.findOneBy({
      _id: convertToObjectId(trip_id),
    });

    if (!deletedTrip) throw new AppNotFoundException('trip not found');

    await this.tripRepository.delete({ _id: deletedTrip._id });
    return deletedTrip;
  }
}
