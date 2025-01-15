import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/application/decorators/public.decorator';
import { TripUseCaseService } from 'src/use-cases/trip-use-cases/trip-use-case.service';
import { CoreApiResponse } from 'src/application/api/core-api-response';

@Controller()
export class TripController {
  constructor(private tripUseCaseService: TripUseCaseService) {}

  @Public()
  @Get('/get-all')
  async getAll() {
    return CoreApiResponse.success(await this.tripUseCaseService.findAllTrip());
  }

  @Get('/get/:id')
  async getOne(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.tripUseCaseService.findTripById(id),
    );
  }
}
