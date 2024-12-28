import { Controller, Body, Post } from '@nestjs/common';

import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { AdminAuthUseCaseService } from 'src/use-cases/admin-use-cases/admin-auth-use-case.service';

@Controller('/auth/admin')
export class AdminAuthController {
  constructor(private adminAuthUsecaseService: AdminAuthUseCaseService) {}

  @Post('/signin')
  async adminSignIn(@Body() dto: SignInDto) {
    return this.adminAuthUsecaseService.signIn(dto);
  }
}
