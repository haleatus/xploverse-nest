import { Controller, Get, Param } from '@nestjs/common';
import { CarPoolRequestUseCaseService } from 'src/use-cases/carpool-use-cases/carpool-use-case.service';

@Controller()
export class CarPoolRequestController {
  constructor(private carPoolRequestService: CarPoolRequestUseCaseService) {}

  @Get('/get-all/:id')
  async getOne(@Param('id') id: string) {
    return await this.carPoolRequestService.findCarPoolRequestById(id);
  }
}
