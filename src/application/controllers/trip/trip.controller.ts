import { Body, Controller, Get, Post } from '@nestjs/common';
import { TripDto } from 'src/core/dtos/request/trip.dto';
import { TripUseCaseService } from 'src/use-cases/trip-use-cases/trip-use-case.service';

@Controller('/api/trip')
export class TripController {
  constructor(private tripUseCaseService: TripUseCaseService) {}

  @Post('/create')
  async create(@Body() dto: TripDto) {
    return await this.tripUseCaseService.createTrip(dto);
  }

  @Get('/get-all')
  async getAll() {
    return await this.tripUseCaseService.findAllTrip();
  }
}
