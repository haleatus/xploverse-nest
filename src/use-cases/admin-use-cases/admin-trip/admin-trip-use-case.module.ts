import { Module } from '@nestjs/common';
import { AdminTripUseCaseService } from './admin-trip-use-case.service';

@Module({
  providers: [AdminTripUseCaseService],
  exports: [AdminTripUseCaseService],
})
export class AdminTripUseCaseModule {}
