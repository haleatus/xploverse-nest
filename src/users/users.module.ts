import { Module, ValidationPipe } from '@nestjs/common';
import { UsersController } from './users.controller';
import { APP_PIPE } from '@nestjs/core';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_PIPE,

      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    UsersService,
  ],
})
export class UsersModule {}
