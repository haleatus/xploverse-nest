import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/data-services/mgdb/entities/admin.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { AdminSignUpDto } from 'src/core/dtos/request/signup.dto';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';

@Injectable()
export class AdminUseCaseService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: MongoRepository<AdminEntity>,
    private bcryptService: BcryptService,
  ) {}

  async AdminSignUp(dto: AdminSignUpDto) {
    const admin = await this.adminRepository.findOneBy({
      username: dto.username,
    });

    if (admin) {
      throw new ConflictException('admin already exists.');
    }

    const newAdmin = this.adminRepository.create(dto);
    newAdmin.password = await this.bcryptService.hash(dto.password);

    return await this.adminRepository.save(newAdmin);
  }

  async findAllAdmin() {
    const admins = await this.adminRepository.find();
    return admins;
  }

  async findAdminByUsername(username: string) {
    const admin = await this.adminRepository.findOneBy({
      username: username,
    });
    if (!admin) {
      throw new AppNotFoundException('admin does not exist');
    }
    return admin;
  }

  async findAdminById(id: ObjectId) {
    const admin = await this.adminRepository.findOneBy({
      _id: id,
    });
    if (!admin) {
      throw new AppNotFoundException('admin does not exist');
    }
    return admin;
  }
}
