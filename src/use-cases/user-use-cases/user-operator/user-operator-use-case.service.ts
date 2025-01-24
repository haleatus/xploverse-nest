import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import AppException from 'src/application/exception/app.exception';
import { UserOperatorRequestStatusEnum } from 'src/common/enums/user-operator-request-status.enum';
import { UserOperatorRequestEntity } from 'src/data-services/mgdb/entities/user-operator-request.entity';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserOperatorUseCaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(UserOperatorRequestEntity)
    private userOperatorRequestRepository: Repository<UserOperatorRequestEntity>,
  ) {}

  async createOperatorRequest(
    userId: ObjectId,
  ): Promise<UserOperatorRequestEntity> {
    const user = await this.userRepository.findOneBy({ _id: userId });

    if (!user) throw new AppNotFoundException('User does not exist');

    const existingRequest = await this.userOperatorRequestRepository.findOne({
      where: { requester: user._id },
    });

    if (
      existingRequest &&
      existingRequest.operator_request_status !==
        UserOperatorRequestStatusEnum.DECLINED
    ) {
      throw new AppException('you must wait before you request is declined');
    }

    const newRequest = this.userOperatorRequestRepository.create({
      requester: userId,
      operator_request_status: UserOperatorRequestStatusEnum.PENDING,
    });

    return await this.userOperatorRequestRepository.save(newRequest);
  }
}
