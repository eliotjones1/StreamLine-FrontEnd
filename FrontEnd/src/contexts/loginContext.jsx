import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginContext = createContext();

export default function LoginProvider({ children }){
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    let session = Cookies.get('session');
    if (session){
      axios.get('#').then(() => {
        return true;
      }).catch(() =>{
        return false;
      });
    } else {
      return false;
    }
  });

  const signUp = async (userData) => {
    await axios.post('http://127.0.0.1:8000/api/auth/register', userData);
    login(userData);
  }

  const login = async (userData) => {
    const { data } = await axios.post('http://127.0.0.1:8000/api/auth/login', userData,  { withCredentials: true });
    setIsLoggedIn(true);
    Cookies.set('session', JSON.stringify(data.sessionID), { secure: true, sameSite: 'strict' });
    nav('/user-dash');
  } 

  const logout = async () => {
    await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {withCredentials: true});
    setIsLoggedIn(false);
    Cookies.remove('session');
    nav("/");
  }

  return (
    <LoginContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      signUp,
    }}>
      {children}
    </LoginContext.Provider>);
};