"use client";

import { ArrowLeftRightIcon, ArrowUp, Radio, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { useForm } from "react-hook-form";
import { closePanel } from "@/redux/slices/resizeAndDrag";
import { RootState } from "@/redux/store";
import { sendMessageToAI } from "@/actions/assistant.action";

type FormData = { chatInput: string };

export default function RnDPanel() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.rnd.isPanelOpen);

  const [audioChatOpen, setAudioChatOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content: "Hello! How can I help you?",
    },
  ]);

  const { register, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: { chatInput: "" },
  });

  const chatInputValue = watch("chatInput");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  /** ---------- AI SEND HANDLER ----------- **/
  const onSubmit = async (data: FormData) => {
    const userMessage = data.chatInput.trim();
    if (!userMessage) return;

    reset(); // clears input

    // add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const { success, reply } = await sendMessageToAI(userMessage);

      console.log("AI reply:", reply);

      if (success) {
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong." },
      ]);
    }
  };

  /** ---------- PANEL POSITIONING ----------- **/
  const panelWidth = 350;
  const panelHeight = 250;

  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const calculateCenter = () => ({
    x: (window.innerWidth - panelWidth) / 2,
    y: (window.innerHeight - panelHeight) / 2,
  });

  useEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return;
    }

    setPosition(calculateCenter());

    const handleResize = () => setPosition(calculateCenter());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  if (!isOpen || !position) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none">
      <Rnd
        default={{
          x: position.x,
          y: position.y,
          width: panelWidth,
          height: panelHeight,
        }}
        position={position}
        bounds="window"
        minWidth={300}
        minHeight={300}
        dragHandleClassName="panel-header"
        enableUserSelectHack={false}
        className="pointer-events-auto relative text-gray-300 border border-white/20 bg-gray-950 rounded-xl"
        onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
        onResizeStop={(e, direction, ref, delta, pos) => setPosition(pos)}
      >
        <div className="relative flex flex-col w-full h-full bg-white/10 backdrop-blur-2xl rounded-xl shadow-xl overflow-hidden">
          {/* header */}
          <div className="panel-header cursor-move bg-gray-50/10 px-4 py-2 font-semibold flex justify-between items-center">
            Travelus Agent
            <button
              onClick={() => dispatch(closePanel())}
              className="rounded-full absolute right-1 top-1 p-1 bg-white hover:bg-gray-100 transition"
            >
              <X size={16} className="text-black" />
            </button>
          </div>

          {/* chat area */}
          <div className="flex mx-auto relative flex-col p-4 text-white w-full h-full">
            <div className="flex-1 overflow-y-auto mb-14 flex flex-col space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-blue-600/50 self-end ml-auto"
                      : "bg-gray-700/50 self-start"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            {/* Travelus AI chat form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-between py-1.5 fixed bottom-2 left-1/2 -translate-x-1/2 w-3/4 max-w-[800px] items-center border rounded-full px-2 bg-gray-900/80 backdrop-blur-sm"
            >
              <Radio
                onClick={() => setAudioChatOpen(true)}
                size={20}
                className={`ml-1 cursor-pointer ${
                  audioChatOpen ? "text-green-400" : "text-white"
                }`}
              />

              <input
                {...register("chatInput")}
                type="text"
                disabled={audioChatOpen}
                placeholder={
                  audioChatOpen
                    ? "Speak your message..."
                    : "Type your message..."
                }
                className="flex-1 bg-transparent outline-none border-0 px-2 py-1 text-white placeholder:text-gray-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
              />

              <button
                type="submit"
                className="p-2 rounded-full flex justify-center cursor-pointer transition-all duration-300 bg-white/95 hover:bg-white items-center"
              >
                {chatInputValue ? (
                  <ArrowUp className="size-4 text-black" />
                ) : (
                  <ArrowLeftRightIcon
                    onClick={() => setAudioChatOpen(false)}
                    className="size-4 text-black"
                  />
                )}
              </button>
            </form>
          </div>
        </div>
      </Rnd>
    </div>
  );
}
