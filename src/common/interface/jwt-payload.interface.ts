import { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'typeorm';

export interface JwtPayloadInterface extends JwtPayload {
  _id: string | ObjectId;
}
