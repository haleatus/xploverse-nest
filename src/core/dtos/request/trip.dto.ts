import { TripStatusEnum } from 'src/common/enums/trip-status.enum';
import { GeoDataInterface } from 'src/common/interface/geodata.interface';
import { TripStopsInterface } from 'src/common/interface/trip-stops.interfacet';

export class CreateTripDto {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  start_point: GeoDataInterface;
  end_point: GeoDataInterface;
  stops: TripStopsInterface;
  is_car_pool?: boolean;
  max_participants: number;
}

export class updateTripDto {
  title?: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  start_point?: GeoDataInterface;
  end_point?: GeoDataInterface;
  stops?: TripStopsInterface;
  is_car_pool?: boolean;
  trip_status?: TripStatusEnum;
  max_participants?: number;
}
