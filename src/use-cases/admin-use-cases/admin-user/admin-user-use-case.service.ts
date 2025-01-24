import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { CarPoolRequestEntity } from 'src/data-services/mgdb/entities/carpool-request.entity';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { UserOperatorRequestEntity } from 'src/data-services/mgdb/entities/user-operator-request.entity';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminUserUseCaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,

    @InjectRepository(CarPoolRequestEntity)
    private carPoolRequestRepository: Repository<CarPoolRequestEntity>,

    @InjectRepository(UserOperatorRequestEntity)
    private userOperatorRequestRepository: Repository<UserOperatorRequestEntity>,
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

    let deletedCarpoolRequest = null;

    const carpoolRequest = await this.carPoolRequestRepository.findOne({
      where: { requester: deletedUser._id },
    });

    if (carpoolRequest) {
      deletedCarpoolRequest = carpoolRequest;
      await this.carPoolRequestRepository.delete({ _id: carpoolRequest._id });
    }

    let deletedUserOperatorRequest = null;

    const userOperatorRequest =
      await this.userOperatorRequestRepository.findOne({
        where: { requester: deletedUser._id },
      });

    if (userOperatorRequest) {
      deletedUserOperatorRequest = userOperatorRequest;
      await this.userOperatorRequestRepository.delete({
        _id: userOperatorRequest._id,
      });
    }

    await this.userRepository.delete({ _id: deletedUser._id });

    return deletedUser;
  }
}
