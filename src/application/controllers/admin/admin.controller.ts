import { Controller, Body, Get, Post, Req } from '@nestjs/common';
import { AdminUseCaseService } from 'src/use-cases/admin-use-cases/admin-use-case.service';
import { AdminSignUpDto } from 'src/core/dtos/request/signup.dto';
import { CoreApiResponse } from 'src/application/api/core-api-response';

@Controller()
export class AdminController {
  constructor(private adminUseCaseService: AdminUseCaseService) {}

  @Post('/create')
  async signup(@Body() dto: AdminSignUpDto) {
    return CoreApiResponse.success(
      await this.adminUseCaseService.AdminSignUp(dto),
      201,
      'admin signup success',
    );
  }

  @Get('/get-all')
  async getAll() {
    return CoreApiResponse.success(
      await this.adminUseCaseService.findAllAdmin(),
    );
  }

  @Get('/me')
  async getMe(@Req() req: any) {
    return CoreApiResponse.success(req.admin);
  }
}
