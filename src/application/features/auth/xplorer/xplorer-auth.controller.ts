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

import { XplorerSignInDto } from 'src/core/dtos/request/signin.dto';
import { XplorerAuthService } from './xplorer-auth.service';

@Controller('auth')
export class XplorerAuthController {
  constructor(private xplorerAuthService: XplorerAuthService) {}

  @Post('/signin')
  async signin(@Body() dto: XplorerSignInDto) {
    return await this.xplorerAuthService.signIn(dto);
  }
}
