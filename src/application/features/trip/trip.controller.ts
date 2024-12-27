import { Body, Controller, Get, Post } from '@nestjs/common';
import { TripDto } from 'src/core/dtos/request/trip.dto';
import { TripService } from './trip.service';

@Controller('/api/trip')
export class TripController {
  constructor(private tripService: TripService) {}

  @Post('/create')
  async create(@Body() dto: TripDto) {
    return await this.tripService.createTrip(dto);
  }

  @Get('/get-all')
  async getAll() {
    return await this.tripService.findAllTrip();
  }
}
