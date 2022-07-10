import { SportType } from '../../SportType';

export interface CompanyEventDto {
  id: number;
  name: string;
  location: string;
  date: Date;
  sporttype: SportType;
}
