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
import { XplorerSignUpDto } from 'src/core/dtos/request/signup.dto';
import { XplorerAuthService } from './xplorer-auth.service';

@Controller('auth/xplorer')
export class XplorerAuthController {
  constructor(private xplorerAuthService: XplorerAuthService) {}

  @Post('/signin')
  async signin(@Body() dto: XplorerSignInDto) {
    return await this.xplorerAuthService.signIn(dto);
  }

  @Post('/signup')
  async SignUp(@Body() dto: XplorerSignUpDto) {
    return await this.xplorerAuthService.signup(dto);
  }
}
