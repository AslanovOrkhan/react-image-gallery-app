import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import type { ThemeToggleProps } from "../../types/themeToggle";

const ThemeToggle = ({ isDarkMode, onToggle }: ThemeToggleProps) => {
  const label = isDarkMode ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onToggle}
      className="flex size-10 items-center justify-center rounded-lg text-slate-600 transition-colors
    hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800
    dark:hover:text-white"
    >
      {isDarkMode ? (
        <IoSunnyOutline className="text-2xl text-amber-300" />
      ) : (
        <IoMoonOutline className="text-2xl text-slate-950" />
      )}
    </button>
  );
};

export default ThemeToggle;
