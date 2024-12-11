import { Injectable, UnauthorizedException } from '@nestjs/common';
import { XplorerService } from '../../users/xplorer/xplorer.service';
import { JwtService } from '@nestjs/jwt';
import { XplorerSignInDto } from 'src/core/dtos/request/signin.dto';

@Injectable()
export class XplorerAuthService {
  constructor(
    private xplorerService: XplorerService,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: XplorerSignInDto) {
    const xplorer = await this.xplorerService.findXplorerByUsername(
      dto.username,
    );
    if (xplorer?.password !== dto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: xplorer._id, username: xplorer.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
