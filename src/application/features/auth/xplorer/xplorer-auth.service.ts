import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { XplorerService } from '../../users/xplorer/xplorer.service';
import { XplorerSignInDto } from 'src/core/dtos/request/signin.dto';
import { XplorerSignUpDto } from 'src/core/dtos/request/signup.dto';
import { XplorerEntity } from 'src/data-services/mgdb/entities/xplorer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/libs/token/jwt/jwt-token.service';

@Injectable()
export class XplorerAuthService {
  constructor(
    @InjectRepository(XplorerEntity)
    private xplorerRepository: Repository<XplorerEntity>,
    private xplorerService: XplorerService,
    private bcryptService: BcryptService,
    private jwtTokenService: JwtTokenService,
  ) {}

  async signup(createXplorerDto: XplorerSignUpDto): Promise<XplorerEntity> {
    const newXplorer = this.xplorerRepository.create(createXplorerDto);
    newXplorer.password = await this.bcryptService.hash(
      createXplorerDto.password,
    );
    return await this.xplorerRepository.save(newXplorer);
  }

  async signIn(dto: XplorerSignInDto) {
    const xplorer = await this.xplorerService.findXplorerByUsername(
      dto.username,
    );

    const isPasswordMatched = await this.bcryptService.compare(
      dto.password,
      xplorer.password,
    );

    if (!xplorer || !isPasswordMatched) {
      throw new UnauthorizedException('incorrect usernme or password');
    }

    const payload = { _id: xplorer._id };
    const accessToken = await this.jwtTokenService.createToken(payload);

    return {
      accessToken,
      xplorer,
    };
  }
}
