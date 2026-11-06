import { FaHeart, FaHome, FaThLarge, FaUpload, FaUser } from "react-icons/fa";
import type { MobileNavProps } from "../../types/mobileNav";

const MobileNav = ({
  onHome,
  onCategories,
  onUpload,
  onFavorites,
  onProfile,
}: MobileNavProps) => {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]
      pt-2 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/95
      lg:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5">
        <button
          type="button"
          onClick={onHome}
          className="flex flex-col items-center gap-1 rounded-lg py-1.5 text-[11px]
             font-medium text-indigo-600"
        >
          <FaHome className="size-4" />
          <span>Home</span>
        </button>
        <button
          type="button"
          onClick={onCategories}
          className="flex flex-col items-center gap-1 rounded-lg py-1.5 text-[11px]
        font-medium hover:text-indigo-600 text-slate-500 dark:text-slate-400 transition-colors"
        >
          <FaThLarge className="size-4" />
          <span>Categories</span>
        </button>
        <button
          type="button"
          onClick={onUpload}
          className="flex flex-col items-center gap-1 rounded-lg py-1.5 text-[11px]
        font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm shadow-indigo-200">
            <FaUpload className="size-3" />
          </span>
          <span>Upload</span>
        </button>
        <button
          type="button"
          aria-label="Favorites"
          onClick={onFavorites}
          className="flex flex-col items-center gap-1 rounded-lg py-1.5
        text-[11px] font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400"
        >
          <FaHeart className="size-4" />
          <span>Favorites</span>
        </button>
        <button
          type="button"
          aria-label="Profile"
          onClick={onProfile}
          className="flex flex-col items-center gap-1 py-1.5 rounded-lg text-[11px] font-medium text-slate-500 transition-colors
         hover:text-indigo-600 dark:text-slate-400"
        >
          <FaUser className="size-4" />
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNav;
