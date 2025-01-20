import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
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

  async findAllUser() {
    const users = await this.userRepository.find();
    return users;
  }

  async deleteUser(userId: ObjectId) {
    const deletedUser = await this.userRepository.findOneBy({ _id: userId });

    if (!deletedUser) throw new AppNotFoundException('user does not exist');

    if (deletedUser.is_operator === true) {
      const trip = await this.tripRepository.findOne({
        where: { planner: deletedUser._id },
      });
      if (trip) {
        await this.tripRepository.delete({ _id: trip._id });
      }
    }

    await this.userRepository.delete({ _id: deletedUser._id });

    return deletedUser;
  }
}
