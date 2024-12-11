import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { XplorerEntity } from 'src/data-services/mgdb/entities/xplorer.entity';
import { Repository } from 'typeorm';
import { XplorerSignUpDto } from 'src/core/dtos/request/signup.dto';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';

@Injectable()
export class XplorerService {
  constructor(
    @InjectRepository(XplorerEntity)
    private xplorerRepository: Repository<XplorerEntity>,
    private bcryptService: BcryptService,
  ) {}

  async create(createXplorerDto: XplorerSignUpDto): Promise<XplorerEntity> {
    const newXplorer = this.xplorerRepository.create(createXplorerDto);
    newXplorer.password = await this.bcryptService.hash(
      createXplorerDto.password,
    );
    return await this.xplorerRepository.save(newXplorer);
  }

  async findall() {
    const xplorers = await this.xplorerRepository.find();
    return xplorers;
  }

  async findXplorerByUsername(username: string) {
    const xplorer = await this.xplorerRepository.findOneBy({
      username: username,
    });
    if (!xplorer) {
      throw new NotFoundException('xplorer does not exist');
    }
    return xplorer;
  }
}
