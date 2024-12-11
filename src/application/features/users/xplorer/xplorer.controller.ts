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

  @Post('/create')
  async SignUp(@Body() dto: XplorerSignUpDto) {
    return await this.xplorerService.create(dto);
  }
}
