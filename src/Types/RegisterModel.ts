import { CountyType } from './CountyType';

export type RegisterModel = {
  surname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  information: string;
  registerAsReferee: boolean;
  companyName: string;
  companyCity: string;
  companyCounty: number;
};
