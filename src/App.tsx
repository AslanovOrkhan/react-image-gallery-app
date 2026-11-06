import { useState } from "react";
import "./App.css";
import GalleryFilters from "./components/GalleryFilters";
import GalleryGrid from "./components/GalleryGrid";
import { useGallery } from "./hooks/useGallery";
import { useGalleryFilters } from "./hooks/useGalleryFilters";
import { useModalState } from "./hooks/useModalState";
import { useTheme } from "./hooks/useTheme";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import type { GalleryImage } from "./types/gallery";
import ImagePreview from "./components/imagePreview";
import UploadModal from "./components/UploadModal";
import MobileNav from "./components/MobileNav";
import ProfileModal from "./components/ProfileModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { images, likedIds, handleUpload, handleLike, handleDelete } =
    useGallery();
  const [imageToDelete, setImageToDelete] = useState<GalleryImage | null>(null);
  const {
    searchQuery,
    selectedCategory,
    filteredImages,
    setSearchQuery,
    setSelectedCategory,
    setIsFavoritesView,
    handleHome: resetFilters,
  } = useGalleryFilters(images, likedIds);

  const {
    selectedImage,
    isSidebarOpen,
    isUploadModalOpen,
    isProfileOpen,
    setselectedImage,
    setIsSidebarOpen,
    setIsUploadModalOpen,
    setIsProfileOpen,
  } = useModalState();

  const handleHome = () => {
    resetFilters();
    setIsSidebarOpen(false);
  };
  return (
    <div
      className={
        isDarkMode ? "dark min-h-screen bg-slate-950" : "min-h-screen bg-white"
      }
    >
      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onUploadClick={() => setIsUploadModalOpen(true)}
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <div className="app-content-offset flex">
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="min-w-0 flex-1 p-6 pb-24 lg:ml-60 lg:pb-6">
          <GalleryFilters
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onSearchChange={setSearchQuery}
            onCategoryChange={setSelectedCategory}
          />
          <GalleryGrid
            images={filteredImages}
            onImageClick={setselectedImage}
            likedIds={likedIds}
            onLike={handleLike}
            onDelete={setImageToDelete}
          />
        </main>
      </div>
      {selectedImage && (
        <ImagePreview
          image={selectedImage}
          onClose={() => setselectedImage(null)}
          isLiked={likedIds.has(selectedImage.id)}
          onLike={handleLike}
        />
      )}
      {isUploadModalOpen && (
        <UploadModal
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleUpload}
        />
      )}
      <MobileNav
        onHome={handleHome}
        onCategories={() => setIsSidebarOpen(true)}
        onUpload={() => setIsUploadModalOpen(true)}
        onFavorites={() => {
          setIsFavoritesView(true);
          setIsProfileOpen(false);
          setIsSidebarOpen(false);
        }}
        onProfile={() => {
          setIsProfileOpen(true);
          setIsSidebarOpen(false);
        }}
      />
      {isProfileOpen && (
        <ProfileModal
          imageCount={images.length}
          favoritesCount={likedIds.size}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
      {imageToDelete && (
        <DeleteConfirmModal
          image={imageToDelete}
          onCancel={() => setImageToDelete(null)}
          onConfirm={() => {
            handleDelete(imageToDelete);
            setImageToDelete(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
