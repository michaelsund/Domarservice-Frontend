import { CountyDto } from "../CountyDto";
import { RefereeSportDto } from "../RefereeSportDto";

export interface RefereeDto {
  id: number;
  surname: string;
  lastname: string;
  sports: RefereeSportDto[];
  countys: CountyDto[];
  // Schedules: ScheduleDto[];
  // Countys: 
}