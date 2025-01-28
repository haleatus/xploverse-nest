import { IsEmail, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';

export class EditUserDto {
  username?: string;
  fullname?: string;
  @IsOptional()
  @IsEmail()
  email: string;
  profile_picture?: string;
  phone_number?: string;
}
