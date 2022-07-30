import { Dispatch } from 'react';

export type DomarserviceContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn?: (isLoggedIn: boolean) => void;
}
