"use client";

import { useState } from "react";
import { togglePanel } from "@/redux/slices/resizeAndDrag";
import { useDispatch } from "react-redux";
import { Bot, X } from "lucide-react"; // Icon

export default function AIAssistantBtn() {
  const dispatch = useDispatch();
  const [showTip, setShowTip] = useState(true); // controls tooltip

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Tooltip */}
      {showTip && (
        <div className="relative bg-white text-black px-4 py-3 rounded-lg shadow-lg max-w-xs text-sm">
          <button
            onClick={() => setShowTip(false)}
            className="absolute w-fit p-1 -top-3 -right-3 bg-white opacity-100 text-black rounded-full"
          >
            <X className="text-black w-3 h-3 font-bold" />
          </button>
          Travelus agent is here! Tap to chat with him
        </div>
      )}

      {/* Floating AI Icon Button */}
      <button
        onClick={() => {
          dispatch(togglePanel());
          setShowTip(false); // hide tip after first interaction
        }}
        className="p-2 hover:bg-gray-700 opacity-100 shadow-lg shadow-gray-400 ring-1 ring-gray-500 ring-offset-2 ring-offset-gray-800/95 rounded-full bg-gray-800/95 hover:shadow-xl flex items-center justify-center transition-all duration-200"
      >
        <Bot className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
