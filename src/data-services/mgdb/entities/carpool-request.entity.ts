import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CarPoolStatusEnum } from 'src/common/enums/carpool-status.enum';
import { ObjectId } from 'mongodb';

@Entity('carpool_requests')
export class CarPoolRequestEntity extends BaseEntity {
  @Column()
  carpool_status: CarPoolStatusEnum;

  @Column()
  participants_count: number;

  @Column()
  trip: ObjectId;

  @Column()
  requester: ObjectId;
}
