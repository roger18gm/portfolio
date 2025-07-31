import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type AuthContextType = {
  isAuth: boolean | null;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuth: null,
  checkAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const checkAuth = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        withCredentials: true,
      });
      setIsAuth(true);
    } catch {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
