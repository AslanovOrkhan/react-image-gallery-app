import type { GalleryImage } from "./gallery";

export interface GalleryCardProps {
  image: GalleryImage;
  onImageClick: (image: GalleryImage) => void;
  isLiked: boolean;
  onLike: (image: GalleryImage) => void;
  onDelete: (image: GalleryImage) => void;
}
