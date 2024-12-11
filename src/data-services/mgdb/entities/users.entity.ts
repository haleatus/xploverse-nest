import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { FileEntity } from './file.entity';
import { UserTypeEnum } from 'src/common/enums/users/user-type.enum';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column({
    name: 'username',
    unique: true,
  })
  username: string;

  @Column({
    name: 'fullname',
  })
  fullname: string;

  @OneToOne(() => FileEntity, { cascade: true, eager: true })
  @JoinColumn({
    name: 'id',
  })
  profile_picture: FileEntity;

  @Column({
    name: 'user_type',
  })
  user_type: UserTypeEnum;

  @Column({
    name: 'email',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
  })
  password: string;

  @Column({
    name: 'contact',
    unique: true,
  })
  contact: string;

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
