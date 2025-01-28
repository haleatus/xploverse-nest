import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/data-services/mgdb/entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UserSignUpDto } from 'src/core/dtos/request/signup.dto';
import { BcryptService } from 'src/libs/crypto/bcrypt/bcrypt.service';
import { EditUserDto } from 'src/core/dtos/request/user.dto';
import { convertToObjectId } from 'src/common/helpers/convert-to-object-id';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { FileEntity } from 'src/data-services/mgdb/entities/file.entity';

@Injectable()
export class UserUseCaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,

    private bcryptService: BcryptService,
  ) {}

  async userSignUp(dto: UserSignUpDto) {
    const user = await this.userRepository.findOneBy({
      username: dto.username,
    });

    if (user) {
      throw new ConflictException('user already exists.');
    }

    // TODO; add validation for email and phonenumber -- if they are unique or not

    const newUser = this.userRepository.create(dto);
    newUser.is_operator = false;
    newUser.password = await this.bcryptService.hash(dto.password);

    return await this.userRepository.save(newUser);
  }

  async findUserByUsername(username: string) {
    const user = await this.userRepository.findOneBy({
      username: username,
    });
    if (!user) {
      throw new AppNotFoundException('user does not exist');
    }
    const profilePicture = await this.fileRepository.findOneBy({
      _id: convertToObjectId(user.profile_picture as unknown as string),
    });
    return { ...user, profile_picture: profilePicture };
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOneBy({
      _id: convertToObjectId(id),
    });
    if (!user) {
      throw new AppNotFoundException('user does not exist');
    }
    const profilePicture = await this.fileRepository.findOneBy({
      _id: convertToObjectId(user.profile_picture as unknown as string),
    });
    return { ...user, profile_picture: profilePicture };
  }

  async editPersonalDetail(id: ObjectId, dto: EditUserDto) {
    const user = await this.userRepository.findOneBy({
      _id: id,
    });
    const updatedPersonalDetail = {
      ...user,
      ...dto,
      profile_picture: dto.profile_picture
        ? convertToObjectId(dto.profile_picture)
        : null,
    };
    await this.userRepository.update({ _id: user._id }, updatedPersonalDetail);
    return updatedPersonalDetail;
  }

  async getProfilePicture(id: ObjectId) {
    const user = await this.userRepository.findOneBy({
      _id: id,
    });
    if (!user.profile_picture)
      throw new AppNotFoundException(
        'you have not uploaded a profile picture yet',
      );

    const profilePicture = await this.fileRepository.findOneBy({
      _id: user.profile_picture,
    });

    return profilePicture.url;
  }
}
