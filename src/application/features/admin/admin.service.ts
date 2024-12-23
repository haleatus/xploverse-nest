import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/data-services/mgdb/entities/admin.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { AdminSignUpDto } from 'src/core/dtos/request/signup.dto';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
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
      throw new NotFoundException('admin does not exist');
    }
    return admin;
  }

  async findAdminById(id: ObjectId) {
    const admin = await this.adminRepository.findOneBy({
      _id: id,
    });
    if (!admin) {
      throw new NotFoundException('admin does not exist');
    }
    return admin;
  }
}
