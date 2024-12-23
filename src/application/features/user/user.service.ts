import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAllUser() {
    const users = await this.userRepository.find();
    return users;
  }

  async findAdminByUsername(username: string) {
    const user = await this.userRepository.findOneBy({
      username: username,
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    return user;
  }

  async findAdminById(id: ObjectId) {
    const user = await this.userRepository.findOneBy({
      _id: id,
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    return user;
  }
}
