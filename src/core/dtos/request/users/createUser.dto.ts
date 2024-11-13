import { IsString, Length, Validate } from 'class-validator';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPasswordMatch', async: false })
class IsPasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(confirm_password: any, args: ValidationArguments) {
    const { object } = args;
    return object['password'] === confirm_password;
  }

  defaultMessage() {
    return 'Passwords do not match';
  }
}

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  full_name: string;

  @IsString()
  @Length(3, 10)
  username: string;

  @IsString()
  @Length(3, 20)
  email: string;

  @IsString()
  @Length(6, 12)
  password: string;

  @IsString()
  @Length(6, 12)
  @Validate(IsPasswordMatchConstraint)
  confirm_password: string;
}
