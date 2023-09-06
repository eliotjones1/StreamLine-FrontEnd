import { useContext } from 'react';
import { AccountContext } from 'src/api/modules/account';

export default function useAccount() {
	return useContext(AccountContext);
}
