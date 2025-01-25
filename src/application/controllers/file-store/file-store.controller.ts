import { Body, Controller, Post } from '@nestjs/common';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { Public } from 'src/application/decorators/public.decorator';
import { FileDto } from 'src/core/dtos/request/file.dto';
import { FileStoreUseCaseService } from 'src/use-cases/file-store-use-case/file-store-use-case.service';

@Public()
@Controller()
export class FileStoreController {
  constructor(private fileStoreUseCaseService: FileStoreUseCaseService) {}

  @Post('/store')
  async storeFileDate(@Body() dto: FileDto) {
    return CoreApiResponse.success(
      await this.fileStoreUseCaseService.storeFileData(dto),
    );
  }
}
