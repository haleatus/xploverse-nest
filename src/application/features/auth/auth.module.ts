import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { TokenModule } from 'src/libs/token/token.module';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CryptoModule, TokenModule, AdminModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
