import { Entity } from 'typeorm';
import { BaseUserEntity } from './base.entity';

@Entity('admins')
export class AdminEntity extends BaseUserEntity {}
