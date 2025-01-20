import { Module } from '@nestjs/common';
import { UserUseCaseService } from './user-use-case.service';
import { UserAuthUseCaseModule } from './user-auth/user-auth-use-case.module';
import { UserTripUseCaseModule } from './user-trip/user-trip-use-case-module';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { UserCarPoolRequestUseCaseModule } from './user-carpool-request/user-carpool-request-use-case.module';
import { UserTripRatingUseCaseModule } from './user-trip-rating/user-trip-rating-use-case.module';
import { UserOperatorUseCaseModule } from './user-operator/user-operator-use-case.module';

@Module({
  imports: [
    CryptoModule,
    UserAuthUseCaseModule,
    UserTripUseCaseModule,
    UserCarPoolRequestUseCaseModule,
    UserTripRatingUseCaseModule,
    UserOperatorUseCaseModule,
  ],
  providers: [UserUseCaseService],
  exports: [
    UserUseCaseService,
    UserAuthUseCaseModule,
    UserTripUseCaseModule,
    UserCarPoolRequestUseCaseModule,
    UserTripRatingUseCaseModule,
    UserOperatorUseCaseModule,
  ],
})
export class UserUseCaseModule {}
