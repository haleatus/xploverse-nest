import { Column, Entity } from 'typeorm';
import { UserTypeEnum } from 'src/common/enums/users/user-type.enum';
import { BaseUserEntity } from './base.entity';

// TODO :: nullable false garnu parxa
// notice :: no need to store the usertype in database

@Entity('admins')
export class AdminEntity extends BaseUserEntity {}
