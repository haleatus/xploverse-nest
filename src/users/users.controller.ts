import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/core/dtos/request/users/createUser.dto';

@Controller('users')
export class UsersController {
  @Get('all')
  findAll(): string {
    return 'This action returns all users';
  }

  @Get(':username')
  findOne(@Param('username') username): string {
    return `This action returns a user with the username : ${username}`;
  }

  @Post(':register')
  create(
    @Body()
    body: CreateUserDto,
  ) {
    return body;
  }

  @Patch(':update')
  update(
    @Body()
    body: CreateUserDto,
  ) {
    return body;
  }
}
