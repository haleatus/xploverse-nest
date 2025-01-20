import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { AdminUserUseCaseService } from 'src/use-cases/admin-use-cases/admin-user/admin-user-use-case.service';

@Controller('/user')
export class AdminUserController {
  constructor(private adminUserUseCaseService: AdminUserUseCaseService) {}

  @Get('/get-all')
  async getAlNonOperatorlUsers() {
    return CoreApiResponse.success(
      await this.adminUserUseCaseService.findAllNonOperatorUser(),
    );
  }

  @Get('/operator/get-all')
  async getAllOperatorUsers() {
    return CoreApiResponse.success(
      await this.adminUserUseCaseService.findAllOperatorUser(),
    );
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id') userId: string) {
    return CoreApiResponse.success(
      await this.adminUserUseCaseService.deleteUser(userId),
      200,
      'user deleted successfully',
    );
  }
}
