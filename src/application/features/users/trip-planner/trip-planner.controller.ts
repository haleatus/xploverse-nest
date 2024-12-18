import {
  Controller,
  Body,
  Get,
  Put,
  Post,
  Delete,
  Patch,
  Query,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TripPlannerService } from './trip-planner.service';

@Controller('trip-planner')
export class TripPlannerController {
  constructor(private tripPlannerService: TripPlannerService) {}

  @Get('/get-all')
  async getAll() {
    return await this.tripPlannerService.findall();
  }
}
