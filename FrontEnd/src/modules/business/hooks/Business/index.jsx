import { useContext } from 'react';
//import { BusinessContext } from '/src/modules/business/contexts/Business';
import { BusinessContext } from '/src/api/modules/business';

export default function useBusiness() {
	return useContext(BusinessContext);
}
