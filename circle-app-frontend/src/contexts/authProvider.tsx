import { useState } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const register = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <AuthContext.Provider value={{ token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
