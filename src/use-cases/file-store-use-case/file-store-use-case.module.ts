import { Module } from '@nestjs/common';
import { FileStoreUseCaseService } from './file-store-use-case.service';

@Module({
  providers: [FileStoreUseCaseService],
  exports: [FileStoreUseCaseService],
})
export class FileStoreUseCaseModule {}
