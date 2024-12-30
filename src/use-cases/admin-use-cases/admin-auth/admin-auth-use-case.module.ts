import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { TokenModule } from 'src/libs/token/token.module';
import { AdminAuthUseCaseService } from './admin-auth-use-case.service';

@Module({
  imports: [CryptoModule, TokenModule],
  providers: [AdminAuthUseCaseService],
  exports: [AdminAuthUseCaseService],
})
export class AdminAuthUseCaseModule {}
