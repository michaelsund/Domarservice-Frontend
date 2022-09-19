import React, { createContext, useState } from 'react';
import { CheckLoginStatus } from '../Helpers/CheckLoginStatus';
import { GetRole } from '../Helpers/GetRole';
import { Role } from '../Types/Role';

export const DomarserviceContext: any = createContext({});

export const DomarserviceContextProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(CheckLoginStatus());
  const [role, setRole] = useState<Role | null>(GetRole());

  return (
    <DomarserviceContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole }}>
      {children}
    </DomarserviceContext.Provider>
  );
};
