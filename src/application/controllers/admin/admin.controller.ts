import { Controller, Body, Get, Post } from '@nestjs/common';
import { AdminUseCaseService } from 'src/use-cases/admin-use-cases/admin-use-case.service';
import { AdminSignUpDto } from 'src/core/dtos/request/signup.dto';

@Controller('/admin')
export class AdminController {
  constructor(private adminUseCaseService: AdminUseCaseService) {}

  @Post('/create')
  async signup(@Body() dto: AdminSignUpDto) {
    return await this.adminUseCaseService.AdminSignUp(dto);
  }

  @Get('/get-all')
  async getAll() {
    return await this.adminUseCaseService.findAllAdmin();
  }
}
