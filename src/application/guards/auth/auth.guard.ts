import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { Request } from 'express';
import { XplorerService } from 'src/application/features/users/xplorer/xplorer.service';
import { converToObjectId } from 'src/common/utils/convert-to-object-id';
import { UserTypeEnum } from 'src/common/enums/users/user-type.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtTokenService: JwtTokenService,
    private xplorerService: XplorerService,
  ) {}

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

      if (decoded.user_type === UserTypeEnum.XPLORER) {
        const user = await this.xplorerService.findXolorerById(
          converToObjectId(decoded._id),
        );
        request.user = user;
      }
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
