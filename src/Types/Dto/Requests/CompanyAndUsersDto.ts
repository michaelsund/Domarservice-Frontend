import { CountyType } from '../../CountyType';
import { SimpleUserDto } from './SimpleUserDto';

export interface CompanyAndUsersDto {
  id: number;
  name: string;
  email: string;
  city: string;
  county: CountyType;
  users: SimpleUserDto[];
  // Add sports here
}
