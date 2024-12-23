import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';

// admin
import { AdminService } from '../admin/admin.service';

// user
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private bcryptService: BcryptService,
    private jwtTokenService: JwtTokenService,
    private adminService: AdminService,
    private userService: UserService,
  ) {}

  async adminSignIn(dto: SignInDto) {
    const admin = await this.adminService.findAdminByUsername(dto.username);
    if (!admin) throw new NotFoundException('admin does not exist.');
    return await this.signIn(dto, admin);
  }

  async userSignIn(dto: SignInDto) {
    const user = await this.userService.findAdminByUsername(dto.username);
    if (!user) throw new NotFoundException('User does not exist');
    return await this.signIn(dto, user);
  }

  private async signIn(dto: SignInDto, entity: any) {
    const isPasswordMatched = await this.bcryptService.compare(
      dto.password,
      entity.password,
    );

    if (!isPasswordMatched)
      throw new UnauthorizedException('password is incorrect.');

    const payload = { _id: entity._id };
    const accessToken = await this.jwtTokenService.createToken(payload);
    return {
      accessToken,
      entity,
    };
  }
}
