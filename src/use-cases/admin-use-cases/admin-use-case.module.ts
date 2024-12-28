import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { TokenModule } from 'src/libs/token/token.module';
import { AdminUseCaseService } from './admin-use-case.service';
import { AdminAuthUseCaseService } from './admin-auth-use-case.service';

@Module({
  imports: [CryptoModule, TokenModule],
  providers: [AdminUseCaseService, AdminAuthUseCaseService],
  exports: [AdminUseCaseService, AdminAuthUseCaseService],
})
export class AdminUseCaseModule {}
