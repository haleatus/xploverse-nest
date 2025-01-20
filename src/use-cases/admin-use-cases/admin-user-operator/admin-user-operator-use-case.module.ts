import { Module } from '@nestjs/common';
import { AdminUserOperatorUseCaseService } from './admin-user-operator-use-case.service';

@Module({
  providers: [AdminUserOperatorUseCaseService],
  exports: [AdminUserOperatorUseCaseService],
})
export class AdminUserOperatorUseCaseModule {}
