import { ObjectId } from 'mongodb';

export const convertToObjectId = (stringId: string) => {
  return ObjectId.createFromHexString(stringId);
};
