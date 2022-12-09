import { SimpleRefereeDto } from './Requests/SimpleRefereeDto';

export interface ScheduleDto {
  id: number;
  from: string;
  to: string;
  referee: SimpleRefereeDto;
}
