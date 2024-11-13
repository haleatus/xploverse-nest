import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/core/dtos/request/users/createUser.dto';
import { UsersService } from './users.service';
import { ParseIdPipe } from 'src/core/pipes/parseIdpipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id) {
    return this.usersService.findOne(id);
  }

  @Post('register')
  create(
    @Body()
    body: CreateUserDto,
  ) {
    return this.usersService.create(body);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body()
    body: CreateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  @Delete('delete/:id')
  delete(@Param('id', ParseIdPipe) id) {
    return this.usersService.delete(id);
  }
}
