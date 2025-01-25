import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-use-case.service';
import { UserSignUpDto } from 'src/core/dtos/request/signup.dto';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { Public } from 'src/application/decorators/public.decorator';
import { EditUserDto } from 'src/core/dtos/request/user.dto';

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

  @Patch('/update')
  async updatePersonalDetail(@Req() req: any, @Body() dto: EditUserDto) {
    return CoreApiResponse.success(
      await this.userUsecaseService.editPersonalDetail(req.user._id, dto),
    );
  }

  @Get('/get-profile-picture')
  async getMyProfilePicture(@Req() req: any) {
    return CoreApiResponse.success(
      await this.userUsecaseService.getProfilePicture(req.user._id),
    );
  }

  @Public()
  @Get('/get-by-username/:username')
  async getByUserName(@Param('username') username: string) {
    return CoreApiResponse.success(
      await this.userUsecaseService.findUserByUsername(username),
    );
  }
}
