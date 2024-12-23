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

@Controller('/api/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('/get-all')
  async getAll() {
    return await this.adminService.findAllAdmin();
  }
}
