import { useState } from "react";
import type { GalleryImage } from "../types/gallery";

export const useModalState = () => {
  const [selectedImage, setselectedImage] = useState<GalleryImage | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return {
    selectedImage,
    isSidebarOpen,
    isUploadModalOpen,
    isProfileOpen,
    setselectedImage,
    setIsSidebarOpen,
    setIsUploadModalOpen,
    setIsProfileOpen,
  };
};
