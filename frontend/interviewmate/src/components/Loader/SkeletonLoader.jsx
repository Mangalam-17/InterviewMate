import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="w-full max-w-3xl">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-semibold text-gray-700 animate-pulse">
          Generating detailed explanation…
        </h2>
        <p className="text-xs text-gray-500 mt-1 tracking-wide animate-pulse">
          Please wait while we prepare a high-quality response for you.
        </p>
      </div>

      {/* Shimmer animation wrapper */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent"></div>

        {/* MAIN SKELETON BLOCKS */}
        <div role="status" className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>

          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-11/12"></div>
            <div className="h-3 bg-gray-200 rounded w-10/12"></div>
            <div className="h-3 bg-gray-200 rounded w-9/12"></div>
          </div>

          <div className="bg-gray-100 rounded p-4 space-y-2">
            <div className="h-2.5 bg-gray-300 w-3/4 rounded"></div>
            <div className="h-2.5 bg-gray-300 w-2/3 rounded"></div>
            <div className="h-2.5 bg-gray-300 w-1/2 rounded"></div>
          </div>
        </div>

        {/* SECOND BLOCK */}
        <div role="status" className="animate-pulse space-y-4 mt-10">
          <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>

          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-11/12"></div>
            <div className="h-3 bg-gray-200 rounded w-10/12"></div>
            <div className="h-3 bg-gray-200 rounded w-9/12"></div>
          </div>

          <div className="bg-gray-100 rounded p-4 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-11/12"></div>
            <div className="h-3 bg-gray-200 rounded w-10/12"></div>
            <div className="h-3 bg-gray-200 rounded w-9/12"></div>
          </div>

          <div className="bg-gray-100 rounded p-4 space-y-2">
            <div className="h-2.5 bg-gray-300 rounded w-3/4"></div>
            <div className="h-2.5 bg-gray-300 rounded w-2/3"></div>
          </div>

          <div className="h-4 bg-gray-200 rounded-md w-1/2 mt-8"></div>

          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-11/12"></div>
            <div className="h-3 bg-gray-200 rounded w-10/12"></div>
            <div className="h-3 bg-gray-200 rounded w-9/12"></div>
          </div>
        </div>
      </div>

      {/* Tailwind shimmer keyframes */}
      <style>
        {`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};

export default SkeletonLoader;
