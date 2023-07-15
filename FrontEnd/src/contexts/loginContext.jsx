import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const LoginContext = createContext();

export default function LoginProvider({ children }){
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

  const signUp = (userData) => {
    axios.post('http://127.0.0.1:8000/api/auth/register', userData).then(() => {
      login(userData)
    });
  }

  const login = (userData) => {
    axios.post('http://127.0.0.1:8000/api/auth/login', userData,  { withCredentials: true }).then(response => {
      setIsLoggedIn(true);
      Cookies.set('session', JSON.stringify(response.data.sessionID), { secure: true, sameSite: 'strict' });
    });
  } 

  const logout = () => {
    axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {withCredentials: true}).then(() => {
      setIsLoggedIn(false);
      Cookies.remove('session');
    });
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