import { createContext } from "react";

export type AuthContextType = {
  token: string | null;
  register: (token: string) => void;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
