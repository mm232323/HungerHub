export const SORT_OPTIONS = [
  { id: "default", label: "sortOptions.default" },
  { id: "price_asc", label: "sortOptions.price_asc" },
  { id: "price_desc", label: "sortOptions.price_desc" },
  { id: "name", label: "sortOptions.name" },
];

export const PRICE_RANGES = [
  { id: "all", label: "priceRanges.all" },
  { id: "under10", label: "priceRanges.under10", min: 0, max: 10 },
  { id: "10to20", label: "priceRanges.10to20", min: 10, max: 20 },
  { id: "over20", label: "priceRanges.over20", min: 20, max: 9999 },
];
