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
} from '@nestjs/common';
import { XplorerService } from './xplorer.service';

@Controller('xplorer')
export class XplorerController {
  constructor(private xplorerService: XplorerService) {}

  @Get('/get-all')
  async getAll() {
    return await this.xplorerService.findall();
  }
}
