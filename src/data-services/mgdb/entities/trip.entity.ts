import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { FileEntity } from './file.entity';

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

  @OneToOne(() => FileEntity, { cascade: true, eager: true })
  trip_image: FileEntity;

  @ManyToOne(() => UserEntity)
  planner: UserEntity;

  @Column({
    name: 'end_date',
  })
  end_date: Date;

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

  @Column({ type: 'jsonb', nullable: true })
  stops: {
    type: string;
    latitude: string;
    longitude: string;
  };

  @Column({
    name: 'is_car_pool',
    default: false,
  })
  is_car_pool: boolean;

  @Column({
    name: 'max_participants',
  })
  max_participants: number;
}
