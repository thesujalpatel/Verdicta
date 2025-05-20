import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verdicta | Chat",
  description: "Chat with your AI-powered legal assistant",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
