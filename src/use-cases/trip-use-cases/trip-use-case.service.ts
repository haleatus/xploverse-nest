import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from 'src/data-services/mgdb/entities/trip.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTripDto, updateTripDto } from 'src/core/dtos/request/trip.dto';
import { TripStatusEnum } from 'src/common/enums/trip-status.enum';
import { convertToObjectId } from 'src/common/utils/convert-to-object-id';

@Injectable()
export class TripUseCaseService {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,
  ) {}

  async findAllTrip() {
    const trips = await this.tripRepository.find();
    return trips;
  }

  async createTrip(dto: CreateTripDto): Promise<TripEntity> {
    const newTrip = this.tripRepository.create({
      ...dto,
      trip_status: dto.trip_status ?? TripStatusEnum.PENDING,
    });
    return await this.tripRepository.save(newTrip);
  }

  async findTripById(id: string) {
    const trip_id = convertToObjectId(id);
    const trip = this.tripRepository.findOneBy({ _id: trip_id });
    if (!trip) {
      throw new NotFoundException('Trip does not exist');
    }
    return trip;
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
