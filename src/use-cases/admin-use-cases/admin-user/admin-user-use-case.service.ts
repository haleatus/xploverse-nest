import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { CarPoolRequestEntity } from 'src/data-services/mgdb/entities/carpool-request.entity';
import { FileEntity } from 'src/data-services/mgdb/entities/file.entity';
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

    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async findAllOperatorUser() {
    const users = await this.userRepository.find({
      where: { is_operator: true },
      select: [
        'username',
        'email',
        'is_operator',
        'phone_number',
        'profile_picture',
      ],
    });
    return await Promise.all(
      users.map(async (user) => {
        const profilePicture = await this.fileRepository.findOneBy({
          _id: user.profile_picture,
        });
        return { ...user, profile_picture: profilePicture };
      }),
    );
  }

  async findAllNonOperatorUser() {
    const users = await this.userRepository.find({
      where: { is_operator: false },
      select: [
        'username',
        'email',
        'is_operator',
        'phone_number',
        'profile_picture',
      ],
    });
    return await Promise.all(
      users.map(async (user) => {
        const profilePicture = await this.fileRepository.findOneBy({
          _id: user.profile_picture,
        });
        return { ...user, profile_picture: profilePicture };
      }),
    );
  }

  async deleteUser(userId: string) {
    const userObjectId = convertToObjectId(userId);

    // Fetch the user details
    const deletedUser = await this.userRepository.findOneBy({
      _id: userObjectId,
    });
    if (!deletedUser) throw new AppNotFoundException('user does not exist');

    // Initialize promises array
    const deletePromises: Promise<any>[] = [];

    // Handle trip deletion if the user is an operator
    if (deletedUser.is_operator) {
      deletePromises.push(
        this.tripRepository.delete({ planner: userObjectId }),
      );
    }

    // Handle carpool request deletion
    deletePromises.push(
      this.carPoolRequestRepository.delete({ requester: userObjectId }),
    );

    // Handle user operator request deletion
    deletePromises.push(
      this.userOperatorRequestRepository.delete({ requester: userObjectId }),
    );

    // Add user deletion to promises
    deletePromises.push(this.userRepository.delete({ _id: userObjectId }));

    // user files
    deletePromises.push(
      this.fileRepository.delete({ _id: deletedUser.profile_picture }),
    );

    // Wait for all deletions to complete
    await Promise.all(deletePromises);

    return deletedUser;
  }
}
