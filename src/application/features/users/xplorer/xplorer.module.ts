import { Module } from '@nestjs/common';
import { XplorerService } from './xplorer.service';
import { XplorerController } from './xplorer.controller';

@Module({
  providers: [XplorerService],
  controllers: [XplorerController],
})
export class XplorerModule {}
