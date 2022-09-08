import { SimpleRefereeDto } from './SimpleRefereeDto';
import { BookingRequestByCompanysDto } from './BookingRequestByCompanysDto';

export interface RefereeScheduleDto {
  id: number;
  referee: SimpleRefereeDto,
  availableAt: string,
  bookingRequestByCompanys: BookingRequestByCompanysDto[],
}
