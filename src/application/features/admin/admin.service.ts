import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/data-services/mgdb/entities/admin.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

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
