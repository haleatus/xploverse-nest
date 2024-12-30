import { Module } from '@nestjs/common';
import { CarPoolRequestUseCaseModule } from 'src/use-cases/carpool-use-cases/carpool-use-case.module';
import { CarPoolRequestController } from './carpool-request.controller';

@Module({
  imports: [CarPoolRequestUseCaseModule],
  controllers: [CarPoolRequestController],
})
export class CarPoolRequestControllerModule {}
