import { useContext } from 'react';
import { AccountContext } from '/src/modules/auth/contexts/Account';

export default function useAccount() {
  return useContext(AccountContext);
}