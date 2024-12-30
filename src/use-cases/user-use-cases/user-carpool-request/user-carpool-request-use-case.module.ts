import { Module } from '@nestjs/common';
import { UserCarPoolUseCaseService } from './user-carpool-request-use-case.service';

@Module({
  providers: [UserCarPoolUseCaseService],
  exports: [UserCarPoolUseCaseService],
})
export class UserCarPoolRequestUseCaseModule {}
