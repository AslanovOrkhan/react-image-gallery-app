import type { Category } from "./gallery";

export interface UploadModalProps {
  onClose: () => void;
  onUpload: (
    file: File,
    title: string,
    description: string,
    category: Category,
  ) => void;
}
