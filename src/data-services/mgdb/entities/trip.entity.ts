import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { TripStatusEnum } from 'src/common/enums/trip-status.enum';

@Entity('trips')
export class TripEntity extends BaseEntity {
  @Column({
    name: 'title',
  })
  title: string;

  @Column({
    name: 'description',
  })
  description: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'planner_id',
  })
  planner: UserEntity;

  @Column({
    name: 'trip_status',
    nullable: false,
  })
  trip_status: TripStatusEnum.PENDING;

  @Column('simple-json', { nullable: true })
  start_point: {
    latitude: string;
    longitude: string;
  };

  @Column('simple-json', { nullable: true })
  end_point: {
    latitude: string;
    longitude: string;
  };

  @Column({
    name: 'trip_status',
    default: false,
  })
  is_car_pool_enabled: boolean;

  @Column({
    name: 'max_participants',
  })
  max_participants: number;
}
