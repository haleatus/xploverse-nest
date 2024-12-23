import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto } from 'src/core/dtos/request/signup.dto';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async signup(@Body() dto: UserSignUpDto) {
    return await this.userService.UserSignUp(dto);
  }

  @Get('/get-all')
  async getAll() {
    return await this.userService.findAllUser();
  }
}
