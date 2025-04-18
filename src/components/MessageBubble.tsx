import clsx from "clsx";
import { Role } from "@11labs/client";

export const MessageBubble = ({ role, text }: { role: Role; text: string }) => {
  const isAI = role === "ai";
  return (
    <div
      className={clsx("flex items-start", {
        "justify-start": isAI,
        "justify-end": !isAI,
      })}
    >
      <div
        className={clsx(
          "flex items-start gap-3",
          isAI ? "flex-row" : "flex-row-reverse"
        )}
      >
        <div
          className={clsx(
            "w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0",
            isAI ? "bg-purple-600" : "bg-yellow-500"
          )}
        >
          {isAI ? "AI" : "U"}
        </div>
        <div
          className={clsx(
            "relative rounded-lg px-4 py-2 max-w-[75%] text-sm leading-relaxed",
            isAI
              ? "bg-purple-100 text-gray-900 dark:bg-purple-900 dark:text-white before:absolute before:left-[-6px] before:top-3 before:border-8 before:border-transparent before:border-r-purple-100 dark:before:border-r-purple-900"
              : "bg-yellow-100 text-gray-800 dark:bg-yellow-700 dark:text-gray-100 before:absolute before:right-[-6px] before:top-3 before:border-8 before:border-transparent before:border-l-yellow-100 dark:before:border-l-yellow-700"
          )}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
