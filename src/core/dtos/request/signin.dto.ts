import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class XplorerSignInDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
