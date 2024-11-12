import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { createUserSchema, CreateUserZodDto } from './dto/createUserZod.dto';

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
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(
    @Body()
    body: CreateUserZodDto,
  ) {
    return body;
  }

  @Patch(':update')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  update(
    @Body()
    body: CreateUserZodDto,
  ) {
    return body;
  }
}
