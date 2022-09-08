import { RefereeType } from '../../RefereeType';
import { SimpleCompanyDto } from './SimpleCompanyDto';

export interface BookingRequestByCompanysDto {
  id: number;
  message: string;
  requestingCompany: SimpleCompanyDto;
  refereeType: RefereeType;
  requestingCompanyEventId: number;
  accepted: boolean;
  respondedAt: string;
}
