import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(preview || null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImage(file);

    const previewURL = URL.createObjectURL(file);
    setPreviewUrl(previewURL);

    if (setPreview) setPreview(previewURL);
  };

  // prevents double image picker trigger
  const onChooseFile = () => {
    if (!inputRef.current) return;
    inputRef.current.value = "";
    inputRef.current.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) setPreview(null);
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div
          className="w-24 h-24 flex items-center justify-center 
          bg-red-50 rounded-full relative cursor-pointer 
          border border-red-300 shadow-inner"
        >
          <LuUser className="text-4xl text-red-500" />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center 
            bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 
            shadow-md hover:bg-red-600 transition"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border border-red-200 shadow-md"
          />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center 
            bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 
            shadow-md hover:bg-red-600 transition"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
