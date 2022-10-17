import { RefereeType } from '../../RefereeType';
import { BookingRequestByRefereeDto } from '../BookingRequestByRefereeDto';
import { SimpleCompanyDto } from './SimpleCompanyDto';

export interface ExtendedCompanyEventDto {
  id: number;
  name: string;
  location: string;
  date: Date;
  company: SimpleCompanyDto;
  sportType: number;
  refereeTypesForEvent: RefereeType[];
  bookingRequestByReferees: BookingRequestByRefereeDto[];
}
