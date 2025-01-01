import { Module } from '@nestjs/common';
import { UserTripRatingUseCaseService } from './user-trip-rating-use-case.service';

@Module({
  providers: [UserTripRatingUseCaseService],
  exports: [UserTripRatingUseCaseService],
})
export class UserTripRatingUseCaseModule {}
