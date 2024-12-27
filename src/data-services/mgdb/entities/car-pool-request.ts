import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TripEntity } from './trip.entity';
import { UserEntity } from './user.entity';
import { CarPoolStatusEnum } from 'src/common/enums/trip-status.enum';

@Entity('car_pool_requests')
export class CarPoolRequestEntity {
  @Column({
    name: 'car_pool_status',
    type: 'enum',
    enum: CarPoolStatusEnum,
    nullable: false,
  })
  car_pool_status: CarPoolStatusEnum.PENDING;

  @Column({
    name: 'participants_count',
  })
  participants_count: number;

  @ManyToOne(() => TripEntity)
  @JoinColumn({
    name: 'trip_id',
  })
  trip_id: TripEntity;

  @ManyToOne(() => TripEntity)
  @JoinColumn({
    name: 'requester_id',
  })
  requester: UserEntity;
}
