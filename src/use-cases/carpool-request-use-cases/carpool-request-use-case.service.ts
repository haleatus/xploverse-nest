import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarPoolRequestEntity } from 'src/data-services/mgdb/entities/carpool-request.entity';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';

@Injectable()
export class CarPoolRequestUseCaseService {
  constructor(
    @InjectRepository(CarPoolRequestEntity)
    private carPoolRequestRepository: Repository<CarPoolRequestEntity>,
  ) {}

  async findAllCarPoolRequest() {
    const carpool_requests = await this.carPoolRequestRepository.find();
    return carpool_requests;
  }

  async findCarPoolRequestById(id: string) {
    const carpool_request_id = convertToObjectId(id);
    const carpool_request = await this.carPoolRequestRepository.findOneBy({
      _id: carpool_request_id,
    });
    if (!carpool_request) {
      throw new AppNotFoundException('Carpool request not found');
    }
    return carpool_request;
  }
}
