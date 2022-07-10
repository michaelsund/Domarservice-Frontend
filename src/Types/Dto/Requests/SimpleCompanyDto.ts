import { CountyType } from '../../CountyType';

export interface SimpleCompanyDto {
  id: number;
  name: string;
  city: string;
  county: CountyType;
  email: string;
  // Add sports here
}
