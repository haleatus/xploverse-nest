import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/core/dtos/request/users/createUser.dto';
import { UpdateUserDto } from 'src/core/dtos/request/users/updateUser.dto';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    if (!users) throw new NotFoundException('No users found');
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User does not exist');
    return user;
  }

  async create(dto: CreateUserDto) {
    return await this.usersRepository.save(dto);
  }

  async update(id: number, dto: UpdateUserDto) {
    return await this.usersRepository.update({ id }, dto);
  }

  async delete(id: number) {
    return await this.usersRepository.delete({ id });
  }
}
