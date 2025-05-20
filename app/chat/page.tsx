"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const defaultMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hello! I am Verdicta, your legal counsellor bot. Ask me any question about Indian law.",
};

// Animation variables
const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
};
const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};
const messageVariants: Variants = {
  initial: (role: "user" | "assistant") => ({
    opacity: 0,
    x: role === "user" ? 50 : -50,
    scale: 0.95,
  }),
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: (role: "user" | "assistant") => ({
    opacity: 0,
    x: role === "user" ? 50 : -50,
    scale: 0.95,
  }),
};
const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export default function LawChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([defaultMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const aiMessage: ChatMessage = {
        role: "assistant",
        content: data.response || "No response from AI.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error fetching response from AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <motion.div
      className="flex flex-col py-4 h-screen"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-4 text-primary font-[family-name:var(--font-cinzel)] h-fit"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Chat with AI
      </motion.h1>

      {/* Main Chat Box */}
      <motion.div
        className="flex flex-col justify-between flex-1 overflow-hidden"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Chat Messages */}
        <div
          ref={messagesContainerRef}
          className="flex flex-col gap-2 bg-background overflow-y-auto flex-1 py-2"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`flex items-start gap-2 max-w-[85%] w-fit ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
                custom={msg.role}
                variants={messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={springTransition}
                layout
              >
                {/* Avatar */}
                <motion.div
                  className="flex items-end h-full"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <motion.div
                    className="w-9.5 h-9.5 text-white font-bold sticky bottom-0"
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {msg.role === "user" ? (
                      <span className="text-sm h-8 w-8 bg-primary inline-flex items-center justify-center rounded-full">
                        U
                      </span>
                    ) : (
                      <span className="text-sm h-8 w-8 bg-primary inline-flex items-center justify-center rounded-full">
                        V
                      </span>
                    )}
                  </motion.div>
                </motion.div>
                {/* Message */}
                <motion.div
                  className={`prose prose-sm max-w-none text-foreground p-2 px-4 ${
                    msg.role === "user" ? "bg-foreground/10" : "bg-primary/10"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {loading && (
              <motion.div
                className="text-sm text-foreground italic px-4"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                AI is typing...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Bar */}
        <motion.div
          className="sticky bottom-0 py-2 bg-background border-t"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.div
            className="flex items-center gap-2 p-1 px-2"
            variants={scaleIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <motion.input
              type="text"
              className="w-full outline-none bg-transparent"
              placeholder="Type your legal question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.button
              className="bg-primary/10 text-primary px-2 py-1 disabled:opacity-50"
              onClick={sendMessage}
              disabled={loading}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Send
            </motion.button>
            <motion.button
              className="bg-foreground/10 text-foreground px-2 py-1 disabled:opacity-50"
              onClick={() => setMessages([defaultMessage])}
              disabled={loading}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Clear
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
