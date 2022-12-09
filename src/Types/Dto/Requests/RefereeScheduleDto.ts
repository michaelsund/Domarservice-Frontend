import { BookingRequestByCompanyDto } from '../BookingRequestByCompanyDto';
import { SimpleRefereeDto } from './SimpleRefereeDto';

export interface RefereeScheduleDto {
  id: number;
  referee: SimpleRefereeDto,
  from: string;
  to: string;
  bookingRequestByCompanys: BookingRequestByCompanyDto[],
}
