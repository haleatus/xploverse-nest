import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ObjectId } from 'mongodb';

@Entity('trip_ratings')
export class TripRatingEntity extends BaseEntity {
  @Column()
  ratings: number;

  @Column()
  comment: string;

  @Column()
  rater: ObjectId;

  @Column()
  trip: ObjectId;
}
