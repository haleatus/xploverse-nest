import { Body, Controller, Get, Param, Post, Req, Patch } from '@nestjs/common';
import { TripRatingUseCaseService } from 'src/use-cases/trip-use-cases/trip-rating/trip-rating-use-case.service';

@Controller('/trip-rating')
export class TripRatingController {
  constructor(private tripRatingUseCaseService: TripRatingUseCaseService) {}

  @Get('/get/trip/:id')
  async getByTrip(@Param('id') trip_id: string) {
    return await this.tripRatingUseCaseService.findTripRatingsByTrip(trip_id);
  }

  @Get('/get/:id')
  async get(@Param('id') trip_rating_id: string) {
    return;
  }
}
