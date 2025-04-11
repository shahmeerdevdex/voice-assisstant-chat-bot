import { MessageBubble } from "./MessageBubble";

export const Chat = ({
  messages,
}: {
  messages: { role: "ai" | "user"; text: string }[];
}) => {
  return (
    <div className="flex flex-col gap-3 p-4">
      {messages.map((msg, i) => (
        <MessageBubble key={i} role={msg.role} text={msg.text} />
      ))}
    </div>
  );
};