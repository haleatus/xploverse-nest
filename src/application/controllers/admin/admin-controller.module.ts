import { Module } from '@nestjs/common';
import { AdminUseCaseModule } from 'src/use-cases/admin-use-cases/admin-use-case.module';
import { AdminController } from './admin.controller';
import { AdminUserOperatorController } from './admin-user-operator/admin-user-operator.controller';
import { AdminUserController } from './admin-user/admin-user.controller';
import { AdminTripController } from './admin-trip/admin-trip.controller';

@Module({
  imports: [AdminUseCaseModule],
  controllers: [
    AdminController,
    AdminUserOperatorController,
    AdminUserController,
    AdminTripController,
  ],
})
export class AdminControllerModule {}
