import { Module } from '@nestjs/common';
import { AdminUseCaseModule } from 'src/use-cases/admin-use-cases/admin-use-case.module';
import { AdminAuthController } from './admin-auth-controller';

@Module({
  imports: [AdminUseCaseModule],
  controllers: [AdminAuthController],
})
export class AuthControllerModule {}
