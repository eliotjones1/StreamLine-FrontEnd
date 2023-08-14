import { useContext } from 'react';
import { LoginContext } from '../../contexts/Auth';

export default function useAuth() {
  return useContext(LoginContext);
}
