import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { AdminEntity } from 'src/data-services/mgdb/entities/admin.entity';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { MongoRepository } from 'typeorm';

@Injectable()
export class AdminAuthUseCaseService {
  constructor(
    private bcryptService: BcryptService,
    private jwtTokenService: JwtTokenService,
    @InjectRepository(AdminEntity)
    private adminRepository: MongoRepository<AdminEntity>,
  ) {}

  async signIn(dto: SignInDto) {
    const admin = await this.adminRepository.findOne({
      where: { username: dto.username },
    });

    if (!admin) throw new AppNotFoundException('admin does not exist.');

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
