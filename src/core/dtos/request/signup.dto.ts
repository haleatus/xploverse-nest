import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
