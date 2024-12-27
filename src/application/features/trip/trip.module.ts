import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { TripController } from './trip.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TripEntity])],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
