import type { GalleryImage } from "./gallery";

export interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
  likedIds: Set<number>;
  onLike: (image: GalleryImage) => void;
  onDelete: (image: GalleryImage) => void;
}
