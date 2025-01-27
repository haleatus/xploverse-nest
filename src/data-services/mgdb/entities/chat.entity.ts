import { Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('chats')
export class ChatEntity extends BaseEntity {}
