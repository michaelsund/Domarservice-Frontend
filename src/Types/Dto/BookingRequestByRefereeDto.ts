import { RefereeType } from '../RefereeType';
import { SimpleRefereeDto } from './Requests/SimpleRefereeDto';

export interface BookingRequestByRefereeDto {
  id: number;
  message: string;
  referee: SimpleRefereeDto;
  refereeType: RefereeType;
  accepted: boolean;
  appliedAt: Date;
}
