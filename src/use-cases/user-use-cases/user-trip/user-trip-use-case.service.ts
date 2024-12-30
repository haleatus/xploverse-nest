import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTripDto, updateTripDto } from 'src/core/dtos/request/trip.dto';
import { convertToObjectId } from 'src/common/utils/convert-to-object-id';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserTripUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findTripsByPlanner(planner_id: ObjectId) {
    const planner = await this.userRepository.findOneBy({
      _id: planner_id,
    });

    if (!planner) {
      throw new NotFoundException('Trip Planner does not exist');
    }
    const trips = await this.tripRepository.find({
      where: { planner: planner },
    });

    return trips;
  }

  async createTrip(
    planner_id: ObjectId,
    dto: CreateTripDto,
  ): Promise<TripEntity> {
    const planner = await this.userRepository.findOneBy({
      _id: planner_id,
    });

    if (!planner) {
      throw new NotFoundException('Trip Planner does not exist');
    }

    const newTrip = this.tripRepository.create({
      ...dto,
      planner: planner,
      is_car_pool: dto.is_car_pool ?? false,
    });
    return await this.tripRepository.save(newTrip);
  }

  async updateTrip(id: string, dto: updateTripDto) {
    const trip_id = convertToObjectId(id);
    const trip = await this.tripRepository.findOneBy({ _id: trip_id });
    if (!trip) {
      throw new NotFoundException('Trip does not exist');
    }
    const updatedTrip = { ...trip, ...dto };
    await this.tripRepository.update({ _id: trip._id }, updatedTrip);
    return updatedTrip;
  }

  async deleteTripById(id: string) {
    const trip_id = convertToObjectId(id);
    const deletedTrip = this.tripRepository.findOneBy({ _id: trip_id });
    if (!deletedTrip) {
      throw new NotFoundException('Trip does not exist');
    }
    await this.tripRepository.delete({ _id: trip_id });
    return deletedTrip;
  }
}
