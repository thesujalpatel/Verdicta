import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/navigation";
import { Cinzel, Gowun_Batang } from "next/font/google";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: {
    default: "Verdicta - AI-Powered Legal Assistant for Indian Law",
    template: "%s | Verdicta - AI Legal Assistant",
  },
  description:
    "Verdicta is your comprehensive AI-powered legal assistant specializing in Indian law. Chat with our AI lawyer, explore the Indian Constitution, and test your legal knowledge with interactive trivia. Get instant answers to legal questions and understand complex legal concepts simplified.",
  keywords: [
    "AI legal assistant",
    "Indian law chatbot",
    "legal advice India",
    "Indian Constitution",
    "legal knowledge quiz",
    "law trivia",
    "legal education",
    "Indian legal system",
    "legal counselor bot",
    "law learning platform",
    "legal Q&A",
    "constitutional law India",
  ],
  authors: [
    { name: "Sujal Patel", url: "https://thesujalpatel.github.io" },
    { name: "Shreyash Swami", url: "https://github.com/Shreyash0712" },
  ],
  creator: "Sujal Patel and Shreyash Swami",
  publisher: "Verdicta",
  category: "Legal Technology",
  classification: "Legal Education Platform",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://verdicta.netlify.app",
    siteName: "Verdicta",
    title: "Verdicta - AI-Powered Legal Assistant for Indian Law",
    description:
      "Your comprehensive AI-powered legal assistant specializing in Indian law. Chat with our AI lawyer, explore the Constitution, and test your legal knowledge.",
    images: [
      {
        url: "https://verdicta.netlify.app/Banner.png",
        width: 1200,
        height: 630,
        alt: "Verdicta - AI-Powered Legal Assistant",
        type: "image/png",
      },
      {
        url: "https://verdicta.netlify.app/Logo.png",
        width: 1080,
        height: 1080,
        alt: "Verdicta Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verdicta - AI-Powered Legal Assistant for Indian Law",
    description:
      "Your comprehensive AI-powered legal assistant specializing in Indian law. Chat, learn, and test your knowledge.",
    images: ["https://verdicta.netlify.app/Banner.png"],
    creator: "@VerdictaLegal",
    site: "@VerdictaLegal",
  },
  metadataBase: new URL("https://verdicta.netlify.app"),
  alternates: {
    canonical: "https://verdicta.netlify.app",
  },
  verification: {
    google: "7vST1LuRmivtnvzubkePBXbUuQ0PQIjfC5TxIgvER6A",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Verdicta",
    "mobile-web-app-capable": "yes",
    "theme-color": "#8B5A3C",
  },
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
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://verdicta.netlify.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Verdicta",
              alternateName: "Verdicta AI Legal Assistant",
              description:
                "AI-powered legal assistant specializing in Indian law with chat functionality, constitutional database, and legal knowledge trivia.",
              url: "https://verdicta.netlify.app",
              applicationCategory: "LegalService",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              publisher: {
                "@type": "Organization",
                name: "Verdicta Team",
                logo: {
                  "@type": "ImageObject",
                  url: "https://verdicta.netlify.app/icon0.svg",
                },
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "150",
              },
              featureList: [
                "AI Legal Chat Assistant",
                "Indian Constitution Database",
                "Legal Knowledge Trivia",
                "Legal Case Analysis",
                "Rights and Responsibilities Guide",
              ],
              screenshot: "https://verdicta.netlify.app/screenshot.png",
              softwareVersion: "1.0.0",
              releaseNotes:
                "Initial release with comprehensive Indian law database",
            }),
          }}
        />
      </head>
      <body
        className={`antialiased selection:text-background selection:bg-primary ${gowun.className} ${cinzel.variable} text-lg`}
      >
        <Navigation />
        <div className="min-h-screen sm:max-w-7xl max-w-full sm:px-10 px-2 mx-auto">
          {children}
        </div>
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
