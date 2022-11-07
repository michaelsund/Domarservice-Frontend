import { BookingRequestByCompanyDto } from './BookingRequestByCompanyDto';

export interface RefereeMonthScheduleDto {
  day: number;
  dayName: string;
  week: number;
  availableAt: string;
  bookingRequestByCompanys: BookingRequestByCompanyDto[];
}
