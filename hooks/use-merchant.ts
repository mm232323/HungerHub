import { createContext, useContext } from 'react';
import { Merchant } from '@/types';

export const MerchantContext = createContext<Merchant | null>(null);

export function useMerchant() {
  return useContext(MerchantContext);
}
