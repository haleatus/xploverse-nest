import { CarPoolRequestStatusEnum } from 'src/common/enums/carpool-request-status.enum';

export class CreateCarPoolRequestDto {
  carpool_request_status?: CarPoolRequestStatusEnum;
  participants_count: number;
  trip: string;
}

export class EditCarPoolRequestDto {
  carpool_request_status?: CarPoolRequestStatusEnum;
  participants_count?: number;
}
