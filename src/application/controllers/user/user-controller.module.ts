import { Module } from '@nestjs/common';
import { UserUseCaseModule } from 'src/use-cases/user-use-cases/user-use-case.module';
import { UserController } from './user.controller';
import { TripUseCaseModule } from 'src/use-cases/trip-use-cases/trip-use-case.module';
import { UserTripController } from './trip/user-trip.controller';

@Module({
  imports: [UserUseCaseModule, TripUseCaseModule],
  controllers: [UserController, UserTripController],
})
export class UserControllerModule {}
