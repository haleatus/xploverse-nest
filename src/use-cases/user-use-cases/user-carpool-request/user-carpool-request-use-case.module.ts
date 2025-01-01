import { Module } from '@nestjs/common';
import { UserCarPoolRequestUseCaseService } from './user-carpool-request-use-case.service';

@Module({
  providers: [UserCarPoolRequestUseCaseService],
  exports: [UserCarPoolRequestUseCaseService],
})
export class UserCarPoolRequestUseCaseModule {}
