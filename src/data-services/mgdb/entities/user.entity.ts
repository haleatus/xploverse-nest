import { Column, Entity } from 'typeorm';
import { BaseUserEntity } from './base.entity';
import { ObjectId } from 'mongodb';

@Entity('users')
export class UserEntity extends BaseUserEntity {
  @Column()
  profile_picture: ObjectId;

  @Column()
  is_operator: boolean;

  @Column()
  phone_number: string;
}
