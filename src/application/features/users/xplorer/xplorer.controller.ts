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
import { XplorerService } from './xplorer.service';
import { AuthGuard } from 'src/application/guards/auth/auth.guard';

@Controller('xplorer')
@UseGuards(AuthGuard)
export class XplorerController {
  constructor(private xplorerService: XplorerService) {}

  @Get('/test')
  async test(@Req() req) {
    return { user: req.userId };
  }

  @Get('/get-all')
  async getAll() {
    return await this.xplorerService.findall();
  }
}
