"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { PiPaperPlaneRight, PiX, PiSpinnerGap } from "react-icons/pi";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const defaultMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "# Welcome to Verdicta!\n\nI am your legal counsellor bot specializing in Indian law. Ask me questions about:\n\n- Rights and responsibilities\n- Legal procedures\n- Constitutional principles\n- Common legal scenarios\n\n*Please note: While I provide information based on Indian laws, my responses should not be considered legal advice. For specific legal matters, consult a qualified lawyer.*",
  timestamp: new Date(),
};

// Example questions for suggestions
const exampleQuestions = [
  "What are my rights if stopped by police?",
  "Explain Section 354 of IPC in simple terms",
  "What are tenant rights in India?",
  "How can I file an RTI application?",
  "What is the procedure for bail in India?",
];

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
    x: role === "user" ? 20 : -20,
    scale: 0.98,
  }),
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: (role: "user" | "assistant") => ({
    opacity: 0,
    x: role === "user" ? 20 : -20,
    scale: 0.98,
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
  const [suggestions, setSuggestions] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Function to generate a unique ID
  const generateId = () =>
    `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  // Auto-focus input on page load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle sending a message
  const sendMessage = async (text: string = input.trim()) => {
    if (!text) return;

    // Hide suggestions once user sends a message
    if (suggestions) setSuggestions(false);

    // Create user message
    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }

      const data = await res.json();
      const aiMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: data.response || "No response from AI.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content:
            "Sorry, I encountered an error while processing your request. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      // Focus the input again after sending
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      sendMessage();
    }
  };

  // Auto-resize textarea as user types
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    // Auto-resize the textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
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
      <motion.div
        className="flex justify-between items-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-primary font-[family-name:var(--font-cinzel)] h-fit">
          Legal Assistant
        </h1>

        <motion.button
          className="text-sm bg-foreground/10 rounded-full px-3 py-1 text-foreground/70 hover:bg-foreground/20 transition-colors"
          onClick={() => setMessages([defaultMessage])}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          New Chat
        </motion.button>
      </motion.div>

      {/* Main Chat Box */}
      <motion.div
        className="flex flex-col justify-between flex-1 overflow-hidden bg-background/30 rounded-lg border border-foreground/10 shadow-lg"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Chat Messages */}
        <div
          ref={messagesContainerRef}
          className="flex flex-col gap-3 overflow-y-auto flex-1 py-4 px-4"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`flex items-start gap-3 max-w-[90%] md:max-w-[80%] w-fit ${
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
                  className="flex-shrink-0 mt-1 sticky top-0"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div
                    className={`h-8 w-8 text-background text-sm font-medium inline-flex items-center justify-center rounded-full shadow-md ${
                      msg.role === "user" ? "bg-foreground" : "bg-primary"
                    }`}
                  >
                    {msg.role === "user" ? "You" : "V"}
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div
                  className={`prose prose-sm max-w-none rounded-2xl p-3 ${
                    msg.role === "user"
                      ? "bg-foreground/5 text-foreground rounded-tr-none"
                      : "bg-primary/5 text-foreground rounded-tl-none border border-foreground/10"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>

                  {/* Message timestamp */}
                  <div
                    className={`text-[10px] mt-1 text-foreground/50 ${
                      msg.role === "user" ? "text-right" : ""
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          <AnimatePresence>
            {loading && (
              <motion.div
                className="flex items-center gap-2 text-foreground/70 px-4 mr-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <PiSpinnerGap
                    className="animate-spin text-primary"
                    size={16}
                  />
                </div>
                <span className="text-sm">AI is thinking...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Example questions (shown only initially) */}
          <AnimatePresence>
            {suggestions && messages.length === 1 && !loading && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-foreground/60 text-sm mb-3">
                  Try asking these questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {exampleQuestions.map((question, idx) => (
                    <motion.button
                      key={idx}
                      className="text-sm bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 rounded-full px-3 py-1 text-foreground/80 text-left transition-colors"
                      onClick={() => sendMessage(question)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.1 + idx * 0.1 },
                      }}
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Bar */}
        <motion.div
          className="sticky bottom-0 p-3 md:p-4 bg-background border-t border-foreground/10"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.div
            className="flex items-center gap-2 bg-foreground/5 rounded-lg p-2 border border-foreground/10 focus-within:border-primary/50 transition-colors"
            variants={scaleIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <textarea
              ref={inputRef}
              className="w-full outline-none bg-transparent resize-none min-h-[40px] max-h-[120px] py-1 px-2"
              placeholder="Ask a legal question..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              style={{ overflow: input ? "auto" : "hidden" }}
              rows={1}
            />

            {input && (
              <motion.button
                className="text-foreground/50 hover:text-foreground/80 p-1"
                onClick={() => setInput("")}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <PiX size={18} />
              </motion.button>
            )}

            <motion.button
              className={`bg-primary text-background p-2 rounded-md disabled:opacity-50 ${
                !input.trim() ? "opacity-70" : "opacity-100"
              }`}
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              whileTap={{ scale: 0.95 }}
              whileHover={input.trim() ? { scale: 1.05 } : {}}
            >
              <PiPaperPlaneRight size={18} />
            </motion.button>
          </motion.div>

          <p className="text-xs text-center mt-2 text-foreground/50">
            Verdicta provides information based on Indian law, but it's not
            legal advice.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
