import { Module } from '@nestjs/common';
import { AdminUseCaseModule } from 'src/use-cases/admin-use-cases/admin-use-case.module';
import { AdminController } from './admin.controller';
import { AdminUserOperatorController } from './user-operator/admin-user-operator.controller';

@Module({
  imports: [AdminUseCaseModule],
  controllers: [AdminController, AdminUserOperatorController],
})
export class AdminControllerModule {}
