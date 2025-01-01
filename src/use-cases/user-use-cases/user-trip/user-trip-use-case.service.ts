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

    const trips = await this.tripRepository.find({
      where: { planner: planner._id },
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

    const newTrip = this.tripRepository.create({
      ...dto,
      planner: planner._id,
      is_car_pool: dto.is_car_pool ?? false,
    });
    return await this.tripRepository.save(newTrip);
  }

  async updateTrip(trip_id: string, dto: updateTripDto) {
    const trip = await this.tripRepository.findOneBy({
      _id: convertToObjectId(trip_id),
    });
    if (!trip) {
      throw new NotFoundException('Trip does not exist');
    }
    const updatedTrip = { ...trip, ...dto };
    await this.tripRepository.update({ _id: trip._id }, updatedTrip);
    return updatedTrip;
  }

  async deleteTripById(trip_id: string) {
    const deletedTrip = await this.tripRepository.findOneBy({
      _id: convertToObjectId(trip_id),
    });

    if (!deletedTrip) throw new NotFoundException('trip not found');

    await this.tripRepository.delete({ _id: deletedTrip._id });
    return deletedTrip;
  }
}
