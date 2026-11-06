import { useEffect, useState } from "react";
import { galleryImages } from "../data/images";
import type { Category, GalleryImage } from "../types/gallery";

const uploadedImageStorageKey = "image-gallery-uploaded-images";
const likesStorageKey = "image-gallery-likes";
const likedIdStorageKey = "image-gallery-liked-ids";
const deletedIdStorageKey = "imag-gallery-deleted-ids";

const getSavedDeletedIds = () => {
  const saveddeletedIds = localStorage.getItem(deletedIdStorageKey);

  try {
    return new Set<number>(saveddeletedIds ? JSON.parse(saveddeletedIds) : []);
  } catch {
    return new Set<number>();
  }
};

const getSavedImages = () => {
  const savedImages = localStorage.getItem(uploadedImageStorageKey);
  const savedLikes = localStorage.getItem(likesStorageKey);
  const deletedIds = getSavedDeletedIds();
  let likesById: Record<string, number> = {};

  try {
    likesById = savedLikes
      ? (JSON.parse(savedLikes) as Record<string, number>)
      : {};
  } catch {
    likesById = {};
  }

  const savedUploadedImages = savedImages
    ? (() => {
        try {
          return JSON.parse(savedImages) as GalleryImage[];
        } catch {
          return [];
        }
      })()
    : [];

  return [...savedUploadedImages, ...galleryImages]
    .filter((image) => !deletedIds.has(image.id))
    .map((image) => ({
      ...image,
      likes: likesById[image.id] ?? image.likes,
    }));
};

const getSavedLikesIds = () => {
  const savedLikedIds = localStorage.getItem(likedIdStorageKey);

  try {
    return new Set<number>(savedLikedIds ? JSON.parse(savedLikedIds) : []);
  } catch {
    return new Set<number>();
  }
};
export const useGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>(getSavedImages);
  const [likedIds, setLikedIds] = useState<Set<number>>(getSavedLikesIds);
  const [deleteIds, setDeleteIds] = useState<Set<number>>(getSavedDeletedIds);

  useEffect(() => {
    const uploadedImages = images.filter(
      (image) =>
        !galleryImages.some((defaultImage) => defaultImage.id === image.id),
    );
    localStorage.setItem(
      uploadedImageStorageKey,
      JSON.stringify(uploadedImages),
    );
    localStorage.setItem(deletedIdStorageKey, JSON.stringify([...deleteIds]));
  }, [images, likedIds]);

  const handleUpload = (
    file: File,
    title: string,
    description: string,
    category: Category,
  ) => {
    const uploadedImage: GalleryImage = {
      id: Date.now(),
      title,
      description: description || "Anewly added from your personal gallery.",
      category,
      image: "",
      likes: 0,
    };

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImages((currentImages) => [
        { ...uploadedImage, image: String(fileReader.result) },
        ...currentImages,
      ]);
    };
    fileReader.readAsDataURL(file);
  };

  const handleLike = (image: GalleryImage) => {
    const isCurrentlyLiked = likedIds.has(image.id);
    setLikedIds((currentLikedIds) => {
      const nextLikedIds = new Set(currentLikedIds);
      const isLiked = nextLikedIds.has(image.id);

      if (isLiked) {
        nextLikedIds.delete(image.id);
      } else {
        nextLikedIds.add(image.id);
      }

      return nextLikedIds;
    });

    setImages((currentImages) =>
      currentImages.map((currentImage) =>
        currentImage.id === image.id
          ? {
              ...currentImage,
              likes: currentImage.likes + (isCurrentlyLiked ? -1 : 1),
            }
          : currentImage,
      ),
    );
  };

  const handleDelete = (image: GalleryImage) => {
    setImages((currentImages) =>
      currentImages.filter((currentImage) => currentImage.id !== image.id),
    );
    setDeleteIds((currentLikedIds) => {
      const nextDeleteIds = new Set(currentLikedIds);
      nextDeleteIds.delete(image.id);
      return nextDeleteIds;
    });
  };

  return { images, likedIds, handleUpload, handleLike, handleDelete };
};
