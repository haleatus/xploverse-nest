import { Column, Entity, OneToOne } from 'typeorm';
import { BaseUserEntity } from './base.entity';
import { FileEntity } from './file.entity';

@Entity('users')
export class UserEntity extends BaseUserEntity {
  @OneToOne(() => FileEntity, { cascade: true, eager: true })
  profile_picture: FileEntity;

  @Column({
    name: 'is_verified',
    nullable: false,
    default: false,
  })
  is_verified: boolean;

  @Column({ name: 'phone_number', unique: true, nullable: false })
  phone_number: string;
}
