"use client";

import { sendMessageToAI } from "@/actions/assistant.action";
import { closePanel } from "@/redux/slices/travelusAISlice";
import { RootState } from "@/redux/store";
import { ArrowUp, PhoneMissed, Radio, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

type FormData = { chatInput: string };

const AIAssistant = () => {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content: "Hello! How can I help you?",
    },
  ]);

  const isAgentOpen = useSelector(
    (state: RootState) => state.travelusAI.isPanelOpen
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [audioChatOpen, setAudioChatOpen] = useState(false);
  const [isChatView, setIsChatView] = useState(true);
  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: { chatInput: "" },
  });

  const chatInputValue = watch("chatInput");

  /** ---------- AI SEND HANDLER ----------- **/
  const onSubmit = async (data: FormData) => {
    const userMessage = data.chatInput.trim();
    if (!userMessage) return;

    reset(); // clears input
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]); // add user message

    try {
      const { success, reply, action } = await sendMessageToAI(userMessage);

      console.log("AI reply:", reply);
      console.log("AI action:", action);

      if (success) {
        // If reply contains action result.
        if (action?.action === "navigate") {
          router.push(action.page);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: `Navigating to ${action.page}...` },
          ]);
        } else {
          // Just display the result
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: reply,
            },
          ]);
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Something went wrong, Please check you network connection and try again.",
        },
      ]);
    }
  };

  if (!isAgentOpen) return null;

  return (
    <div className="bg-gray-900 -top-2  z-40 p-2 sm:p-4 lg:p-6 xl:p-8 border fixed bottom-0 left-0 right-0">
      <div className="relative p-3 flex flex-col w-full h-full overflow-hidden">
        {/* Agent heading */}
        <div className=" px-4 py-2 font-semibold flex justify-between items-center">
          <span className="font-bold text-3xl">Travelus Agent</span>

          <button
            onClick={() => dispatch(closePanel())}
            className="rounded-full absolute right-1 p-3 bg-white/10 group hover:bg-white transition"
          >
            <X size={24} className="text-white/80 group-hover:text-gray-900" />
          </button>
        </div>

        {/* Text chat view */}
        {isChatView && (
          <div className="flex mx-auto relative flex-col p-4 text-white w-full h-full">
            {/* Chat area */}
            <div className="flex-1 overflow-y-auto px-3 float-right max-w-[800px] mx-auto mb-24 pb-10 flex flex-col space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-green-600/50 self-end ml-auto rounded-br-none"
                      : "bg-white/10 self-start rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            {/* Travelus AI text chat form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-between py-1.5 mb-3 fixed bottom-1 md:bottom-2 left-1/2 -translate-x-1/2 w-3/4 max-w-[800px] items-center border rounded-full px-3 bg-gray-700/40 backdrop-blur-sm"
            >
              <Radio
                onClick={() => setIsChatView(false)}
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
                    ? "Speak out, am listening..."
                    : "Type your message..."
                }
                className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-white placeholder:text-gray-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`p-2 rounded-full flex justify-center cursor-pointer transition-all duration-300 ${isSubmitting ? "bg-white/10" : ""} ${chatInputValue ? " bg-white/95 hover:bg-white" : "bg-white/15"}  items-center`}
              >
                {isSubmitting ? (
                  <div className={`w-5 h-5 bg-white animate-pulse`} />
                ) : (
                  <ArrowUp className={`size-5 text-black`} />
                )}
              </button>
            </form>
          </div>
        )}

        {/* Voice chat view */}
        {!isChatView && (
          <div className="flex relative mx-auto flex-col items-center p-4 text-white w-full h-full">
            {/* The voice chat response area */}
            <div className="h-80">{/* Output to appear heare */}</div>
            <div className="flex absolute bottom-0 gap-4 items-center justify-between bg-gray-600 rounded-full py-3 px-6">
              <button className="rounded-full p-4 bg-red-500">
                <PhoneMissed className="text-black " />
              </button>
              <div className="relative z-10 text-black flex items-center justify-center h-16 w-16 bg-white rounded-full">
                <span className="animate-pulse"></span>
                <div className="absolute size-14 animate-ping z-0 bg-green-700 rounded-full" />
              </div>
              <div>
                <button
                  onClick={() => setIsChatView(true)}
                  className="rounded-full py-3"
                >
                  Return to chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
