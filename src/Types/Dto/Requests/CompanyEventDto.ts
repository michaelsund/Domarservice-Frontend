import { RefereeType } from '../../RefereeType';
import { BookingRequestByRefereeDto } from '../BookingRequestByRefereeDto';
import { SimpleCompanyDto } from './SimpleCompanyDto';

export interface CompanyEventDto {
  id: number;
  name: string;
  location: string;
  date: Date;
  startTime: string;
  endTime: string;
  company: SimpleCompanyDto;
  sportType: number;
  refereeTypesForEvent: RefereeType[];
  bookingRequestByReferees: BookingRequestByRefereeDto[];
}
