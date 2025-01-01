import { Module } from '@nestjs/common';
import { TripRatingUseCaseService } from './trip-rating-use-case.service';

@Module({
  providers: [TripRatingUseCaseService],
  exports: [TripRatingUseCaseService],
})
export class TripRatingUseCaseModule {}
