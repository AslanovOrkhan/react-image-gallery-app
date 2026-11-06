import { FaBars, FaImage } from "react-icons/fa";
import ThemeToggle from "../../components/ThemeToggle";
import type { HeaderProps } from "../../types/header";
import UploadButton from "../../components/UploadButton";

const Header = ({
  isDarkMode,
  onToggleTheme,
  onUploadClick,
  onMenuClick,
}: HeaderProps) => {
  return (
    <header
      className="fixed inset-x-0 top-0 z-30 border-b border-slate-200
    bg-white px-3 py-4 dark:border-slate-800 dark:bg-slate-950 lg:px-9"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex size-11 shrink-0 items-center justify-center
            rounded-xl bg-indigo-600 text-white sadow-sm shadow indigo-200"
          >
            <FaImage />
          </div>
          <div className="min-w-0">
            <h1
              className="truncate text-xl font-bold tracking-tight text-slate-950
                sm:text-2xl dark:text-white"
            >
              Image Gallery
            </h1>
            <p className="hidden text-sm text-slate-500 sm:block dark:text-slate-400">
              Discover amazing moments captured in beatiful photos
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
          <UploadButton onClick={onUploadClick} />
        </div>
        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
          <UploadButton onClick={onUploadClick} compact />
          <button
            type="button"
            aria-label="Open navigation menu"
            title="Open navigation menu"
            onClick={onMenuClick}
            className="flex size-10 items-center justify-center rounded-lg text-2xl text-slate-700
          transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
