import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-use-case.service';
import { UserSignUpDto } from 'src/core/dtos/request/signup.dto';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { Public } from 'src/application/decorators/public.decorator';

@Controller()
export class UserController {
  constructor(private userUsecaseService: UserUseCaseService) {}

  @Post('/create')
  async signup(@Body() dto: UserSignUpDto) {
    return CoreApiResponse.success(
      await this.userUsecaseService.userSignUp(dto),
      201,
      'user signup success',
    );
  }

  @Get('/me')
  async getMe(@Req() req: any) {
    return CoreApiResponse.success(req.user);
  }

  @Public()
  @Get('/get-by-username/:username')
  async getByUserName(@Param('username') username: string) {
    return CoreApiResponse.success(
      await this.userUsecaseService.findUserByUsername(username),
    );
  }
}
