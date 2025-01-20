import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminUserUseCaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,
  ) {}

  async findAllOperatorUser() {
    const users = await this.userRepository.find({
      where: { is_operator: true },
    });
    return users;
  }

  async findAllNonOperatorUser() {
    const users = await this.userRepository.find({
      where: { is_operator: false },
    });
    return users;
  }

  async deleteUser(userId: string) {
    const deletedUser = await this.userRepository.findOneBy({
      _id: convertToObjectId(userId),
    });

    if (!deletedUser) throw new AppNotFoundException('user does not exist');

    let deletedTrip = null;

    if (deletedUser.is_operator === true) {
      const trip = await this.tripRepository.findOne({
        where: { planner: deletedUser._id },
      });
      if (trip) {
        deletedTrip = trip;
        await this.tripRepository.delete({ _id: trip._id });
      }
    }

    await this.userRepository.delete({ _id: deletedUser._id });

    return deletedTrip
      ? { deletedUser: deletedUser, deletedTrip: deletedTrip }
      : { deletedUser: deletedUser };
  }
}
