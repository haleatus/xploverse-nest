import { Module } from '@nestjs/common';
import { UserUseCaseModule } from 'src/use-cases/user-use-cases/user-use-case.module';
import { UserController } from './user.controller';
import { TripUseCaseModule } from 'src/use-cases/trip-use-cases/trip-use-case.module';

@Module({
  imports: [UserUseCaseModule, TripUseCaseModule],
  controllers: [UserController],
})
export class UserControllerModule {}
