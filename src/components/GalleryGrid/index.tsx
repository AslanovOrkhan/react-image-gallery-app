import { useEffect, useState } from "react";
import type { GalleryGridProps } from "../../types/galleryGrid";
import GalleryCard from "../GalleryCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const GalleryGrid = ({
  images,
  onImageClick,
  likedIds,
  onLike,
  onDelete,
}: GalleryGridProps) => {
  const imagesPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const firstImageIndex = (currentPage - 1) * imagesPerPage;
  const visibleImages = images.slice(
    firstImageIndex,
    firstImageIndex + imagesPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [images]);
  return (
    <section className="mt-5" aria-label="Image Gallery">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {visibleImages.map((image, index) => (
          <div
            key={image.id}
            className="gallery-card-enter"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <GalleryCard
              image={image}
              onImageClick={onImageClick}
              isLiked={likedIds.has(image.id)}
              onLike={onLike}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
      {images.length === 0 && (
        <p className="py-16 text-center text-sm text-slate-500">
          No images found
        </p>
      )}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            className="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition
            hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40
            dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40"
          >
            <FiChevronLeft />
          </button>
          <div
            className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700
          dark:bg-slate-900"
          >
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  onClick={() => setCurrentPage(page)}
                  className={`flex size-8 items-center justify-center rounded-lg text-sm font-semibold transition-colors
                ${
                  currentPage === page
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
                }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>
          <button
            type="button"
            aria-label="Next Page"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            className="flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600
          transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40
          dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40"
          >
            <FiChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      )}
    </section>
  );
};

export default GalleryGrid;
