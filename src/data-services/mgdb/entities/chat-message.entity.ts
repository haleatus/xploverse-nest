import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ObjectId } from 'mongodb';

@Entity('chat-messages')
export class chatMessage extends BaseEntity {
  @Column()
  sender: ObjectId; // will reference the user who sends a message

  @Column()
  content: string; // message contents

  @Column()
  attachments: { url: string; path: string }[];

  @Column()
  chat: ObjectId; // will reference the chat that this message belongs to
}
