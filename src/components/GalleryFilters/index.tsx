import { FiChevronDown, FiSearch } from "react-icons/fi";
import type { GalleryFiltersProps } from "../../types/galleryFilter";
import type { Category } from "../../types/gallery";
import { categories } from "../../data/categories";

const GalleryFilters = ({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: GalleryFiltersProps) => {
  return (
    <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search images</span>
        <FiSearch
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search images..."
          className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900
         outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2
         focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white
         dark:focus:ring-indigo-900"
        />
      </label>
      <label className="relative sm:w-56">
        <span className="sr-only">Filter by category</span>
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value as Category)}
          className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white
        px-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-indigo-500
        focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900
        dark:text-slate-200 dark:focus:ring-indigo-900"
        >
          <option value="All">All categories</option>
          {categories.slice(1).map(({ label }) => (
            <option key={label}>{label}</option>
          ))}
        </select>
        <FiChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2
        size-4 -translate-y-1/2 text-slate-500"
        />
      </label>
    </section>
  );
};

export default GalleryFilters;
