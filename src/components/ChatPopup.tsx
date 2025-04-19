import { useState, useEffect, useRef } from "react";
import { Conversation, Role, Mode, Status } from "@11labs/client";
import { Chat } from "./Chat";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import { Trash } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const agentId =
  (window as any)?.voizaConfig?.agentId || import.meta.env.VITE_AGENT_ID;
const userTheme = (window as any)?.voizaConfig?.theme;

const title = (window as any)?.voizaConfig?.title;

export const ChatPopup = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [messages, setMessages] = useState<{ role: Role; text: string }[]>([]);
  const [mode, setMode] = useState<Mode>("listening");
  const [status, setStatus] = useState<Status>("disconnected");
  const convoRef = useRef<Conversation | null>(null);
  const startedRef = useRef(false);

  // Scroll ref
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const isSpeaking = mode === "speaking";
  const isListening = mode === "listening";
  const isLoading = status === "connecting" || status === "disconnecting";

  // Scroll to bottom whenever new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (userTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (userTheme === "light") {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!open) {
      convoRef.current?.endSession();
      convoRef.current = null;
      startedRef.current = false;
      return;
    }

    if (startedRef.current) return;
    startedRef.current = true;

    const init = async () => {
      const convo = await Conversation.startSession({
        agentId,
        onMessage: ({ message, source }) => {
          setMessages((prev) => [...prev, { role: source, text: message }]);
        },
        onModeChange: ({ mode }) => setMode(mode),
        onStatusChange: ({ status }) => {
          setStatus(status);
          if (status === "disconnected" || status === "disconnecting") {
            convoRef.current = null;
            startedRef.current = false;
            setMessages([]);
            onClose(); // Close the dialog when session ends
          }
        },
        onError: (err) => console.error("[ERROR]", err),
      });

      convoRef.current = convo;
    };

    init();
  }, [onClose, open]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          convoRef.current?.endSession();
          convoRef.current = null;
          startedRef.current = false;
          setMessages([]);
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-white/10 z-40" />
        <Dialog.Content className="fixed bottom-[68px] right-6 z-50 w-[450px] h-[60vh] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-xl flex flex-col overflow-hidden focus:outline-none">
          <div className="bg-gradient-to-r from-purple-600 to-yellow-400 text-white p-4 flex justify-between items-center">
            <div className="text-sm font-medium">
              <div>{title ? `${title}'s AI Assistant` : "AI Assistant"}</div>
              <div className="text-xs">
                {isListening && !isLoading && "Listening..."}
                {isSpeaking && !isLoading && "Speaking..."}
                {isLoading && "Loading..."}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button className="hover:text-gray-300">
                    <Trash className="w-5 h-5" />
                  </button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    sideOffset={8}
                    className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md rounded-md p-4 text-sm z-[60] w-64"
                  >
                    <p className="mb-3">
                      Your session will end if you close. Continue?
                    </p>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          convoRef.current?.endSession();
                          convoRef.current = null;
                          startedRef.current = false;
                          setMessages([]);
                          onClose();
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                      >
                        Yes, end
                      </button>
                      <Popover.Close asChild>
                        <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-xs rounded">
                          Cancel
                        </button>
                      </Popover.Close>
                    </div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            <Chat messages={messages} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
