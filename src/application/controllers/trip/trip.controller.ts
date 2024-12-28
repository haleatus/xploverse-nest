import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTripDto, updateTripDto } from 'src/core/dtos/request/trip.dto';
import { TripUseCaseService } from 'src/use-cases/trip-use-cases/trip-use-case.service';

@Controller('/api/trip')
export class TripController {
  constructor(private tripUseCaseService: TripUseCaseService) {}

  @Post('/create')
  async create(@Body() dto: CreateTripDto) {
    return await this.tripUseCaseService.createTrip(dto);
  }

  @Get('/get-all')
  async getAll() {
    return await this.tripUseCaseService.findAllTrip();
  }

  @Get('/get/:id')
  async getOne(@Param('id') id: string) {
    return await this.tripUseCaseService.findTripById(id);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() dto: updateTripDto) {
    return await this.tripUseCaseService.updateTrip(id, dto);
  }

  @Delete('/Delete/:id')
  async delete(@Param('id') id: string) {
    return await this.tripUseCaseService.deleteTripById(id);
  }
}
