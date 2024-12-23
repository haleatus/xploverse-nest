import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UserSignUpDto } from 'src/core/dtos/request/signup.dto';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private bcryptService: BcryptService,
  ) {}

  async UserSignUp(dto: UserSignUpDto) {
    const user = await this.userRepository.findOneBy({
      username: dto.username,
    });

    if (user) {
      throw new ConflictException('user already exists.');
    }

    const newUser = this.userRepository.create(dto);
    newUser.password = await this.bcryptService.hash(dto.password);

    return await this.userRepository.save(newUser);
  }

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
