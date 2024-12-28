import { TripStatusEnum } from 'src/common/enums/trip-status.enum';
import { GeoDataInterface } from 'src/common/interface/geodata.interface';
import { TripStopsInterface } from 'src/common/interface/trip-stops.interfacet';

export class TripDto {
  title: string;
  description: string;
  planner_id: string;
  trip_status?: TripStatusEnum;
  end_date: Date;
  start_point: GeoDataInterface;
  end_point: GeoDataInterface;
  stops: TripStopsInterface;
  is_car_pool: boolean;
  max_participants: number;
}
