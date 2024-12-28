import { Controller, Body, Post } from '@nestjs/common';

import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { UserAuthUseCaseService } from 'src/use-cases/user-use-cases/user-auth-use-case.service';

@Controller('/auth/user')
export class UserAuthController {
  constructor(private userAuthUsecaseService: UserAuthUseCaseService) {}

  @Post('/signin')
  async adminSignIn(@Body() dto: SignInDto) {
    return this.userAuthUsecaseService.signIn(dto);
  }
}
