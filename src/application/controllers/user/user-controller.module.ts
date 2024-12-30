import { Module } from '@nestjs/common';
import { UserUseCaseModule } from 'src/use-cases/user-use-cases/user-use-case.module';
import { UserController } from './user.controller';
import { UserTripController } from './user-trip/user-trip.controller';

@Module({
  imports: [UserUseCaseModule],
  controllers: [UserController, UserTripController],
})
export class UserControllerModule {}
