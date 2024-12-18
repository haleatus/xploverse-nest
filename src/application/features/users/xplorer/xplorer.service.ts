import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { XplorerEntity } from 'src/data-services/mgdb/entities/xplorer.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class XplorerService {
  constructor(
    @InjectRepository(XplorerEntity)
    private xplorerRepository: Repository<XplorerEntity>,
  ) {}

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

  async findXolorerById(id: ObjectId) {
    const xplorer = await this.xplorerRepository.findOneBy({
      _id: id,
    });
    if (!xplorer) {
      throw new NotFoundException('xplorer does not exist');
    }
    return xplorer;
  }
}
