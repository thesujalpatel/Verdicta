"use client";

import Link from "next/link";
import legal from "./assets/Sarnath.png";
import data from "./assets/data";
import * as motion from "motion/react-client";
import { PiArrowCircleRightFill } from "react-icons/pi";
import Logo from "./assets/Logo";
import { useRef } from "react";

// Add structured data for the homepage
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Verdicta",
  description:
    "AI-powered legal assistant specializing in Indian law with chat functionality, constitutional database, and legal knowledge trivia.",
  url: "https://verdicta.netlify.app",
  image: "https://verdicta.netlify.app/Logo.png",
  applicationCategory: "LegalService",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  author: {
    "@type": "Organization",
    name: "Sujal Patel and Shreyash Swami",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
  },
};

export default function Landing() {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="overflow-hidden relative flex flex-col min-h-screen">
        {/* Hero Section */}
        <div className="flex-grow flex flex-col sm:h-screen h-auto">
          <motion.img
            src={legal.src}
            alt="Sarnath Lion Capital of Ashoka - Symbol of Indian Legal System and Justice"
            className="absolute inset-0 mx-auto h-screen pointer-events-none select-none z-[-1] object-contain translate-y-20"
            initial={{ opacity: 0, scale: 1.1, y: 60 }}
            animate={{ opacity: 0.65, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <motion.div
            className="flex flex-col justify-center md:justify-between md:flex-row gap-8 md:gap-16 items-center h-full py-10 px-4 md:px-10 mt-10 md:mt-0 backdrop-blur-xl md:backdrop-blur-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center text-center gap-5"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="mb-4"
              >
                <h1 className="text-5xl md:text-6xl text-primary font-[family-name:var(--font-cinzel)] mb-2 flex items-baseline justify-center">
                  <Logo className="sm:w-15 sm:h-15 w-12 h-12 translate-y-2 text-primary" />
                  erdicta
                </h1>
                <div className="text-xl md:text-2xl font-medium">
                  Your AI-powered legal assistant
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="text-lg md:text-xl"
              >
                Chat with Your AI Legal Assistant.
                <br />
                Understand the Indian Laws.
                <br />
                Test Your Legal Knowledge with Trivia.
              </motion.div>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }}
              >
                <div
                  onClick={scrollToFeatures}
                  className="bg-primary text-background px-6 py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center cursor-pointer font-black"
                >
                  Get Started
                  <PiArrowCircleRightFill className="ml-2 text-xl" />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="text-center max-w-md text-lg md:text-xl p-5 bg-background/50 backdrop-blur-sm rounded-lg border border-primary/30 shadow-lg"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="font-[family-name:var(--font-cinzel)] text-primary mb-4">
                Disclaimer
              </p>
              <p className="text-base">
                The information provided by this AI legal assistant is for
                general informational purposes only and does not constitute
                legal advice. While efforts are made to ensure accuracy, the
                system may occasionally produce incomplete or outdated
                responses. Users are strongly advised to consult a qualified
                legal professional for advice specific to their individual
                circumstances.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Services Section */}
        <div
          ref={featuresRef}
          className="bg-foreground/2 backdrop-blur-2xl sm:py-16 py-5 px-4 md:px-10 rounded-t-3xl shadow-inner"
        >
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-cinzel)] text-center sm:mb-12 mb-5 text-primary">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.isArray(data?.cards) &&
              data.cards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    className="bg-background rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-foreground/10 hover:border-primary/30 transition-colors"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="p-6 flex-grow">
                      <motion.div
                        className="flex flex-col gap-4"
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="text-5xl text-primary mb-2" />
                        <h3 className="text-2xl font-[family-name:var(--font-cinzel)] text-foreground">
                          {card.name}
                        </h3>
                        <p className="text-foreground/80 text-base">
                          {card.description}
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="p-6 pt-0"
                    >
                      <Link
                        href={card.link}
                        className="flex items-center justify-center bg-primary hover:bg-primary/90 px-4 py-2 text-base text-background w-full rounded-md transition-colors font-black"
                      >
                        {card.buttonLable}
                        <PiArrowCircleRightFill className="ml-2 text-xl" />
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
