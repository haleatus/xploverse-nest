import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { TokenModule } from 'src/libs/token/token.module';

@Module({
  imports: [TokenModule],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthGuardModule {}
