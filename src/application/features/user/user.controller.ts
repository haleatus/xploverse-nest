import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/get-all')
  async getAll() {
    return await this.userService.findAllUser();
  }
}
