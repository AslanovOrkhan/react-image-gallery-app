import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Category } from "../../types/gallery";
import { FiCheck, FiUploadCloud, FiX } from "react-icons/fi";
import type { UploadModalProps } from "../../types/uploadModal";
import { categories } from "../../data/categories";

const UploadModal = ({ onClose, onUpload }: UploadModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const applyFile = (selectedFile: File | undefined) => {
    if (!selectedFile || !selectedFile.type.startsWith("image/")) return;
    setFile(selectedFile);
    if (!title) {
      setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !title.trim() || !category) return;

    onUpload(file, title.trim(), description.trim(), category);
    onClose();
  };

  return (
    <div
      className="preview-backdrop-enter fixed inset-0 z-50 flex items-center justify-center overflow-y-auto
    bg-slate-950/60 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-modal-title"
        className="preview-panel-enter modal-scrollbar max-h-[calc(100dvh - 2rem)] w-full max-w-lg overflow-y-auto
        rounded-2xl bg-white p-4 shadow-2xl dark:bg-slate-900 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="upload-modal-title"
              className="text-xl font-bold text-slate-950 dark:text-white"
            >
              Upload New Image
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Share your moment with the world
            </p>
          </div>
          <button
            type="button"
            aria-label="Close upload modal"
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100
          hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <FiX className="size-5" />
          </button>
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ")
              fileInputRef.current?.click();
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            applyFile(event.dataTransfer.files[0]);
          }}
          className={`mt-4 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed
            px-4 py-4 text-center transition sm:min-h-36
            ${
              isDragging
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40"
                : "border-indigo-300 bg-indigo-50/50 hover:bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/40"
            }`}
        >
          <FiUploadCloud className="size-8 text-indigo-400" />
          <p className="mt-2 max-w-full truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
            {file ? file.name : "Drag & drop your image here"}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {file ? "Image selected" : "or click to browse"}
          </p>
          <span className="mt-2 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-indigo-200">
            Choose Image
          </span>
          <p className="mt-2 rounded-lg text-slate-400">
            JPG PNG or WEBP. max size 10MB.
          </p>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpeg, image/png, img/webp"
            className="hidden"
            onChange={(event) => applyFile(event.target.files?.[0])}
          />
        </div>
        <div className="mt-4 grid gap-3">
          <label className="grid gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
            Title <span className="text-rose-500">*</span>
            <input
              type="text"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter image title..."
              className="h-11 rounded-lg border border-slate-200 px-3 text-sm font-normal text-slate-900
              outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
              dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-900"
            />
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
            Description
            <textarea
              value={description}
              maxLength={200}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Tell a story about this image..."
              className="min-h-24 resize-y rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-normal text-slate-900 outline-none
            transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
            dark;border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-900"
            >
              <span className="text-right text-[11px] font-normal text-slate-400">
                {description.length} / 200
              </span>
            </textarea>
          </label>

          <label className="grid gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
            Category <span className="text-rose-500">*</span>
            <select
              required
              value={category}
              onChange={(event) => setCategory(event.target.value as Category)}
              className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal text-slate-700 outline-none
              transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:ring-indigo-900"
            >
              <option value="">select a category</option>
              {categories.slice(1).map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div
          className="mt-5 flex flex-col-reverse justify-end gap-2 border-t border-slate-100 pt-4 sm:flex-row
        sm:gap-3 dark:border-slate-800"
        >
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50
            dark:border-slate-700 dark:text-slte-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!file || !title.trim() || !category}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white
            font-semibold shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiCheck className="size-4" />
            Upload Image
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadModal;
