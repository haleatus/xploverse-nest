import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class XplorerSignUpDto {
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  password: string;
}

export class TripPlannerSignUpDto {}
