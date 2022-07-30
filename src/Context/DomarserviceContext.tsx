import React, { createContext, useState } from 'react';
import { CheckLoginStatus } from '../Helpers/CheckLoginStatus';

export const DomarserviceContext: any = createContext({});

export const DomarserviceContextProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(CheckLoginStatus());

  return (
    <DomarserviceContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </DomarserviceContext.Provider>
  );
};
