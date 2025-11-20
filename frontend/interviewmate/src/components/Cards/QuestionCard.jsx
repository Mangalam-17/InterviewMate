import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewMate/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(expanded ? contentRef.current.scrollHeight + 20 : 0);
  }, [expanded]);

  return (
    <div className="bg-white border border-red-200 rounded-xl shadow-sm hover:shadow-xl transition-all py-5 px-6 mb-6 group">
      {/* TOP */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <span className="text-red-500 text-lg font-bold">Q</span>

          <h3
            className="text-[15px] font-medium text-gray-900 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            {question}
          </h3>
        </div>

        <div className="flex gap-2">
          {/* PIN */}
          <button
            className="px-3 py-1 text-xs bg-red-50 border border-red-200 rounded text-red-700 hover:bg-red-100"
            onClick={onTogglePin}
          >
            {isPinned ? <LuPinOff /> : <LuPin />}
          </button>

          {/* LEARN MORE */}
          <button
            className="px-3 py-1 text-xs bg-red-50 border border-red-200 rounded text-red-700 hover:bg-red-100"
            onClick={() => {
              setExpanded(true);
              onLearnMore();
            }}
          >
            Deep Dive
            <LuSparkles size={14} />
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400"
          >
            <LuChevronDown
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* ANSWER SECTION */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: height }}
      >
        <div
          ref={contentRef}
          className="mt-4 bg-red-50 border border-red-100 px-5 py-4 rounded-lg"
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
