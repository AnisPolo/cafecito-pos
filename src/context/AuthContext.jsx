import { createContext, useContext, useState } from "react";
import { login as loginRequest } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem("session")); } catch { return null; }
  });

  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    localStorage.setItem("session", JSON.stringify(data));
    setSession(data);
  };
  const logout = () => {
    localStorage.removeItem("session");
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ token: session?.token, user: session?.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
