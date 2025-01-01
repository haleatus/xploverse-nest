import { Body, Controller, Get, Param, Post, Req, Patch } from '@nestjs/common';
import { TripRatingUseCaseService } from 'src/use-cases/trip-use-cases/trip-rating/trip-rating-use-case.service';

@Controller('/trip-rating')
export class TripRatingController {
  constructor(private tripRatingUseCaseService: TripRatingUseCaseService) {}
}
