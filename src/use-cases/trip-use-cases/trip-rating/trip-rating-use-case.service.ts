import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { TripRatingEntity } from 'src/data-services/mgdb/entities/trip-rating.entity';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { MongoRepository } from 'typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { FileEntity } from 'src/data-services/mgdb/entities/file.entity';

@Injectable()
export class TripRatingUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: MongoRepository<TripEntity>,

    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,

    @InjectRepository(TripRatingEntity)
    private tripRatingRepository: MongoRepository<TripRatingEntity>,

    @InjectRepository(FileEntity)
    private fileRepository: MongoRepository<FileEntity>,
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
          select: ['username', 'email', 'phone_number', 'profile_picture'],
        });
        const profilePicture = await this.fileRepository.findOneBy({
          _id: rater.profile_picture,
        });
        const raterData = { ...rater, profile_picture: profilePicture };
        return { ...tripRating, rater: raterData };
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
    const profilePicture = await this.fileRepository.findOneBy({
      _id: rater.profile_picture,
    });
    const raterData = { ...rater, profile_picture: profilePicture };

    return { ...tripRating, rater: raterData };
  }
}
