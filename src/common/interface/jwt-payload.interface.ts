import { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { UserTypeEnum } from '../enums/users/user-type.enum';

export interface JwtPayloadInterface extends JwtPayload {
  _id: string | ObjectId;
  user_type: UserTypeEnum;
}
