import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import {
  CreateCarPoolRequestDto,
  EditCarPoolRequestDto,
} from 'src/core/dtos/request/carpool-request.dto';
import { UserCarPoolRequestUseCaseService } from 'src/use-cases/user-use-cases/user-carpool-request/user-carpool-request-use-case.service';

@Controller('/carpool-request')
export class UserCarPoolRequestController {
  constructor(
    private userCarPoolRequestUseCaseService: UserCarPoolRequestUseCaseService,
  ) {}

  @Get('/trip/:id')
  async getByTrip(@Param('id') id: string) {
    return await this.userCarPoolRequestUseCaseService.findCarPoolRequestsByTrip(
      id,
    );
  }

  @Get('/me')
  async getMyCarPoolRequest(@Req() req: any) {
    return await this.userCarPoolRequestUseCaseService.getCarPoolRequestByRequester(
      req.user._id,
    );
  }

  @Patch('/action/:id')
  async action(@Param('id') id: string, dto: EditCarPoolRequestDto) {
    return await this.userCarPoolRequestUseCaseService.carPoolRequestAction(
      id,
      dto,
    );
  }

  @Post('/create/:id')
  async create(
    @Req() req: any,
    @Param('id') id: string,
    dto: CreateCarPoolRequestDto,
  ) {
    return await this.userCarPoolRequestUseCaseService.createCarPoolRequest(
      id,
      req.user_id,
      dto,
    );
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, dto: EditCarPoolRequestDto) {
    return await this.userCarPoolRequestUseCaseService.updateCarPoolRequest(
      id,
      dto,
    );
  }
}
