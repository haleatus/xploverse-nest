import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { AdminUseCaseService } from './admin-use-case.service';
import { AdminAuthUseCaseModule } from './admin-auth/admin-auth-use-case.module';
import { AdminUserOperatorUseCaseModule } from './admin-user-operator/admin-user-operator-use-case.module';

@Module({
  imports: [
    CryptoModule,
    AdminAuthUseCaseModule,
    AdminUserOperatorUseCaseModule,
  ],
  providers: [AdminUseCaseService],
  exports: [
    AdminUseCaseService,
    AdminAuthUseCaseModule,
    AdminUserOperatorUseCaseModule,
  ],
})
export class AdminUseCaseModule {}
