import { Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('chat-messages')
export class chatMessage extends BaseEntity {}
