import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { UserOperatorRequestDto } from 'src/core/dtos/request/user-operator-request.dto';
import { AdminUserOperatorUseCaseService } from 'src/use-cases/admin-use-cases/admin-user-operator/admin-user-operator-use-case.service';

@Controller('/user-operator-request')
export class AdminUserOperatorController {
  constructor(
    private adminUserOperatorUseCaseService: AdminUserOperatorUseCaseService,
  ) {}

  @Get('/get-all')
  async getAllRequests() {
    return CoreApiResponse.success(
      await this.adminUserOperatorUseCaseService.findAllOperatorRequest(),
    );
  }

  @Patch('/action/:id')
  async requestAction(
    @Param('id') operatorRequestId: string,
    @Body() dto: UserOperatorRequestDto,
  ) {
    return CoreApiResponse.success(
      await this.adminUserOperatorUseCaseService.operatorRequestAction(
        operatorRequestId,
        dto,
      ),
    );
  }
}
