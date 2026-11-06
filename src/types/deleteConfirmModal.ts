import type { GalleryImage } from "./gallery";

export interface deleteConfirmModalProps {
  image: GalleryImage;
  onCancel: () => void;
  onConfirm: () => void;
}
