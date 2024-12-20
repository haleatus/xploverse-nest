import { Column, Entity } from 'typeorm';
import { BaseUserEntity } from './base.entity';

@Entity('users')
export class XplorerEntity extends BaseUserEntity {
  @Column({ name: 'phone_number', unique: true })
  phone_number: string;
}
