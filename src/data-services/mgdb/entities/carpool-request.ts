import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TripEntity } from './trip.entity';
import { UserEntity } from './user.entity';
import { CarPoolStatusEnum } from 'src/common/enums/carpool-status.enum';

@Entity('carpool_requests')
export class CarPoolRequestEntity extends BaseEntity {
  @Column({
    name: 'carpool_status',
    type: 'enum',
    enum: CarPoolStatusEnum,
    default: CarPoolStatusEnum.PENDING,
    nullable: false,
  })
  carpool_status: CarPoolStatusEnum;

  @Column({
    name: 'participants_count',
  })
  participants_count: number;

  @ManyToOne(() => TripEntity)
  trip: TripEntity;

  @ManyToOne(() => UserEntity)
  requester: UserEntity;
}
