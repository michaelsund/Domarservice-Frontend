import { CountyDto } from '../CountyDto';
import { SimpleRefereeSportDto } from '../SimpleRefereeSportDto';

export interface SimpleRefereeDto {
  id: number;
  surname: string,
  lastname: string,
  sports: SimpleRefereeSportDto[],
  countys: CountyDto[],
}
