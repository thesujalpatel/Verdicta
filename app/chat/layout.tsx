import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Legal Chat Assistant - Verdicta",
  description:
    "Chat with Verdicta's AI-powered legal assistant specialized in Indian law. Get instant answers to your legal questions, understand rights and responsibilities, and receive guidance on legal procedures in India.",
  keywords: [
    "AI legal chat",
    "legal assistant chatbot",
    "Indian law AI",
    "legal advice bot",
    "legal counselor AI",
    "legal questions India",
    "constitutional law chat",
    "legal guidance AI",
  ],
  openGraph: {
    title: "AI Legal Chat Assistant - Verdicta",
    description:
      "Chat with Verdicta's AI-powered legal assistant specialized in Indian law. Get instant answers to your legal questions.",
    url: "https://verdicta.netlify.app/chat",
  },
  twitter: {
    title: "AI Legal Chat Assistant - Verdicta",
    description:
      "Chat with Verdicta's AI-powered legal assistant specialized in Indian law.",
  },
  alternates: {
    canonical: "https://verdicta.netlify.app/chat",
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
