import { useContext } from 'react';
import { LoginContext } from '/src/modules/auth/contexts/Auth';

export default function useTMDB() {
  return useContext(LoginContext);
}
