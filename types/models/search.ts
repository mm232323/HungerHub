import type { Merchant } from "./merchant";
import type { Product } from "./product";

/** Combined search API payload. */
export interface SearchResults {
  merchants: Merchant[];
  products: Product[];
}

/** Query string for search endpoints. */
export type SearchParams = {
  q: string;
};
