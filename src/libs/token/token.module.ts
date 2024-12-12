import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt/jwt-token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Replace with your secret or use environment variable
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME }, // Configure token expiration if needed
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class TokenModule {}
