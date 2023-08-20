import { useContext } from 'react';
import { AccountContext } from '/src/modules/account/contexts/Account';

export default function useAccount() {
  return useContext(AccountContext);
}