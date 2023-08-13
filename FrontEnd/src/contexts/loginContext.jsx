import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosNoCache } from '../axiosConfig';

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    axiosNoCache.get('http://127.0.0.1:8000/isAuthenticated/', { withCredentials: true }).then(() => {
      setIsLoggedIn(true);
    });
  });

  const signUp = async (userData) => {
    await axiosNoCache.post('http://127.0.0.1:8000/api/auth/register', userData, {
      withCredentials: true,
    });
    login(userData);
  };

  const login = async (userData) => {
    await axiosNoCache.post('http://127.0.0.1:8000/api/auth/login', userData, {
      withCredentials: true,
    });
    setIsLoggedIn(true);
    nav('/user-dash');
  };

  const logout = async () => {
    await axiosNoCache.post('http://127.0.0.1:8000/api/auth/logout', {}, { withCredentials: true });
    setIsLoggedIn(false);
    nav('/');
  };

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        signUp,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
