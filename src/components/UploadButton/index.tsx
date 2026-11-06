import { FaUpload } from "react-icons/fa";
import type { UploadButtonProps } from "../../types/uploadButton";

const UploadButton = ({ onClick, compact = false }: UploadButtonProps) => {
  if (compact) {
    return (
      <button
        type="button"
        aria-label="Upload Image"
        title="Upload Image"
        onClick={onClick}
        className="flex size-10 items-center justify-center rounded-lg bg-indigo-600
        text-white shadow-sm shadow-indigo-200 transition-colors hover:bg-indigo-700"
      >
        <FaUpload className="text-sm" />
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-3 text-sm
    font-semibold text-white shadow-sm shadow-indigo-200 transition-colors
    hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
    focus:ring-offset-2 sm:px-4"
    >
      <FaUpload className="text-sm" />
      <span className="hidden sm:inline">Upload Image</span>
      <span className="sm:hidden">Upload</span>
    </button>
  );
};

export default UploadButton;
