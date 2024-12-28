import { Module } from '@nestjs/common';
import { UserUseCaseService } from './user-use-case.service';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { UserAuthUseCaseService } from './user-auth-use-case.service';
import { TokenModule } from 'src/libs/token/token.module';

@Module({
  imports: [CryptoModule, TokenModule],
  providers: [UserUseCaseService, UserAuthUseCaseService],
  exports: [UserUseCaseService, UserAuthUseCaseService],
})
export class UserUseCaseModule {}
