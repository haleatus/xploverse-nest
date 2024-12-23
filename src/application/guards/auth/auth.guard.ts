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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtTokenService: JwtTokenService) {}

  private extractToken(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { url: requestUrl } = request;
    const token = this.extractToken(request);

    const isAdmin = requestUrl.startsWith('/api/admin') ? true : false;
    const isUser = requestUrl.startsWith('/api/user') ? true : false;

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const decoded = await this.jwtTokenService.checkToken(token);
      request.user = convertToObjectId(decoded._id);
    } catch (error) {
      Logger.error(error.message);
      throw new UnauthorizedException('Invalid Token');
    }
    return true;
  }
}
