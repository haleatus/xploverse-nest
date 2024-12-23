import {
  Controller,
  Body,
  Get,
  Put,
  Post,
  Delete,
  Patch,
  Query,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminSignUpDto } from 'src/core/dtos/request/signup.dto';

@Controller('/api/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/create')
  async signup(@Body() dto: AdminSignUpDto) {
    return await this.adminService.AdminSignUp(dto);
  }

  @Get('/get-all')
  async getAll() {
    return await this.adminService.findAllAdmin();
  }
}
