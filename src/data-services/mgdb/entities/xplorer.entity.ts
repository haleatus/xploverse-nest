import { Column, Entity } from 'typeorm';
import { UserTypeEnum } from 'src/common/enums/users/user-type.enum';
import { BaseUserEntity } from './base.entity';

@Entity('xplorers')
export class XplorerEntity extends BaseUserEntity {
  @Column({ name: 'user_type', default: UserTypeEnum.XPLORER })
  user_type: UserTypeEnum;

  @Column({ name: 'phone_number', unique: true })
  phone_number: string;

  constructor(partial?: Partial<XplorerEntity>) {
    super();
    this.user_type = UserTypeEnum.XPLORER; // Explicitly set the default
    Object.assign(this, partial); // For optional parameter initialization
  }
}
