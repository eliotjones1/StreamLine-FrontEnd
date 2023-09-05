import { useContext } from 'react';
//import { LoginContext } from '/src/modules/auth/contexts/Auth';
import { LoginContext } from '/src/api/modules/auth';

export default function useTMDB() {
	return useContext(LoginContext);
}
