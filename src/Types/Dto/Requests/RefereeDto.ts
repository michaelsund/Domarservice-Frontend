import { CountyDto } from '../CountyDto';
import { RefereeSport } from '../RefereeSport';

export interface RefereeDto {
  id: number;
  surname: string;
  lastname: string;
  sports: RefereeSport[];
  countys: CountyDto[];
  // Schedules: ScheduleDto[];
  // Countys:
}
