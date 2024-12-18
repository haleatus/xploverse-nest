import { ObjectId } from 'mongodb';

export const converToObjectId = (stringId: string) => {
  return ObjectId.createFromHexString(stringId);
};
