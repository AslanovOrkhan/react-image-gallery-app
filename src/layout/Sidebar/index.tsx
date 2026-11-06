import { categories } from "../../data/categories";
import type { SidebarProps } from "../../types/sidebar";

const Sidebar = ({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
}: SidebarProps) => {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="close navigation menu"
          onClick={onClose}
          className="fixed inset-0 top-19.25 z-30 bg-slate-950/30 lg:hidden"
        ></button>
      )}
      <aside
        className={`fixed bottom-0 left-0 lg:top-21 top-19 z-40 flex w-60 transform overflow-y-auto
                border-r border-slate-200 bg-white px-5 py-8 transition-transform duration-300 ease-out
                dark:border-slate-800 dark:bg-slate-950 lg:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav aria-label="Image categories">
          <ul className="space-y-1">
            {categories.map(({ label, value, icon: Icon }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => {
                    onCategoryChange(value);
                    onClose();
                  }}
                  aria-pressed={selectedCategory === value}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5
                        text-sm font-medium transition-colors ${
                          selectedCategory === value
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
                        }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
