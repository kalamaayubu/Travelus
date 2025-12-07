"use client";

import { ArrowLeftRightIcon, ArrowUp, Radio, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { closePanel } from "@/redux/slices/resizeAndDrag";
import { RootState } from "@/redux/store";

export default function RnDPanel() {
  const dispatch = useDispatch();
  const [chatText, setChatText] = useState("");
  const [audioChatOpen, setAudioChatOpen] = useState(false);
  const isOpen = useSelector((state: RootState) => state.rnd.isPanelOpen);

  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const panelWidth = 350;
  const panelHeight = 250;

  // Calculate center position
  const calculateCenter = () => ({
    x: (window.innerWidth - panelWidth) / 2,
    y: (window.innerHeight - panelHeight) / 2,
  });

  // Recalculate center on open and on resize
  useEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return;
    }

    setPosition(calculateCenter());

    const handleResize = () => {
      setPosition(calculateCenter());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  if (!isOpen || !position) return null;

  const handleCloseAgent = () => dispatch(closePanel());

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none">
      <Rnd
        default={{
          x: position.x,
          y: position.y,
          width: panelWidth,
          height: panelHeight,
        }}
        position={position} // <-- makes it follow our state
        bounds="window"
        minWidth={300}
        minHeight={300}
        dragHandleClassName="panel-header"
        enableUserSelectHack={false}
        className="pointer-events-auto relative text-gray-300 border border-white/20 bg-gray-950 rounded-xl"
        onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
        onResizeStop={(e, direction, ref, delta, position) =>
          setPosition(position)
        }
      >
        <div className="relative flex flex-col w-full h-full bg-white/10 backdrop-blur-2xl rounded-xl shadow-xl overflow-hidden">
          {/* Heading */}
          <div className="panel-header cursor-move bg-gray-50/10 px-4 py-2 font-semibold flex justify-between items-center">
            Travelus Agent
            <button
              onClick={handleCloseAgent}
              className="rounded-full absolute right-1 top-1 p-1 bg-white hover:bg-gray-100 transition"
            >
              <X size={16} className="text-black" />
            </button>
          </div>

          {/* Panel content text chat & voice chat tabs*/}
          <div className="flex mx-auto relative flex-col p-4 text-white">
            {/* Chat display area */}
            <div className="flex-1 overflow-y-auto mb-14">
              {audioChatOpen ? (
                <div className="flex overflow-hidden flex-col justify-center items-center h-full">
                  <p className="font-bold text-2xl mb-3">
                    🎤 Voice Chat Active
                  </p>
                  <div className="relative w-28 h-28 flex items-center justify-center bg-white/80 rounded-full">
                    {/* <p className="text-black text-xl">Listening...</p> */}
                    <div className="size-16 bg-red-400 rounded-full animate-ping absolute"></div>
                    <div className="size-4 bg-red-500 rounded-full animate-ping absolute"></div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-3xl">
                    Hello! How can I help you?
                  </p>
                  {/* You can map messages here later */}
                </div>
              )}
            </div>

            {/* Bottom controls: Radio + Input + Send */}
            <div className="flex  justify-between py-1.5 fixed bottom-2 left-1/2 -translate-x-1/2 w-3/4 max-w-[800px] items-center border rounded-full px-2 bg-gray-900/80 backdrop-blur-sm">
              <Radio
                onClick={() => setAudioChatOpen(true)}
                size={20}
                className={`ml-1 cursor-pointer ${audioChatOpen ? "text-green-400" : "text-white"}`}
              />

              <input
                type="text"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                className="flex-1 justify-between bg-transparent outline-none px-2 py-1 text-white placeholder:text-gray-400 border-none"
                placeholder={`${audioChatOpen ? "Speak your message..." : "Type your message..."}`}
              />
              <button className="p-2 rounded-full flex justify-center cursor-pointer transition-all duration-300 bg-white/95 hover:bg-white items-center">
                {chatText ? (
                  <ArrowUp className="size-4 text-black" />
                ) : (
                  <ArrowLeftRightIcon
                    onClick={() => setAudioChatOpen(false)}
                    className="size-4 text-black"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </Rnd>
    </div>
  );
}
