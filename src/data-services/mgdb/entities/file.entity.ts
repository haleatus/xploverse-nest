import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('file')
export class FileEntity extends BaseEntity {
  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'type',
  })
  type: string;

  @Column({
    name: 'path',
  })
  path: string;
}
