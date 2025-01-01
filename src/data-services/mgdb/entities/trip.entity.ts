import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ObjectId } from 'mongodb';

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
  };

  @Column()
  is_car_pool: boolean;

  @Column()
  max_participants: number;
}
