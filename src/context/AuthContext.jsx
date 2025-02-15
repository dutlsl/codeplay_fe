import React, { createContext, useState, useEffect, useCallback } from "react";
import { login, refreshToken } from "../services/authService";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [refreshTokenValue, setRefreshTokenValue] = useState(localStorage.getItem("refreshToken") || null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    setUser(null);
    setToken(null);
    setRefreshTokenValue(null);
  }, []);

  useEffect(() => {
    if (token) {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        setUser({ email: storedEmail });
      }
    }
  }, [token]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const storedEmail = localStorage.getItem("email");
      if (refreshTokenValue && storedEmail) {
        try {
          const data = await refreshToken(storedEmail, refreshTokenValue);
          setToken(data.result.token);
          setRefreshTokenValue(data.result.refreshToken);
          localStorage.setItem("token", data.result.token);
          localStorage.setItem("refreshToken", data.result.refreshToken);
        } catch (error) {
          console.error("토큰 갱신 실패. 로그아웃 처리됨.", error);
          logout();
        }
      }
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshTokenValue, logout]);

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      console.log("로그인 API 응답:", data.data);
      setUser({ email });
      setToken(data.data.result.token);
      setRefreshTokenValue(data.data.result.refreshToken);
      localStorage.setItem("token", data.data.result.token);
      localStorage.setItem("refreshToken", data.data.result.refreshToken);
      localStorage.setItem("email", email);
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
