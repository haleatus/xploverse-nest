import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { XplorerService } from 'src/application/features/users/xplorer/xplorer.service';

@Module({
  providers: [AuthGuard, XplorerService],
  exports: [AuthGuard],
})
export class AuthGuardModule {}
