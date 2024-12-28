import { Module } from '@nestjs/common';
import { TripUseCaseModule } from 'src/use-cases/trip-use-cases/trip-use-case.module';
import { TripController } from './trip.controller';

@Module({
  imports: [TripUseCaseModule],
  controllers: [TripController],
})
export class TripControllerModule {}
