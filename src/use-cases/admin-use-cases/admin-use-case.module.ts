import { Module } from '@nestjs/common';
import { AdminEntity } from 'src/data-services/mgdb/entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { TokenModule } from 'src/libs/token/token.module';
import { AdminUseCaseService } from './admin-use-case.service';
import { AdminAuthUseCaseService } from './admin-auth-use-case.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity]), CryptoModule, TokenModule],
  providers: [AdminUseCaseService, AdminAuthUseCaseService],
  exports: [AdminUseCaseService, AdminAuthUseCaseService],
})
export class AdminUseCaseModule {}
