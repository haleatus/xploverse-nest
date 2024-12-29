import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateTripDto, updateTripDto } from 'src/core/dtos/request/trip.dto';
import { TripUseCaseService } from 'src/use-cases/trip-use-cases/trip-use-case.service';

@Controller('/user/trip')
export class UserTripController {
  constructor(private tripUseCaseService: TripUseCaseService) {}

  @Post('/create-trip')
  async create(@Req() req: any, @Body() dto: CreateTripDto) {
    return await this.tripUseCaseService.createTrip(req.user._id, dto);
  }

  @Get('/my-trips')
  async myTrips(@Req() req: any) {
    return await this.tripUseCaseService.findTripsByPlanner(req.user._id);
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
