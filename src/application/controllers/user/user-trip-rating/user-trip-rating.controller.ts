import { Body, Controller, Get, Param, Post, Req, Patch } from '@nestjs/common';
import { TripRatingDto } from 'src/core/dtos/request/trip-rating.dto';
import { UserTripRatingUseCaseService } from 'src/use-cases/user-use-cases/user-trip-rating/user-trip-rating-use-case.service';

@Controller('/trip-rating')
export class UserTripRatingController {
  constructor(
    private userTripRatingUseCaseService: UserTripRatingUseCaseService,
  ) {}

  @Post('/create/:id')
  async create(
    @Req() req: any,
    @Param('id') trip_id: string,
    dto: TripRatingDto,
  ) {}
}
