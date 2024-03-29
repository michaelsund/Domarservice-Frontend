import { RefereeType } from './RefereeType';
import { SportType } from './SportType';

export interface ISendNewEvent {
  location: string;
  sportType: number;
  refereeTypesForEvent: any[];
  name: string;
  date: string;
  durationHours: number;
  durationMinutes: number;
}
