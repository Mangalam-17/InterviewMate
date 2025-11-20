import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className="
        group relative
        bg-white rounded-2xl overflow-hidden cursor-pointer 
        transition-all duration-300 border border-red-100 
        hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(255,80,80,0.15)]
      "
    >
      {/* Header */}
      <div
        className="p-4 rounded-t-2xl relative"
        style={{
          background: `linear-gradient(135deg, rgba(255,120,120,0.25), rgba(255,180,160,0.25)), ${colors.bgcolor}`,
        }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center shadow">
            <span className="text-base font-semibold text-gray-900">
              {getInitials(role)}
            </span>
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              {role}
            </h2>
            <p className="text-sm text-gray-700 mt-1">{topicsToFocus}</p>
          </div>
        </div>

        {/* Delete Button — Visible on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent opening the card
            onDelete();
          }}
          className="
            absolute top-3 right-3 
            hidden group-hover:flex
            items-center gap-1 text-xs font-medium 
            text-red-600 bg-red-50 px-2.5 py-1 rounded-full 
            border border-red-100 hover:bg-red-100 transition
          "
        >
          <LuTrash2 size={14} />
          Delete
        </button>
      </div>

      {/* Bottom Content */}
      <div className="px-5 pt-4 pb-5 bg-white">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="text-[12px] font-medium text-gray-800 px-3 py-1 border border-red-100 bg-red-50 rounded-full">
            Experience: {experience} {experience === 1 ? "year" : "years"} 🧑‍💻
          </div>

          <div className="text-[12px] font-medium text-gray-800 px-3 py-1 border border-red-100 bg-red-50 rounded-full">
            {questions} Q&A 🎗️
          </div>

          <div className="text-[12px] font-medium text-gray-800 px-3 py-1 border border-red-100 bg-red-50 rounded-full">
            Last Sync: {lastUpdated} 🛠️
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-snug line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
