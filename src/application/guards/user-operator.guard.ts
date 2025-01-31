import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UserOperatorGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { url: requestUrl } = request;

    if (
      requestUrl.startsWith('/api/xploverse/user/trip/my-completed-trips') ||
      requestUrl.startsWith('/api/xploverse/user/trip/my-trips')
    )
      return true;

    if (request.user?.is_operator !== true)
      throw new UnauthorizedException('you are not an operator user');

    return true;
  }
}
