import { Entity, OneToOne } from 'typeorm';
import { RefreshTokenBaseEntity } from './base.entity';
import { XplorerEntity } from './xplorer.entity';

@Entity('xplorer-refresh-token')
export class XplorerRefreshTokenEntity extends RefreshTokenBaseEntity {
  @OneToOne(() => XplorerEntity, { cascade: true, eager: true })
  xplorer: XplorerEntity;
}
