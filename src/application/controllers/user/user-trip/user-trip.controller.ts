import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { UserOperatorGuard } from 'src/application/guards/user-operator.guard';
import { CreateTripDto, updateTripDto } from 'src/core/dtos/request/trip.dto';
import { UserTripUseCaseService } from 'src/use-cases/user-use-cases/user-trip/user-trip-use-case.service';

@Controller('/trip')
@UseGuards(UserOperatorGuard)
export class UserTripController {
  constructor(private userTripUseCaseService: UserTripUseCaseService) {}

  @Post('/create-trip')
  async create(@Req() req: any, @Body() dto: CreateTripDto) {
    return CoreApiResponse.success(
      await this.userTripUseCaseService.createTrip(req.user._id, dto),
    );
  }

  @Get('/my-completed-trips')
  async myCompletedTrips(@Req() req: any) {
    return CoreApiResponse.success(
      await this.userTripUseCaseService.findTripByUserCarpoolRequests(
        req.user._id,
      ),
    );
  }

  @Get('/my-planned-trips')
  async myPlannedTrips(@Req() req: any) {
    return CoreApiResponse.success(
      await this.userTripUseCaseService.findTripsByPlanner(req.user._id),
    );
  }

  @Patch('/update/:id')
  async update(@Param('id') trip_id: string, @Body() dto: updateTripDto) {
    return CoreApiResponse.success(
      await this.userTripUseCaseService.updateTrip(trip_id, dto),
    );
  }

  @Delete('/Delete/:id')
  async delete(@Param('id') trip_id: string) {
    return CoreApiResponse.success(
      await this.userTripUseCaseService.deleteTripById(trip_id),
    );
  }
}
