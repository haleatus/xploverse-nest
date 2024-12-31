import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('file')
export class FileEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  path: string;
}
