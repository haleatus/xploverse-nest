import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminEntity } from 'src/data-services/mgdb/entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoModule } from 'src/libs/crypto/crypto.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity]), CryptoModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
