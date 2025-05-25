import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Knowledge Trivia Quiz - Verdicta",
  description:
    "Test your knowledge of Indian law with Verdicta's interactive legal trivia quiz. Challenge yourself with questions on constitutional law, legal procedures, rights, and Indian legal system fundamentals.",
  keywords: [
    "legal trivia",
    "law quiz India",
    "legal knowledge test",
    "Indian law quiz",
    "constitutional law quiz",
    "legal education quiz",
    "law student quiz",
    "legal awareness test",
    "Indian legal system quiz",
    "law trivia questions",
  ],
  openGraph: {
    title: "Legal Knowledge Trivia Quiz - Verdicta",
    description:
      "Test your knowledge of Indian law with Verdicta's interactive legal trivia quiz. Challenge yourself with constitutional and legal questions.",
    url: "https://verdicta.netlify.app/trivia",
  },
  twitter: {
    title: "Legal Knowledge Trivia Quiz - Verdicta",
    description:
      "Test your knowledge of Indian law with interactive trivia quiz.",
  },
  alternates: {
    canonical: "https://verdicta.netlify.app/trivia",
  },
};

export default function TriviaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
