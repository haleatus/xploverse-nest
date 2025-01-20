import { Controller, Body, Post } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { UserAuthUseCaseService } from 'src/use-cases/user-use-cases/user-auth/user-auth-use-case.service';

@Controller('/user')
export class UserAuthController {
  constructor(private userAuthUsecaseService: UserAuthUseCaseService) {}

  @Post('/signin')
  async adminSignIn(@Body() dto: SignInDto) {
    return CoreApiResponse.success(
      await this.userAuthUsecaseService.signIn(dto),
      201,
      'user signin success',
    );
  }
}
