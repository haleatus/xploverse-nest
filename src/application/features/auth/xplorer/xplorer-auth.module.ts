import { Module } from '@nestjs/common';
import { XplorerAuthService } from './xplorer-auth.service';
import { XplorerAuthController } from './xplorer-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XplorerEntity } from 'src/data-services/mgdb/entities/xplorer.entity';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { XplorerService } from '../../users/xplorer/xplorer.service';

@Module({
  imports: [TypeOrmModule.forFeature([XplorerEntity]), CryptoModule],
  providers: [XplorerAuthService, XplorerService],
  controllers: [XplorerAuthController],
  exports: [XplorerAuthService],
})
export class XplorerAuthModule {}
