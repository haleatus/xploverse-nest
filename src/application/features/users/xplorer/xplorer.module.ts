import { Module } from '@nestjs/common';
import { XplorerService } from './xplorer.service';
import { XplorerController } from './xplorer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XplorerEntity } from 'src/data-services/mgdb/entities/xplorer.entity';
import { AuthGuardModule } from 'src/application/guards/auth/auth.module';
import { TokenModule } from 'src/libs/token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([XplorerEntity]),
    AuthGuardModule,
    TokenModule,
  ],
  providers: [XplorerService],
  controllers: [XplorerController],
})
export class XplorerModule {}
