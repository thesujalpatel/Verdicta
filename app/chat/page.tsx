"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { PiPaperPlaneRight, PiX, PiSpinnerGap } from "react-icons/pi";
import Logo from "../assets/Logo";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const defaultMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: `# 🔍 Welcome to Verdicta Legal Assistant

Your comprehensive AI legal assistant specializing in Indian law, ready to provide structured legal guidance and information.

## 🎯 How I Can Help You
**Legal Information Services:**
- **Case Analysis**: Breaking down complex legal scenarios
- **Procedure Guidance**: Step-by-step legal processes
- **Rights Education**: Understanding your legal rights and obligations
- **Document Insights**: Explaining legal documents and requirements

---
*⚖️ Verdicta provides legal information based on Indian law. This is not personalized legal advice.*`,
  timestamp: new Date(),
};

// Example questions for suggestions
const exampleQuestions = [
  "What are my fundamental rights under Article 21?",
  "Explain dowry laws and penalties in India",
  "How to file a consumer complaint online?",
  "What is the process for anticipatory bail?",
  "Rights of women under domestic violence law",
  "How to register an FIR and what are my rights?",
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
  // Scroll to show new message with context above
  const scrollToNewMessage = () => {
    const container = messagesContainerRef.current;
    if (container) {
      // Get the last message element
      const messageElements = container.querySelectorAll("[data-message-id]");
      const lastMessage = messageElements[
        messageElements.length - 1
      ] as HTMLElement;

      if (lastMessage && messageElements.length > 1) {
        // Calculate position to show the new message with some context above
        const containerHeight = container.clientHeight;
        const messageTop = lastMessage.offsetTop;

        // Show message starting at about 30% from top of container
        const targetScrollTop = Math.max(0, messageTop - containerHeight * 0.3);

        container.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      } else {
        // For first message or fallback, scroll to bottom
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    scrollToNewMessage();
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
      className="flex flex-col py-4 sm:h-screen h-[calc(100vh-3rem)]"
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
            {" "}
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                data-message-id={msg.id}
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
                    className={
                      "h-8 w-8 text-primary border-2 border-primary/40 text-sm inline-flex items-center justify-center rounded-full shadow-md font-black"
                    }
                  >
                    {msg.role === "user" ? (
                      "U"
                    ) : (
                      <Logo className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </motion.div>{" "}
                {/* Message */}
                <motion.div
                  className={`prose prose-sm max-w-none rounded-2xl p-4 ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-primary/10 to-primary/5 text-foreground rounded-tr-none border border-primary/20"
                      : "bg-gradient-to-br from-background to-background/80 text-foreground rounded-tl-none border border-foreground/10 shadow-sm"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {" "}
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-foreground/10">
                      <span className="text-xs font-medium text-primary">
                        Legal Analysis
                      </span>
                      <div className="ml-auto flex items-center gap-1">
                        <span className="text-xs text-foreground/40">⚖️</span>
                        <span className="text-xs text-foreground/60">
                          Indian Law
                        </span>
                      </div>
                    </div>
                  )}
                  <div
                    className={`${
                      msg.role === "assistant" ? "legal-response" : ""
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        // Main heading with icon and gradient background
                        h1: ({ children }) => (
                          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 mb-4 border-l-4 border-primary">
                            <h1 className="text-lg font-bold text-primary mb-0 flex items-center gap-2">
                              <span className="text-primary text-sm">⚖️</span>
                              {children}
                            </h1>
                          </div>
                        ),
                        // Section headers with better visual hierarchy
                        h2: ({ children }) => (
                          <div className="bg-foreground/5 rounded-md p-3 mt-4 mb-3 border-l-3 border-primary">
                            <h2 className="text-base font-semibold text-primary mb-0 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                              {children}
                            </h2>
                          </div>
                        ),
                        // Subsection headers
                        h3: ({ children }) => (
                          <h3 className="text-sm font-medium text-foreground/90 mb-2 mt-4 flex items-center gap-2 border-b border-foreground/10 pb-1">
                            <span className="text-primary text-xs">▸</span>
                            {children}
                          </h3>
                        ),
                        // Enhanced paragraphs with better spacing
                        p: ({ children }) => (
                          <p className="text-sm leading-relaxed mb-3 text-foreground/90 last:mb-1">
                            {children}
                          </p>
                        ), // Styled lists with better visual hierarchy
                        ul: ({ children }) => (
                          <div className="bg-foreground/3 rounded-md p-3 mb-3">
                            <ul className="text-sm space-y-2 ml-0 list-none">
                              {children}
                            </ul>
                          </div>
                        ),
                        ol: ({ children }) => (
                          <div className="bg-foreground/3 rounded-md p-3 mb-3">
                            <ol className="text-sm space-y-2 ml-0 list-none counter-reset-list">
                              {children}
                            </ol>
                          </div>
                        ),
                        // Enhanced blockquotes for important information
                        blockquote: ({ children }) => (
                          <div className="border-l-4 border-primary/30 bg-gradient-to-r from-primary/5 to-primary/3 rounded-r-lg p-4 my-4 relative">
                            <div className="absolute top-2 left-2 text-primary/30 text-lg">
                              ❝
                            </div>
                            <blockquote className="italic text-foreground/80 pl-6">
                              {children}
                            </blockquote>
                          </div>
                        ),
                        // Highlighted text
                        strong: ({ children }) => (
                          <strong className="font-semibold text-primary bg-primary/10 px-1 rounded">
                            {children}
                          </strong>
                        ),
                        // Enhanced inline code
                        code: ({ children }) => (
                          <code className="bg-foreground/10 px-2 py-1 rounded text-xs font-mono border border-foreground/20">
                            {children}
                          </code>
                        ),
                        // Enhanced horizontal rule
                        hr: () => (
                          <div className="flex items-center my-6">
                            <hr className="flex-1 border-foreground/20" />
                            <span className="px-3 text-foreground/30 text-xs">
                              ⚖️
                            </span>
                            <hr className="flex-1 border-foreground/20" />
                          </div>
                        ),
                        // Enhanced tables for legal data
                        table: ({ children }) => (
                          <div className="overflow-x-auto my-4 rounded-lg border border-foreground/10">
                            <table className="w-full text-sm">{children}</table>
                          </div>
                        ),
                        thead: ({ children }) => (
                          <thead className="bg-primary/10 text-primary font-medium">
                            {children}
                          </thead>
                        ),
                        tbody: ({ children }) => (
                          <tbody className="divide-y divide-foreground/10">
                            {children}
                          </tbody>
                        ),
                        td: ({ children }) => (
                          <td className="px-4 py-3 text-foreground/80">
                            {children}
                          </td>
                        ),
                        th: ({ children }) => (
                          <th className="px-4 py-3 text-left font-medium">
                            {children}
                          </th>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                  {/* Message timestamp */}
                  <div
                    className={`text-[10px] mt-3 pt-2 border-t border-foreground/10 text-foreground/50 ${
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
                <span className="text-sm">
                  Verdicta is analyzing your query...
                </span>
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
                <p className="text-foreground/60 text-sm mb-3 font-medium">
                  💡 Try asking these legal questions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {exampleQuestions.map((question, idx) => (
                    <motion.button
                      key={idx}
                      className="text-sm bg-gradient-to-r from-foreground/5 to-foreground/10 hover:from-primary/10 hover:to-primary/5 border border-foreground/10 hover:border-primary/30 rounded-lg px-4 py-3 text-foreground/80 hover:text-primary text-left transition-all duration-200 shadow-sm hover:shadow-md"
                      onClick={() => sendMessage(question)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.1 + idx * 0.1 },
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="block text-xs text-foreground/50 mb-1">
                        Q{idx + 1}:
                      </span>
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
          className="sticky bottom-0 p-3 md:p-4 bg-background/95 backdrop-blur-sm border-t border-foreground/10"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.div
            className="flex items-center gap-2 bg-foreground/5 rounded-xl p-3 border border-foreground/10 focus-within:border-primary/90 transition-all duration-200 shadow-sm"
            variants={scaleIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <textarea
              ref={inputRef}
              className={`w-full outline-none bg-transparent resize-none min-h-[40px] max-h-[120px] py-1 px-2 placeholder:text-foreground/50 ${
                input ? "overflow-auto" : "overflow-hidden"
              }`}
              placeholder="Ask your legal question here... (e.g., 'What are my rights under Article 21?' or 'How to file a consumer complaint?')"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
            />

            {input && (
              <motion.button
                className="text-foreground/50 hover:text-foreground/80 p-1 rounded-md hover:bg-foreground/10 transition-colors"
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
              className={`bg-gradient-to-r from-primary to-primary/80 text-background p-2.5 rounded-lg disabled:opacity-50 shadow-md hover:shadow-lg transition-all ${
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
          <p className="text-xs text-center mt-3 text-foreground/50">
            <span className="font-medium text-primary">Verdicta</span> provides
            legal information based on Indian law.
            <span className="font-medium"> This is not legal advice.</span>{" "}
            Consult a qualified lawyer for specific legal matters.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
