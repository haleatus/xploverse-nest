import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ObjectId } from 'mongodb';
import { TripStatusEnum } from 'src/common/enums/trip-status.enum';

// toBeFixed :: all entities need to be fixed for mongodb specific

@Entity('trips')
export class TripEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  trip_image: ObjectId;

  @Column()
  total_trip_cost: number;

  @Column()
  planner: ObjectId;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  start_point: {
    latitude: string;
    longitude: string;
  };

  @Column()
  end_point: {
    latitude: string;
    longitude: string;
  };

  @Column()
  stops: {
    type: string;
    latitude: string;
    longitude: string;
  }[];

  @Column()
  trip_status: TripStatusEnum;

  @Column()
  is_car_pool: boolean;

  @Column()
  max_participants: number;
}
