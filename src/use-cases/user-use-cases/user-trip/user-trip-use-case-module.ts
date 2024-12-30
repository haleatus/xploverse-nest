import { Module } from '@nestjs/common';
import { UserTripUseCaseService } from './user-trip-use-case.service';

@Module({
  providers: [UserTripUseCaseService],
  exports: [UserTripUseCaseService],
})
export class UserTripUseCaseModule {}
