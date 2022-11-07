import { RefereeType } from '../RefereeType';
import { SportType } from '../SportType';
import { SimpleCompanyDto } from './Requests/SimpleCompanyDto';

export interface BookingRequestByCompanyDto {
  id: number;
  message: string;
  requestingCompany: SimpleCompanyDto;
  refereeType: RefereeType;
  sportType: SportType;
  requestingCompanyEventId: number;
  accepted: boolean;
  respondedAt: Date;
}
