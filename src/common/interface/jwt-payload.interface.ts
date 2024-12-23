import { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export interface JwtPayloadInterface extends JwtPayload {
  _id: string | ObjectId;
}
