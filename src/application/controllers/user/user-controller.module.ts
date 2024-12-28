import { Module } from '@nestjs/common';
import { UserUseCaseModule } from 'src/use-cases/user-use-cases/user-use-case.module';
import { UserController } from './user.controller';

@Module({
  imports: [UserUseCaseModule],
  controllers: [UserController],
})
export class UserControllerModule {}
