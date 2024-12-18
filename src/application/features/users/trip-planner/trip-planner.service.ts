import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TripPlannerEntity } from 'src/data-services/mgdb/entities/trip-planner.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class TripPlannerService {
  constructor(
    @InjectRepository(TripPlannerEntity)
    private tripPlannerRepository: Repository<TripPlannerEntity>,
  ) {}

  async findall() {
    const trip_planners = await this.tripPlannerRepository.find();
    return trip_planners;
  }

  async findTripPlannerByUsername(username: string) {
    const trip_planner = await this.tripPlannerRepository.findOneBy({
      username: username,
    });
    if (!trip_planner) {
      throw new NotFoundException('trip_planner does not exist');
    }
    return trip_planner;
  }

  async findTripPlannerById(id: ObjectId) {
    const trip_planner = await this.tripPlannerRepository.findOneBy({
      _id: id,
    });
    if (!trip_planner) {
      throw new NotFoundException('trip_planner does not exist');
    }
    return trip_planner;
  }
}
