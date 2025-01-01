import { CarPoolStatusEnum } from 'src/common/enums/carpool-status.enum';

export class CreateCarPoolRequestDto {
  carpool_status?: CarPoolStatusEnum;
  participants_count: number;
  trip: string;
}

export class EditCarPoolRequestDto {
  carpool_status?: CarPoolStatusEnum;
  participants_count?: number;
}
