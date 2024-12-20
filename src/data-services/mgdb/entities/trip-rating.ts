import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TripEntity } from './trip.entity';
import { UserEntity } from './user.entity';

@Entity('trip_ratings')
export class TripRatingEntity extends BaseEntity {
  @Column({
    name: 'ratings',
  })
  ratings: number;

  @Column({
    name: 'comment',
  })
  comment: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'rater_id',
  })
  rater: UserEntity;

  @ManyToOne(() => TripEntity)
  @JoinColumn({
    name: 'trip_id',
  })
  trip: TripEntity;
}
