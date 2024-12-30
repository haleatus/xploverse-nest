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
import { UserTripUseCaseService } from 'src/use-cases/user-use-cases/user-trip/user-trip-use-case.service';

@Controller('/trip')
export class UserTripController {
  constructor(private userTripUseCaseService: UserTripUseCaseService) {}

  @Post('/create-trip')
  async create(@Req() req: any, @Body() dto: CreateTripDto) {
    return await this.userTripUseCaseService.createTrip(req.user._id, dto);
  }

  @Get('/my-trips')
  async myTrips(@Req() req: any) {
    return await this.userTripUseCaseService.findTripsByPlanner(req.user._id);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() dto: updateTripDto) {
    return await this.userTripUseCaseService.updateTrip(id, dto);
  }

  @Delete('/Delete/:id')
  async delete(@Param('id') id: string) {
    return await this.userTripUseCaseService.deleteTripById(id);
  }
}
