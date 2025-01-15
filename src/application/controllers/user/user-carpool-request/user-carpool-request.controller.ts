import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserOperatorGuard } from 'src/application/guards/user-operator.guard';
import {
  CreateCarPoolRequestDto,
  EditCarPoolRequestDto,
} from 'src/core/dtos/request/carpool-request.dto';
import { UserCarPoolRequestUseCaseService } from 'src/use-cases/user-use-cases/user-carpool-request/user-carpool-request-use-case.service';
import { CoreApiResponse } from 'src/application/api/core-api-response';

@Controller('/carpool-request')
export class UserCarPoolRequestController {
  constructor(
    private userCarPoolRequestUseCaseService: UserCarPoolRequestUseCaseService,
  ) {}

  @Get('/get/trip/:id')
  async getByTrip(@Param('id') trip_id: string) {
    return CoreApiResponse.success(
      await this.userCarPoolRequestUseCaseService.findCarPoolRequestsByTrip(
        trip_id,
      ),
    );
  }

  @Get('/me')
  async getMyCarPoolRequest(@Req() req: any) {
    return CoreApiResponse.success(
      await this.userCarPoolRequestUseCaseService.getCarPoolRequestByRequester(
        req.user._id,
      ),
    );
  }

  @UseGuards(UserOperatorGuard)
  @Patch('/action/:id')
  async action(
    @Param('id') carpool_request_id: string,
    @Body() dto: EditCarPoolRequestDto,
  ) {
    return CoreApiResponse.success(
      await this.userCarPoolRequestUseCaseService.carPoolRequestAction(
        carpool_request_id,
        dto,
      ),
    );
  }

  @UseGuards(UserOperatorGuard)
  @Patch('/trip/mark-as-complete/:id')
  async mark(@Param('id') trip_id: string) {
    return CoreApiResponse.success(
      await this.userCarPoolRequestUseCaseService.markCarPoolAsComplete(
        trip_id,
      ),
    );
  }

  @Post('/create')
  async create(@Req() req: any, @Body() dto: CreateCarPoolRequestDto) {
    return CoreApiResponse.success(
      await this.userCarPoolRequestUseCaseService.createCarPoolRequest(
        req.user._id,
        dto,
      ),
    );
  }

  @Patch('/update/:id')
  async update(
    @Param('id') carpool_request_id: string,
    @Body() dto: EditCarPoolRequestDto,
  ) {
    return CoreApiResponse.success(
      await this.userCarPoolRequestUseCaseService.updateCarPoolRequest(
        carpool_request_id,
        dto,
      ),
    );
  }
}
