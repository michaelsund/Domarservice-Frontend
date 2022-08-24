import { RefereeType } from '../../RefereeType';
import { SportType } from '../../SportType';
import { SimpleCompanyDto } from './SimpleCompanyDto';

export interface ExtendedCompanyEventDto {
  id: number;
  name: string;
  location: string;
  date: Date;
  company: SimpleCompanyDto;
  sportType: number;
  refereeTypesForEvent: RefereeType[];
}
