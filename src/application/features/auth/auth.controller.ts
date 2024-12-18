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

import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() dto: SignInDto) {
    return await this.authService.signIn(dto);
  }
}
