import { motion } from "framer-motion";
import { MessageBubble } from "./MessageBubble";

export const Chat = ({
  messages,
}: {
  messages: { role: "ai" | "user"; text: string }[];
}) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <MessageBubble role={msg.role} text={msg.text} />
        </motion.div>
      ))}
    </div>
  );
};
