import { Module } from '@nestjs/common';
import { XplorerService } from './xplorer.service';
import { XplorerController } from './xplorer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XplorerEntity } from 'src/data-services/mgdb/entities/xplorer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([XplorerEntity])],
  providers: [XplorerService],
  controllers: [XplorerController],
})
export class XplorerModule {}
