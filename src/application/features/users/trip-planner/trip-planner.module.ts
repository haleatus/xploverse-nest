import { Module } from '@nestjs/common';
import { TripPlannerService } from './trip-planner.service';
import { TripPlannerController } from './trip-planner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripPlannerEntity } from 'src/data-services/mgdb/entities/trip-planner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TripPlannerEntity])],
  providers: [TripPlannerService],
  controllers: [TripPlannerController],
})
export class TripPlannerModule {}
