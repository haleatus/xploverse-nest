import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-use-case.service';
import { UserSignUpDto } from 'src/core/dtos/request/signup.dto';
import { TripUseCaseService } from 'src/use-cases/trip-use-cases/trip-use-case.service';

@Controller('/user')
export class UserController {
  constructor(
    private userUsecaseService: UserUseCaseService,
    private tripUseCaseService: TripUseCaseService,
  ) {}

  @Post('/create')
  async signup(@Body() dto: UserSignUpDto) {
    return await this.userUsecaseService.userSignUp(dto);
  }

  @Get('/get-all')
  async getAll() {
    return await this.userUsecaseService.findAllUser();
  }

  @Get('/my-trips')
  async myTrips(@Req() req: any) {
    return await this.tripUseCaseService.findTripsByPlanner(req.user._id);
  }

  @Get('/me')
  async getMe(@Req() req: any) {
    return req.user;
  }
}
