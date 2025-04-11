import { useState } from "react";
import { ChatPopup } from "./ChatPopup";
import { MessageCircle } from "lucide-react";

export const FloatingWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
      >
        <MessageCircle className="w-5 h-5" /> <span>Need help?</span>
      </button>

      {isOpen && <ChatPopup onClose={() => setIsOpen(false)} />}
    </div>
  );
};