import { Module } from '@nestjs/common';
import { TripUseCaseService } from './trip-use-case.service';

@Module({
  providers: [TripUseCaseService],
  exports: [TripUseCaseService],
})
export class TripUseCaseModule {}
