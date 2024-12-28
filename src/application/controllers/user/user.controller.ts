import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-use-case.service';
import { UserSignUpDto } from 'src/core/dtos/request/signup.dto';

@Controller('/user')
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
}
