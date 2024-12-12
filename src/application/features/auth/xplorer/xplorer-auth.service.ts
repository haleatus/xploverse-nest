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

@Injectable()
export class XplorerAuthService {
  constructor(
    @InjectRepository(XplorerEntity)
    private xplorerRepository: Repository<XplorerEntity>,
    private xplorerService: XplorerService,
    private bcryptService: BcryptService,
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

    if (!xplorer) {
      throw new NotFoundException('username not found');
    }

    const isPasswordMatched = await this.bcryptService.compare(
      dto.password,
      xplorer.password,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('password does not match');
    }

    return {
      msg: 'you can be authorized',
    };
  }
}
