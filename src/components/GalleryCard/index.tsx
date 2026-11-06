import { useState } from "react";
import type { GalleryCardProps } from "../../types/galleryCard";
import { FiHeart, FiImage, FiTrash2 } from "react-icons/fi";

const GalleryCard = ({
  image,
  onImageClick,
  isLiked,
  onLike,
  onDelete,
}: GalleryCardProps) => {
  const [isLoading, setIsloading] = useState(true);
  const [hasError, setHasError] = useState(false);
  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-slate-100 shadow-sm aspect-16/10"
      role="button"
      tabIndex={0}
      onClick={() => onImageClick(image)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === "") {
          onImageClick(image);
        }
      }}
    >
      {isLoading && !hasError && (
        <div className="absolute inset-o animate-pulse bg-slate-200 dark:bg-slate-800"></div>
      )}
      {hasError ? (
        <div
          className="flex h-full flex-col items-center justify-center gap-2
        bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
        >
          <FiImage className="size-8" />
          <span className="text-xs">Image unavailable</span>
        </div>
      ) : (
        <img
          src={image.image}
          alt={image.title}
          loading="lazy"
          onLoad={() => setIsloading(false)}
          onError={() => {
            setIsloading(false);
            setHasError(true);
          }}
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-105
            ${isLoading ? "opacity-0" : "opacity-100"}`}
        />
      )}
      <div
        className="absolute inset-x-0 bottom-0 from-black/80 via-black/35 to-transparent
      px-3 pb-2 pt-10 text-white sm:px-4 sm:pb-3 sm:pt-12 bg-linear-to-t"
      >
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold sm:text-base">
              {image.title}
            </h2>
            <p className="mt-0.5 text-xs text-white/85">{image.category}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label={
                isLiked ? `Unlike ${image.title}` : `Like ${image.title}`
              }
              aria-pressed={isLiked}
              onClick={(event) => {
                event.stopPropagation();
                onLike(image);
              }}
              className="flex items-center gap-1 rounded-md px-1 py-1 text-xs font-medium text-white/90
              transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <FiHeart
                aria-hidden="true"
                className={`size-4 ${isLiked ? "fill-rose-400 text-rose-400" : ""}`}
              />
              <span>{image.likes}</span>
            </button>
            <button
              type="button"
              aria-label={`Delete ${image.title}`}
              title="Delete image"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(image);
              }}
              className="rounded-md p-1.5 text-white/90 transition hover;bg-rose-500/80 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-white"
            >
              <FiTrash2 aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default GalleryCard;
