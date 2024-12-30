import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { AdminEntity } from 'src/data-services/mgdb/entities/admin.entity';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { Repository } from 'typeorm';

@Injectable()
export class AdminAuthUseCaseService {
  constructor(
    private bcryptService: BcryptService,
    private jwtTokenService: JwtTokenService,
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  async signIn(dto: SignInDto) {
    const admin = await this.adminRepository.findOne({
      where: { username: dto.username },
    });

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
