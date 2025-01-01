import { Module } from '@nestjs/common';
import { TripUseCaseService } from './trip-use-case.service';
import { TripRatingUseCaseModule } from './trip-rating/trip-rating-use-case.module';

@Module({
  providers: [TripUseCaseService, TripRatingUseCaseModule],
  exports: [TripUseCaseService, TripRatingUseCaseModule],
})
export class TripUseCaseModule {}
