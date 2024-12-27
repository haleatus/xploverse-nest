import { Column, Entity, OneToOne } from 'typeorm';
import { BaseUserEntity } from './base.entity';
import { FileEntity } from './file.entity';
import { VerifyUserEnum } from 'src/common/enums/verify-user.enum';

@Entity('users')
export class UserEntity extends BaseUserEntity {
  @OneToOne(() => FileEntity, { cascade: true, eager: true })
  profile_picture: FileEntity;

  @Column({
    name: 'is_verified',
    type: 'enum',
    enum: VerifyUserEnum,
    default: VerifyUserEnum.PENDING,
    nullable: false,
  })
  is_verified: VerifyUserEnum;

  @Column({ name: 'phone_number', unique: true, nullable: false })
  phone_number: string;
}
