import { Module } from '@nestjs/common';
import { CarPoolRequestUseCaseModule } from 'src/use-cases/carpool-request-use-cases/carpool-request-use-case.module';
import { CarPoolRequestController } from './carpool-request.controller';

@Module({
  imports: [CarPoolRequestUseCaseModule],
  controllers: [CarPoolRequestController],
})
export class CarPoolRequestControllerModule {}
