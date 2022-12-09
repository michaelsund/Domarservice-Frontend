import { RefereeType } from '../RefereeType';
import { SportType } from '../SportType';
import { SimpleCompanyDto } from './Requests/SimpleCompanyDto';
import { ScheduleDto } from './ScheduleDto';

export interface BookingRequestByCompanyDto {
  id: number;
  message: string;
  requestingCompany: SimpleCompanyDto;
  refereeType: RefereeType;
  sportType: SportType;
  schedule: ScheduleDto;
  requestingCompanyEventId: number;
  accepted: boolean;
  respondedAt: Date;
}
