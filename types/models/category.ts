/** Product category shown in discovery and filters. */
export interface Category {
  id: number;
  name: string;
  name_ar?: string;
  slug: string;
  icon: string;
  /** @nullable */
  image?: string | null;
  productCount?: number;
}
