import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/isAuthenticated/', { withCredentials: true }).then(() => {
      setIsLoggedIn(true);
    });
  }, []);

  const signUp = async (userData) => {
    await axios.post('http://127.0.0.1:8000/api/auth/register', userData, { withCredentials: true });
    login(userData);
  };

  const login = async (userData) => {
    await axios.post('http://127.0.0.1:8000/api/auth/login', userData, { withCredentials: true });
    setIsLoggedIn(true);
    nav('/user-dash');
  };

  const logout = async () => {
    await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, { withCredentials: true });
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

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};