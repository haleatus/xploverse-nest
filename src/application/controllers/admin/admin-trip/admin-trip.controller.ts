import { Controller, Delete, Param } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { AdminTripUseCaseService } from 'src/use-cases/admin-use-cases/admin-trip/admin-trip-use-case.service';

@Controller('/trip')
export class AdminTripController {
  constructor(private adminTripUseCaseService: AdminTripUseCaseService) {}

  @Delete('/delete/:id')
  async getOne(@Param('id') tripId: string) {
    return CoreApiResponse.success(
      await this.adminTripUseCaseService.deleteTripById(tripId),
      200,
      'trip deleted successfully',
    );
  }
}
