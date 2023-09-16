import { UploadIcon } from "./icons/uploadIcon";

export const MediaInput = ({ fileTypes, fileName, inputName, onChange }) => {
  return (
    <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:bg-gray-100">
      <UploadIcon className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
      <div className="flex flex-col items-center text-center">
        <p className="mb-2 text-sm text-gray-600 font-semibold">
          Click to upload
        </p>
        <p className="text-xs text-gray-500">{fileTypes}</p>
        <span className="mt-2 text-base leading-normal">
          {fileName ? fileName.name : "Select a file"}
        </span>
      </div>
      <input
        type="file"
        name={inputName}
        className="hidden"
        onChange={onChange}
      />
    </label>
  );
};
