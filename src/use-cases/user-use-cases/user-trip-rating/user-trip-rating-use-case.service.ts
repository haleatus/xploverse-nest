import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { TripRatingDto } from 'src/core/dtos/request/trip-rating.dto';
import { TripRatingEntity } from 'src/data-services/mgdb/entities/trip-rating.entity';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { MongoRepository } from 'typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';

@Injectable()
export class UserTripRatingUseCaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,

    @InjectRepository(TripEntity)
    private tripRepository: MongoRepository<TripEntity>,

    @InjectRepository(TripRatingEntity)
    private tripRatingRepository: MongoRepository<TripRatingEntity>,
  ) {}

  async createTripRating(
    rater_id: ObjectId,
    trip_id: string,
    dto: TripRatingDto,
  ): Promise<TripRatingDto> {
    const rater = await this.userRepository.findOneBy({ _id: rater_id });

    const trip = await this.tripRepository.findOneBy({
      _id: convertToObjectId(trip_id),
    });

    if (!trip) throw new AppNotFoundException('Trip does not exist');

    const existingTripRating = await this.tripRatingRepository.findOne({
      where: { rater: rater._id, trip: trip._id },
    });

    if (existingTripRating)
      throw new ConflictException('You have already given rating to this trip');

    const tripRating = this.tripRatingRepository.create({
      ...dto,
      rater: rater._id,
      trip: trip._id,
    });

    return await this.tripRatingRepository.save(tripRating);
  }

  async updateTripRating(trip_rating_id: string, dto: TripRatingDto) {
    const tripRating = await this.tripRatingRepository.findOneBy({
      _id: convertToObjectId(trip_rating_id),
    });

    if (!tripRating)
      throw new AppNotFoundException('trip rating does not exist');

    const updatedTripRating = { ...tripRating, ...dto };
    await this.tripRatingRepository.update(
      { _id: tripRating._id },
      updatedTripRating,
    );
    return updatedTripRating;
  }
}
