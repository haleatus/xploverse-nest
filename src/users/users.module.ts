import { Module, ValidationPipe } from '@nestjs/common';
import { UsersController } from './users.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
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
  ],
})
export class UsersModule {}
