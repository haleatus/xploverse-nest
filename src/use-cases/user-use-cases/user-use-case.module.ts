import { Module } from '@nestjs/common';
import { UserUseCaseService } from './user-use-case.service';
import { UserAuthUseCaseModule } from './user-auth/user-auth-use-case.module';
import { UserTripUseCaseModule } from './user-trip/user-trip-use-case-module';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { UserCarPoolRequestUseCaseModule } from './user-carpool-request/user-carpool-request-use-case.module';

@Module({
  imports: [
    CryptoModule,
    UserAuthUseCaseModule,
    UserTripUseCaseModule,
    UserCarPoolRequestUseCaseModule,
  ],
  providers: [UserUseCaseService],
  exports: [
    UserUseCaseService,
    UserAuthUseCaseModule,
    UserTripUseCaseModule,
    UserCarPoolRequestUseCaseModule,
  ],
})
export class UserUseCaseModule {}
