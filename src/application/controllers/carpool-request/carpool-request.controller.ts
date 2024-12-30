import { Controller, Get, Param } from '@nestjs/common';
import { CarPoolRequestUseCaseService } from 'src/use-cases/carpool-request-use-cases/carpool-request-use-case.service';

@Controller()
export class CarPoolRequestController {
  constructor(private carPoolRequestService: CarPoolRequestUseCaseService) {}

  @Get('/get-all')
  async getAll() {
    return await this.carPoolRequestService.findAllCarPoolRequest();
  }

  @Get('/get/:id')
  async getOne(@Param('id') id: string) {
    return await this.carPoolRequestService.findCarPoolRequestById(id);
  }
}
