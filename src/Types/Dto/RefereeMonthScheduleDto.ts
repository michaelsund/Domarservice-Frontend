import { BookingRequestByCompanyDto } from './BookingRequestByCompanyDto';

export interface RefereeMonthScheduleDto {
  id: number;
  day: number;
  dayName: string;
  week: number;
  availableAt: string;
  bookingRequestByCompanys: BookingRequestByCompanyDto[];
}
