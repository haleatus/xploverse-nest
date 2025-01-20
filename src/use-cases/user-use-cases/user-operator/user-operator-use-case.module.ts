import { Module } from '@nestjs/common';
import { UserOperatorUseCaseService } from './user-operator-use-case.service';

@Module({
  providers: [UserOperatorUseCaseService],
  exports: [UserOperatorUseCaseService],
})
export class UserOperatorUseCaseModule {}
