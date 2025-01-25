import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column()
  file_id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  path: string;

  @Column()
  url: string;
}
