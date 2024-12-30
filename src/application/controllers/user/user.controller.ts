import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-use-case.service';
import { UserSignUpDto } from 'src/core/dtos/request/signup.dto';

@Controller()
export class UserController {
  constructor(private userUsecaseService: UserUseCaseService) {}

  @Post('/create')
  async signup(@Body() dto: UserSignUpDto) {
    return await this.userUsecaseService.userSignUp(dto);
  }

  @Get('/get-all')
  async getAll() {
    return await this.userUsecaseService.findAllUser();
  }

  @Get('/me')
  async getMe(@Req() req: any) {
    return req.user;
  }
}
