import { Available } from '../Available';
import { BookingRequestByCompanyDto } from './BookingRequestByCompanyDto';

export interface RefereeMonthScheduleDto {
  id: number;
  day: number;
  dayName: string;
  week: number;
  availableTimes: Available[];
  bookingRequestByCompanys: BookingRequestByCompanyDto[];
}
