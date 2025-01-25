import { Module } from '@nestjs/common';
import { FileStoreUseCaseModule } from 'src/use-cases/file-store-use-case/file-store-use-case.module';
import { FileStoreController } from './file-store.controller';

@Module({
  imports: [FileStoreUseCaseModule],
  controllers: [FileStoreController],
})
export class FileStoreControllerModule {}
