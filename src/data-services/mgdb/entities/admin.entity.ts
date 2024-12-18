import { Column, Entity } from 'typeorm';
import { UserTypeEnum } from 'src/common/enums/users/user-type.enum';
import { BaseUserEntity } from './base.entity';

@Entity('admins')
export class AdminEntity extends BaseUserEntity {
  @Column({ name: 'user_type', default: UserTypeEnum.XPLORER })
  user_type: UserTypeEnum;

  constructor(partial?: Partial<AdminEntity>) {
    super();
    this.user_type = UserTypeEnum.ADMIN; // Explicitly set the default
    Object.assign(this, partial); // For optional parameter initialization
  }
}
