import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ObjectId } from 'mongodb';
import { UserOperatorRequestStatusEnum } from 'src/common/enums/user-operator-request-status.enum';

@Entity('user_operator_requests')
export class UserOperatorRequestEntity extends BaseEntity {
  @Column()
  requester: ObjectId;

  @Column()
  operator_request_status: UserOperatorRequestStatusEnum;
}
