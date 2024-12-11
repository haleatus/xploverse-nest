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
import { XplorerSignUpDto } from 'src/core/dtos/request/signup.dto';
import { XplorerService } from './xplorer.service';

@Controller('xplorer')
export class XplorerController {
  constructor(private xplorerService: XplorerService) {}

  @Get('/get-all')
  async getAll() {
    return await this.xplorerService.findall();
  }

  @Post('/signup')
  async SignUp(@Body() dto: XplorerSignUpDto) {
    return await this.xplorerService.create(dto);
  }
}
