export type Category =
  | "All"
  | "Nature"
  | "Travel"
  | "City"
  | "People"
  | "Animals"
  | "Food"
  | "Technology"
  | "Minimal";

export interface GalleryImage {
  id: number;
  title: string;
  description: string;
  image: string;
  likes: number;
  category: Category;
}
