import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        isAdmin: action.payload.isAdmin
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false
      };
    default:
      return state;
  }
};

export default function LoginProvider({ children }) {
  const nav = useNavigate();
  const [state, dispatch] = useReducer(authReducer, { isLoggedIn: false, isAdmin: false });

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    await axios.get('http://127.0.0.1:8000/isAuthenticated/', { withCredentials: true });
    dispatch({ type: 'LOGIN', payload: { isAdmin: false } }); 
  };

  const signUp = async (userData) => {
    await axios.post('http://127.0.0.1:8000/api/auth/register', userData, { withCredentials: true });
    login(userData);
  };

  const login = async (userData) => {
    const { data } = await axios.post('http://127.0.0.1:8000/api/auth/login', userData, { withCredentials: true });
    dispatch({ type: 'LOGIN', payload: { isAdmin: data.is_staff } });
    nav('/user-dash');
  };

  const logout = async () => {
    await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, { withCredentials: true });
    dispatch({ type: 'LOGOUT' });
    nav('/');
  };

  const resetPassword = async (email) => {
    await axios.post('http://127.0.0.1:8000/api/password_reset/', { email: email }, { withCredentials: true });
    nav('/signin');
  }

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        isAdmin: state.isAdmin,
        login,
        logout,
        resetPassword,
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
