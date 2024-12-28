import { Module } from '@nestjs/common';
import { AuthControllerModule } from './auth/auth-controller.module';
import { AdminControllerModule } from './admin/admin-controller.module';
import { UserControllerModule } from './user/user-controller.module';
import { TripControllerModule } from './trip/trip-controller.module';

@Module({
  imports: [
    AuthControllerModule,
    AdminControllerModule,
    UserControllerModule,
    TripControllerModule,
  ],
  exports: [
    AuthControllerModule,
    AdminControllerModule,
    UserControllerModule,
    TripControllerModule,
  ],
})
export class ControllerModule {}
