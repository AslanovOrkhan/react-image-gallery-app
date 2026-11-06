import { useEffect, useState } from "react";
import type { ImagePreviewProps } from "../../types/imagePreview";
import { FiHeart, FiImage, FiX } from "react-icons/fi";

const ImagePreview = ({
  image,
  onClose,
  isLiked,
  onLike,
}: ImagePreviewProps) => {
  const [hasImageError, sethasImageError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="preview-backdrop-enter fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${image.title} preview`}
        className="preview-panel-enter modal-scrollbar relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl
        bg-white shadow-2xl dark:bg-slate-900"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close Image preview"
          title="Close preview"
          onClick={onClose}
          className="sticky top-3 z-10 -mb-10 ml-auto mr-3 flex size-10 items-center justify-center rounded-full bg-black/50 text-white shadow-lg
        backdrop-blur-sm transition-colors hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white "
        >
          <FiX className="size-5" />
        </button>

        {hasImageError ? (
          <div
            className="flex h-64 flex-col items-center justify-center gap-3 bg-slate-100 text-slate-400
            dark:bg-slate-950 dark:text-slate-500"
          >
            <FiImage className="size-10" />
            <span className="text-sm"> Image unavailable</span>
          </div>
        ) : (
          <img
            src={image.image}
            alt={image.title}
            onError={() => sethasImageError(true)}
            className="max-h-[62vh] w-full bg-slate-100 object-cover dark:bg-slate-950"
          />
        )}

        <div className="flex flex-col gap-6 px-5 py-6 sm:px-8 sm:py-7">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
                Photo Details
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl ">
                {image.title}
              </h2>
              <span
                className="mt-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950
              dark:text-indigo-300"
              >
                {image.category}
              </span>
            </div>
            <button
              type="button"
              aria-label={
                isLiked ? `Unlike ${image.title}` : `Like ${image.title}`
              }
              aria-pressed={isLiked}
              onClick={() => onLike(image)}
              className="flex shrink-0 flex-col items-center rounded-xl border border-slate-200 px-3 py-2 text-slate-600 transition
              hover:border-rose-300 hover:bg-rose-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-900 dark:hover:bg-rose-950/30"
            >
                <FiHeart className={`size-4 ${isLiked ? "fill-rose-500 text-rose-500" : "text-rose-500"}`}/>
                <span className="mt-1 text-xs font-bold">{image.likes}</span>
            </button>
          </div>
          <div className="border-t border-slate-100 pt-5 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Description
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
                {image.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
