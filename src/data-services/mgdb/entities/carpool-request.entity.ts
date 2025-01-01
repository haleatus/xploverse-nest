import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CarPoolRequestStatusEnum } from 'src/common/enums/carpool-request-status.enum';
import { ObjectId } from 'mongodb';
import { CarPoolProgressStatusEnum } from 'src/common/enums/carpool-progess-status.enum';

@Entity('carpool_requests')
export class CarPoolRequestEntity extends BaseEntity {
  @Column()
  carpool_request_status: CarPoolRequestStatusEnum;

  @Column()
  carpool_progress_status: CarPoolProgressStatusEnum;

  @Column()
  participants_count: number;

  @Column()
  trip: ObjectId;

  @Column()
  requester: ObjectId;
}
