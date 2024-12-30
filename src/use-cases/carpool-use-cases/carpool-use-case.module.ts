import { Module } from '@nestjs/common';
import { CarPoolRequestUseCaseService } from './carpool-use-case.service';

@Module({
  providers: [CarPoolRequestUseCaseService],
  exports: [CarPoolRequestUseCaseService],
})
export class CarPoolRequestUseCaseModule {}
