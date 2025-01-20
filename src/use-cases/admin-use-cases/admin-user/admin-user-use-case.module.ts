import { Module } from '@nestjs/common';
import { AdminUserUseCaseService } from './admin-user-use-case.service';

@Module({
  providers: [AdminUserUseCaseService],
  exports: [AdminUserUseCaseService],
})
export class AdminUserUseCaseModule {}
