import { Controller, Body, Post } from '@nestjs/common';

import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/admin')
  async adminSignIn(@Body() dto: SignInDto) {
    return this.authService.adminSignIn(dto);
  }

  // @Post('/user')
  // async userSignIn(@Body() dto: SignInDto) {
  //   return this.authService.userSignIn(dto);
  // }
}
