import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserTypeEnum } from 'src/common/enums/users/user-type.enum';

@Entity('users')
export class XplorerEntity extends BaseEntity {
  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'fullname' })
  fullname: string;

  @Column({ name: 'user_type', default: UserTypeEnum.XPLORER })
  user_type: UserTypeEnum;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'phone_number', unique: true })
  phone_number: string;

  constructor(partial?: Partial<XplorerEntity>) {
    super();
    this.user_type = UserTypeEnum.XPLORER; // Explicitly set the default
    Object.assign(this, partial); // For optional parameter initialization
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
