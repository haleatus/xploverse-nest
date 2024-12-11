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
}
