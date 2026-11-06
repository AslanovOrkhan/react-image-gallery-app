import type { Category } from "./gallery";

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}
