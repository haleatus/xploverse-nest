import { IsEmail } from 'class-validator';
import { ObjectId } from 'typeorm';

export class EditUserDto {
  username?: string;
  fullname?: string;
  @IsEmail()
  email?: string;
  profile_picture?: ObjectId;
  phone_number?: string;
}
