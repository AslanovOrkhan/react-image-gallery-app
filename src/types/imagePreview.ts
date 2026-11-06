import type { GalleryImage } from "./gallery";

export interface ImagePreviewProps {
  image: GalleryImage;
  onClose: () => void;
  isLiked: boolean;
  onLike: (image: GalleryImage) => void;
}
