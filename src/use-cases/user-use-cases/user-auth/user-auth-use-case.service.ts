import { Injectable, UnauthorizedException } from '@nestjs/common';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { SignInDto } from 'src/core/dtos/request/signin.dto';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UserAuthUseCaseService {
  constructor(
    private bcryptService: BcryptService,
    private jwtTokenService: JwtTokenService,
    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,
  ) {}

  async signIn(dto: SignInDto) {
    const user = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (!user) throw new AppNotFoundException('user does not exist.');

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
