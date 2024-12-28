import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { Request } from 'express';
import { convertToObjectId } from 'src/common/utils/convert-to-object-id';
import { UserUseCaseService } from 'src/use-cases/user-use-cases/user-use-case.service';
import { AdminUseCaseService } from 'src/use-cases/admin-use-cases/admin-use-case.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtTokenService: JwtTokenService,
    private userUseCaseService: UserUseCaseService,
    private adminUseCaseService: AdminUseCaseService,
  ) {}

  private extractToken(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { url: requestUrl } = request;
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    const isAdmin = requestUrl.startsWith('/api/admin') ? true : false;
    const isUser = requestUrl.startsWith('/api/user') ? true : false;

    try {
      const decoded = await this.jwtTokenService.checkToken(token);
      if (isAdmin) {
        const admin = await this.adminUseCaseService.findAdminById(
          convertToObjectId(decoded._id),
        );
        request.admin = admin;
      }

      if (isUser) {
        const user = await this.userUseCaseService.findUserById(
          convertToObjectId(decoded._id),
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
