import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class SignUpDto {
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class AdminSignUpDto extends SignUpDto {}

export class UserSignUpDto extends SignUpDto {
  @IsNotEmpty()
  phone_number: string;

  is_operator?: boolean;
}

export class EditUserDto {
  username?: string;
  fullname?: string;
  @IsEmail()
  email?: string;
  profile_picture?: ObjectId;
  phone_number?: string;
}
