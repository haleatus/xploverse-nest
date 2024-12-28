import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { UserUseCaseService } from './user-use-case.service';

@Injectable()
export class UserAuthUseCaseService {
  constructor(
    private bcryptService: BcryptService,
    private jwtTokenService: JwtTokenService,
    private userUseCaseService: UserUseCaseService,
  ) {}

  async signIn(dto: SignInDto) {
    const user = await this.userUseCaseService.findUserByUsername(dto.username);

    if (!user) throw new NotFoundException('user does not exist.');

    const isPasswordMatched = await this.bcryptService.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordMatched)
      throw new UnauthorizedException('password is incorrect.');

    const payload = { _id: user._id };
    const accessToken = await this.jwtTokenService.createToken(payload);
    return {
      accessToken,
      user,
    };
  }
}
