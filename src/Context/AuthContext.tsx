import React from "react";

export type AuthContextType = {
  token: string;
  setToken: (token: string) => void;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);
