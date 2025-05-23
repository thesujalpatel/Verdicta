import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/navigation";
import { Cinzel, Gowun_Batang } from "next/font/google";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Verdicta - AI-Powered Legal Assistant",
  description:
    "Verdicta helps you understand Indian laws, chat with an AI legal assistant, and test your legal knowledge through interactive trivia.",
  keywords:
    "legal assistant, AI legal, Indian laws, legal chatbot, constitution, legal knowledge",
  authors: [{ name: "Sujal Patel" }, { name: "Shreyash Swami" }],
};

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["500"],
});

const gowun = Gowun_Batang({
  subsets: ["latin"],
  variable: "--font-gowun",
  display: "swap",
  weight: ["400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased selection:text-background selection:bg-primary ${gowun.className} ${cinzel.variable} text-lg`}
      >
        <Navigation />
        <div className="min-h-screen max-w-6xl px-10 mx-auto">{children}</div>
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    const theme = localStorage.getItem('theme') || 'system';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeToApply = theme === 'dark' || (theme === 'system' && prefersDark) ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeToApply);
  } catch(e) {}
})();
          `,
          }}
        />
      </body>
    </html>
  );
}
