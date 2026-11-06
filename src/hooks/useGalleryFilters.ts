import { useState } from "react";
import type { Category, GalleryImage } from "../types/gallery";

export const useGalleryFilters = (
  images: GalleryImage[],
  likesIds: Set<number>,
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [isFavoritesView, setIsFavoritesView] = useState(false);

  const filteredImages = images.filter((image) => {
    const matchesSearch = image.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || image.category === selectedCategory;

    const matchesFavorites = !isFavoritesView || likesIds.has(image.id);

    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const handleHome = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setIsFavoritesView(false);
  };

  return {
    searchQuery,
    selectedCategory,
    isFavoritesView,
    filteredImages,
    setSearchQuery,
    setSelectedCategory,
    setIsFavoritesView,
    handleHome,
  };
};
