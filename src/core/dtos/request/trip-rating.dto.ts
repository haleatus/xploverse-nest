import { ObjectId } from 'mongodb';

export class TripRatingDto {
  ratings?: number;
  comment?: string;
  rater: ObjectId;
  trip: ObjectId;
}
