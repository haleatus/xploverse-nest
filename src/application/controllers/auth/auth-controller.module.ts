import { Module } from '@nestjs/common';
import { AdminUseCaseModule } from 'src/use-cases/admin-use-cases/admin-use-case.module';
import { UserUseCaseModule } from 'src/use-cases/user-use-cases/user-use-case.module';
import { AdminAuthController } from './admin-auth-controller';
import { UserAuthController } from './user-auth-controller';

@Module({
  imports: [AdminUseCaseModule, UserUseCaseModule],
  controllers: [AdminAuthController, UserAuthController],
})
export class AuthControllerModule {}
