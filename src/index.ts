import { Address } from './types';

export function storeAddress(address: Address) {
  const store: Address[] = [];
  store.push(address);
  return store;
}
export { Address };
