import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtTokenService: JwtTokenService) {}

  private extractToken(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const decoded = await this.jwtTokenService.checkToken(token);
      request.userId = decoded._id;
    } catch (error) {
      Logger.error(error.message);
      throw new UnauthorizedException('Invalid Token');
    }
    return true;
  }
}

// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
//   Logger,
// } from '@nestjs/common';
// import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
// import { Observable, from } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { Request } from 'express';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private jwtTokenService: JwtTokenService) {}

//   private extractToken(request: Request): string | undefined {
//     return request.headers.authorization?.split(' ')[1];
//   }

//   canActivate(context: ExecutionContext): Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractToken(request);

//     if (!token) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     return from(this.jwtTokenService.checkToken(token)).pipe(
//       map((decoded) => {
//         request.user = decoded._id; // Attach user ID to the request
//         return true; // Authorization successful
//       }),
//       catchError((error) => {
//         Logger.error(error.message); // Log the error
//         throw new UnauthorizedException('Invalid Token'); // Handle invalid token
//       }),
//     );
//   }
// }
