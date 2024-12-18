import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserTypeEnum } from 'src/common/enums/users/user-type.enum';

export class SignInDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  userType: UserTypeEnum;
}
