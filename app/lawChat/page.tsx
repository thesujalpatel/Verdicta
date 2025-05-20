"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
const defaultMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hello! I am Verdicta, your legal counsellor bot. Ask me any question about Indian law.",
};
export default function LawChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([defaultMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    scrollToBottom();

    try {
      const res = await fetch("/api/sum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Error fetching response from AI.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="mx-auto flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-4 text-primary">Chat with AI</h1>

      {/* Chat messages area */}
      <div className="flex-1 bg-background p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 px-3 rounded-md border max-w-[80%] w-fit ${
              msg.role === "user"
                ? "ml-auto bg-foreground/10"
                : "mr-auto bg-primary/20"
            }`}
          >
            <div className="prose prose-sm max-w-none text-foreground">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm text-foreground italic">AI is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex items-center gap-2 sticky bottom-0 bg-background p-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your legal question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-primary text-foreground px-4 py-2 border-2 border-primary rounded disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
        <button
          className="bg-background text-foreground px-4 py-2 border-2 rounded-sm disabled:opacity-50"
          onClick={() => setMessages([defaultMessage])}
          disabled={loading}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
