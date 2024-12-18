import { Column, Entity } from 'typeorm';
import { UserTypeEnum } from 'src/common/enums/users/user-type.enum';
import { BaseUserEntity } from './base.entity';

@Entity('trip_planners')
export class TripPlannerEntity extends BaseUserEntity {
  @Column({ name: 'user_type', default: UserTypeEnum.XPLORER })
  user_type: UserTypeEnum;

  constructor(partial?: Partial<TripPlannerEntity>) {
    super();
    this.user_type = UserTypeEnum.TRIP_PLANNER; // Explicitly set the default
    Object.assign(this, partial); // For optional parameter initialization
  }
}
