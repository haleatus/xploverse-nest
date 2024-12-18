import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoModule } from 'src/libs/crypto/crypto.module';
import { TokenModule } from 'src/libs/token/token.module';
// xplorer
import { XplorerEntity } from 'src/data-services/mgdb/entities/xplorer.entity';
import { XplorerService } from '../users/xplorer/xplorer.service';
// trip-planner
import { TripPlannerEntity } from 'src/data-services/mgdb/entities/trip-planner.entity';
import { TripPlannerService } from '../users/trip-planner/trip-planner.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([XplorerEntity, TripPlannerEntity]),
    CryptoModule,
    TokenModule,
  ],
  providers: [AuthService, XplorerService, TripPlannerService],
  controllers: [AuthController],
})
export class AuthModule {}
