import type { Category } from "./gallery";

export interface GalleryFiltersProps {
  searchQuery: string;
  selectedCategory: Category;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category) => void;
}
