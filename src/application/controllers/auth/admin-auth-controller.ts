import { Controller, Body, Post } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { AdminAuthUseCaseService } from 'src/use-cases/admin-use-cases/admin-auth/admin-auth-use-case.service';

@Controller('/admin')
export class AdminAuthController {
  constructor(private adminAuthUsecaseService: AdminAuthUseCaseService) {}

  @Post('/signin')
  async adminSignIn(@Body() dto: SignInDto) {
    return CoreApiResponse.success(
      await this.adminAuthUsecaseService.signIn(dto),
      200,
      'admin signin success',
    );
  }
}
