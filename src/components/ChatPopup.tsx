import { useState, useEffect, useRef } from "react";
import { Conversation, Role, Mode, Status } from "@11labs/client";
import { Chat } from "./Chat";
import { X } from "lucide-react";

const agentId = "Xc50LjjQlQoLL9N8gH0x";

export const ChatPopup = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<{ role: Role; text: string }[]>([]);
  const [mode, setMode] = useState<Mode>("listening");
  const [status, setStatus] = useState<Status>("disconnected");
  const convoRef = useRef<Conversation | null>(null);
  const startedRef = useRef(false);

  const isSpeaking = mode === "speaking";
  const isListening = mode === "listening";
  const isLoading = status === "connecting" || status === "disconnecting";

  useEffect(() => {
    const init = async () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const convo = await Conversation.startSession({
        agentId,
        onConnect: () => console.log("[CONNECTED]"),
        onMessage: ({ message, source }) => {
          setMessages((prev) => [...prev, { role: source, text: message }]);
        },
        onModeChange: ({ mode }) => setMode(mode),
        onStatusChange: ({ status }) => setStatus(status),
        onError: (err) => console.error("[ERROR]", err),
      });
      convoRef.current = convo;
    };

    init();
    return () => {convoRef.current?.endSession();}
  }, []);

  return (
    <div className="absolute bottom-14 right-0 w-[350px] h-[50vh] bg-white border shadow-xl rounded-xl z-50 flex flex-col overflow-hidden">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="text-sm font-medium">
          AI Assistant
          {isListening && " (Listening...)"}
          {isSpeaking && " (Speaking...)"}
          {isLoading && " (Loading...)"}
        </div>
        <button onClick={onClose} className="hover:text-gray-300">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Chat messages={messages} />
      </div>
    </div>
  );
};
