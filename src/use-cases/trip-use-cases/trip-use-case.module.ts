import { Module } from '@nestjs/common';
import { TripUseCaseService } from './trip-use-case.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TripEntity])],
  providers: [TripUseCaseService],
  exports: [TripUseCaseService],
})
export class TripUseCaseModule {}
