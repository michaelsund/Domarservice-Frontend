import React, { createContext, useState } from 'react';
import { CheckLoginStatus } from '../Helpers/CheckLoginStatus';
import { GetId } from '../Helpers/GetId';
import { GetName } from '../Helpers/GetName';
import { GetRole } from '../Helpers/GetRole';
import { Role } from '../Types/Role';

export const DomarserviceContext: any = createContext({});

export const DomarserviceContextProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(CheckLoginStatus());
  const [role, setRole] = useState<Role | null>(GetRole());
  const [id, setId] = useState<number | undefined>(GetId());
  const [fullName, setFullName] = useState<string>(GetName());

  return (
    <DomarserviceContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole, id, setId, fullName, setFullName }}>
      {children}
    </DomarserviceContext.Provider>
  );
};
