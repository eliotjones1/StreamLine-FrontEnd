import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        role: action.payload.role, // Set the role from the payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        role: '',
      };
    default:
      return state;
  }
};

export default function AuthProvider({ children }) {
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
    await axios.post('http://127.0.0.1:8000/api/auth/login', userData, { withCredentials: true });
    dispatch({ type: 'LOGIN', payload: { isAdmin: false } });
    nav('/user-dash');
  };

  const logout = async () => {
    await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, { withCredentials: true });
    dispatch({ type: 'LOGOUT' });
    nav('/');
  };

  const resetPassword = async () => {
    await axios.post('http://127.0.0.1:8000/api/password_reset/', { email: event.target.email.value }, { withCredentials: true });
    nav('/signin');
  }

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
