import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ObjectId } from 'mongodb';

@Entity('chats')
export class ChatEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  is_group_chat: boolean;

  @Column()
  lastMessage: ObjectId; // will reference chat-messages

  @Column()
  participants: { participant: ObjectId }[]; // will reference the participated user

  @Column()
  chat_admin: ObjectId; // will reference the user who created the group chat (in case of a group chat)
}
