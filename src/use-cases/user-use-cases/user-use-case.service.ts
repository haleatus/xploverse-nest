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
import { EditUserDto } from 'src/core/dtos/request/signup.dto';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';

@Injectable()
export class UserUseCaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private bcryptService: BcryptService,
  ) {}

  async userSignUp(dto: UserSignUpDto) {
    const user = await this.userRepository.findOneBy({
      username: dto.username,
    });

    if (user) {
      throw new ConflictException('user already exists.');
    }

    const newUser = this.userRepository.create(dto);
    newUser.is_operator = dto.is_operator ? dto.is_operator : false;
    newUser.password = await this.bcryptService.hash(dto.password);

    return await this.userRepository.save(newUser);
  }

  async findAllUser() {
    const users = await this.userRepository.find();
    return users;
  }

  async findUserByUsername(username: string) {
    const user = await this.userRepository.findOneBy({
      username: username,
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    return user;
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOneBy({
      _id: convertToObjectId(id),
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    return user;
  }

  async editPersonalDetail(id: ObjectId, dto: EditUserDto) {
    const user = await this.userRepository.findOneBy({
      _id: id,
    });
    const updatedPersonalDetail = { ...user, ...dto };
    await this.userRepository.update({ _id: user._id }, updatedPersonalDetail);
    return updatedPersonalDetail;
  }
}
