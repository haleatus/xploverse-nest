import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileDto } from 'src/core/dtos/request/file.dto';
import { FileEntity } from 'src/data-services/mgdb/entities/file.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class FileStoreUseCaseService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: MongoRepository<FileEntity>,
  ) {}

  async storeFileData(dto: FileDto): Promise<FileEntity> {
    const newFileData = this.fileRepository.create(dto);
    await this.fileRepository.save(newFileData);
    return newFileData;
  }
}
