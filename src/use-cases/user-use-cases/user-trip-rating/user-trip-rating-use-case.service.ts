import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { convertToObjectId } from 'src/common/utils/convert-to-object-id';
import { TripRatingDto } from 'src/core/dtos/request/trip-rating.dto';
import { TripRatingEntity } from 'src/data-services/mgdb/entities/trip-rating';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserTripRatingUseCaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,

    @InjectRepository(TripRatingEntity)
    private tripRatingRepository: Repository<TripRatingEntity>,
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

    if (!trip) throw new NotFoundException('Trip does not exist');

    const tripRating = this.tripRatingRepository.create({
      ...dto,
      rater: rater._id,
      trip: trip._id,
    });

    return await this.tripRatingRepository.save(tripRating);
  }

  async updateTripRating(trip_id: string, dto: TripRatingDto) {
    const tripRating = await this.tripRatingRepository.findOneBy({
      _id: convertToObjectId(trip_id),
    });

    if (!tripRating) throw new NotFoundException('trip rating does not exist');

    const updatedTripRating = { ...tripRating, ...dto };
    await this.tripRatingRepository.update(
      { _id: tripRating._id },
      updatedTripRating,
    );
    return updatedTripRating;
  }
}
