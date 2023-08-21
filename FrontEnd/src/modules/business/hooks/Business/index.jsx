import { useContext } from 'react';
import { BusinessContext } from '/src/modules/business/contexts/Business';

export default function useBusiness() {
  return useContext(BusinessContext);
}