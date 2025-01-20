import { Controller, Post, Req } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { UserOperatorUseCaseService } from 'src/use-cases/user-use-cases/user-operator/user-operator-use-case.service';

@Controller('/operator-request')
export class UserOperatorController {
  constructor(private userOperatorUseCaseService: UserOperatorUseCaseService) {}

  @Post('/create')
  async createRequest(@Req() req: any) {
    return CoreApiResponse.success(
      await this.userOperatorUseCaseService.createOperatorRequest(req.user._id),
      201,
      'request issued successfully',
    );
  }
}
