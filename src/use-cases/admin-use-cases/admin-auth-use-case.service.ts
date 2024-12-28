import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { AdminUseCaseService } from './admin-use-case.service';

@Injectable()
export class AdminAuthUseCaseService {
  constructor(
    private bcryptService: BcryptService,
    private jwtTokenService: JwtTokenService,
    private adminUseCaseService: AdminUseCaseService,
  ) {}

  async signIn(dto: SignInDto) {
    const admin = await this.adminUseCaseService.findAdminByUsername(
      dto.username,
    );

    if (!admin) throw new NotFoundException('admin does not exist.');

    const isPasswordMatched = await this.bcryptService.compare(
      dto.password,
      admin.password,
    );

    if (!isPasswordMatched)
      throw new UnauthorizedException('password is incorrect.');

    const payload = { _id: admin._id };
    const accessToken = await this.jwtTokenService.createToken(payload);
    return {
      accessToken,
      admin,
    };
  }
}
