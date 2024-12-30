import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/application/decorators/public.decorator';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { Request } from 'express';
import { convertToObjectId } from 'src/common/utils/convert-to-object-id';
import { Repository } from 'typeorm';
import { AdminEntity } from 'src/data-services/mgdb/entities/admin.entity';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtTokenService: JwtTokenService,
    private reflector: Reflector,

    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private extractToken(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { url: requestUrl } = request;
    const token = this.extractToken(request);

    const isPublic = requestUrl.startsWith('/api/xploverse/auth')
      ? true
      : false ||
        this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
          context.getHandler(), // Check route handler (method-level metadata)
          context.getClass(), // Check controller (class-level metadata)
        ]);

    if (isPublic) return true;

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    const isAdmin = requestUrl.startsWith('/api/xploverse/admin')
      ? true
      : false;

    try {
      const decoded = await this.jwtTokenService.checkToken(token);
      if (isAdmin) {
        const admin = await this.adminRepository.findOneBy({
          _id: convertToObjectId(decoded._id),
        });

        if (!admin) throw new NotFoundException('admin does not exist');

        request.admin = admin;
      } else {
        const user = await this.userRepository.findOneBy({
          _id: convertToObjectId(decoded._id),
        });

        if (!user) throw new NotFoundException('user does not exist');

        request.user = user;
      }
    } catch (error) {
      Logger.error(error.message);
      throw new UnauthorizedException('Invalid Token');
    }
    return true;
  }
}
