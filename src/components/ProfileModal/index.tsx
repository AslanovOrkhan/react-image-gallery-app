import { FiHeart, FiImage, FiX } from "react-icons/fi";
import type { ProfileModalProps } from "../../types/profileModal";

const ProfileModal = ({
  imageCount,
  favoritesCount,
  onClose,
}: ProfileModalProps) => {
  return (
    <div
      role="presentation"
      onClick={onClose}
      className="preview-backdrop-enter fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4
      backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-label="true"
        aria-labelledby="profile-modal-title"
        className="preview-panel-enter w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
              Your Space
            </p>
            <h2
              id="profile-modal-title"
              className="mt-2 text-2xl font-bold text-slate-950 dark:text-white"
            >
              My Profile
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close profile"
            title="Close"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FiX className="size-5" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-indigo-50 p-4 dark:bg-indigo-950/40">
            <FiImage className="size-5 text-indio-600 dark:text-indigo-400" />
            <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              {imageCount}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Images</p>
          </div>
          <div className="rounded-xl bg-rose-50 p-4 dark:bg-rose-950/30">
            <FiHeart className="size-5 text-rose-500" />
            <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
              {favoritesCount}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Favorites
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
