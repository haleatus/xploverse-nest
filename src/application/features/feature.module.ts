import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [AuthModule, AdminModule, UserModule, TripModule],
  exports: [AuthModule, AdminModule, UserModule, TripModule],
})
export class FeatureModule {}
