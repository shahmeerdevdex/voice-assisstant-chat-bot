import clsx from "clsx";
import { Role } from "@11labs/client";

export const MessageBubble = ({
  role,
  text,
}: {
  role: Role;
  text: string;
}) => {
  const isAI = role === "ai";
  return (
    <div className={clsx("flex items-start gap-2", "justify-start")}> {/* all left aligned */}
      <div
        className={clsx(
          "w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold",
          isAI ? "bg-blue-600" : "bg-gray-400"
        )}
      >
        {isAI ? "AI" : "U"}
      </div>
      <div
        className={clsx(
          "rounded-xl px-4 py-2 max-w-[75%] text-sm",
          isAI ? "bg-blue-100 text-gray-900" : "bg-gray-100 text-gray-800"
        )}
      >
        {text}
      </div>
    </div>
  );
};
