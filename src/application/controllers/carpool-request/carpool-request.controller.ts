import { Controller, Get, Param } from '@nestjs/common';
import { CarPoolRequestUseCaseService } from 'src/use-cases/carpool-request-use-cases/carpool-request-use-case.service';
import { CoreApiResponse } from 'src/application/api/core-api-response';

@Controller()
export class CarPoolRequestController {
  constructor(private carPoolRequestService: CarPoolRequestUseCaseService) {}

  @Get('/get-all')
  async getAll() {
    return CoreApiResponse.success(
      await this.carPoolRequestService.findAllCarPoolRequest(),
    );
  }

  @Get('/get/:id')
  async getOne(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.carPoolRequestService.findCarPoolRequestById(id),
    );
  }
}
