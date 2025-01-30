import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { UserOperatorRequestStatusEnum } from 'src/common/enums/user-operator-request-status.enum';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import { UserOperatorRequestDto } from 'src/core/dtos/request/user-operator-request.dto';
import { UserOperatorRequestEntity } from 'src/data-services/mgdb/entities/user-operator-request.entity';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class AdminUserOperatorUseCaseService {
  constructor(
    @InjectRepository(UserOperatorRequestEntity)
    private userOperatorRequestRepository: MongoRepository<UserOperatorRequestEntity>,

    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,
  ) {}

  async findAllOperatorRequest() {
    const requests = await this.userOperatorRequestRepository.find();

    return await Promise.all(
      requests.map(async (request) => {
        const requester = await this.userRepository.findOne({
          where: { _id: request.requester },
          select: ['username', 'email', 'phone_number'],
        });

        return { ...request, requester };
      }),
    );
  }

  async operatorRequestAction(
    operatorRequestId: string,
    dto: UserOperatorRequestDto,
  ) {
    const request = await this.userOperatorRequestRepository.findOneBy({
      _id: convertToObjectId(operatorRequestId),
    });

    if (!request) throw new AppNotFoundException('The request does not exist');

    const updatedRequest = {
      ...request,
      operator_request_status: dto.operator_request_status,
    };
    await this.userOperatorRequestRepository.update(
      { _id: request._id },
      updatedRequest,
    );

    if (
      dto.operator_request_status === UserOperatorRequestStatusEnum.ACCEPTED
    ) {
      const user = await this.userRepository.findOneBy({
        _id: request.requester,
      });

      const updatedUser = { ...user, is_operator: true };

      await this.userRepository.update({ _id: user._id }, updatedUser);
      return { operatorRequest: updatedRequest, user: updatedUser };
    }

    return { operatorRequest: updatedRequest };
  }
}
