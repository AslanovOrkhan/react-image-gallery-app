import { useEffect } from "react";
import type { deleteConfirmModalProps } from "../../types/deleteConfirmModal";
import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";

const DeleteConfirmModal = ({
  image,
  onCancel,
  onConfirm,
}: deleteConfirmModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onCancel]);
  return (
    <div
      role="presentation"
      onClick={onCancel}
      className="preview-backdrop-enter fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        className="preview-panel-enter w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <div
            className="flex size-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600
            dark:bg-rose-950/40 dark:text-rose-400"
          >
            <FiAlertTriangle className="size-5" />
          </div>
          <button
            type="button"
            aria-label="close Delete confirmation"
            title="Close"
            onClick={onCancel}
            className="flex size-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100
             hover:text-slate-900 dark:hover:text-white"
          >
            <FiX className="size-5" />
          </button>
        </div>

        <h2
          id="delete-modal-title"
          className="mt-5 text-xl font-bold text-slate-950 dark:text-white"
        >
          Delete this image?
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Are you sure want to delete
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {image.title}
          </span>
          ? This action cannot be undone
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold
            text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex item-center justify-center gap-2 rounded-lg bg-rose-500 px-4 py-2.5 text-sm
          font-semibold text-white shadow-sm shadow-rose-200 transition hover:bg-rose-600 focus:outline-none focus:ring-2
          focus:ring-rose-300 dark:shadow-none"
          >
            <FiTrash2 className="size-4" />
            Delete image
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
