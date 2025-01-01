import { Module } from '@nestjs/common';
import { TripUseCaseModule } from 'src/use-cases/trip-use-cases/trip-use-case.module';
import { TripController } from './trip.controller';
import { TokenModule } from 'src/libs/token/token.module';
import { TripRatingController } from './trip-rating/trip-rating.controller';

@Module({
  imports: [TripUseCaseModule, TokenModule],
  controllers: [TripController, TripRatingController],
})
export class TripControllerModule {}
