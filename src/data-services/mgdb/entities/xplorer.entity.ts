import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { FileEntity } from './file.entity';
import { UserTypeEnum } from 'src/common/enums/users/user-type.enum';

@Entity('users')
export class XplorerEntity extends BaseEntity {
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
  profile_picture: FileEntity;

  @Column({
    default: UserTypeEnum.XPLORER,
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
    name: 'phone_number',
    unique: true,
  })
  phone_number: string;

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
