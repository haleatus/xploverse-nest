import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { AdminUseCaseService } from './admin-use-case.service';
import { AdminAuthUseCaseModule } from './admin-auth/admin-auth-use-case.module';

@Module({
  imports: [CryptoModule, AdminAuthUseCaseModule],
  providers: [AdminUseCaseService],
  exports: [AdminUseCaseService, AdminAuthUseCaseModule],
})
export class AdminUseCaseModule {}
