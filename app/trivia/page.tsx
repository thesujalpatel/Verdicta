"use client";

import { Metadata } from "next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiCheckCircle, PiXCircle, PiArrowCircleRight } from "react-icons/pi";

// Define types
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function Trivia() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch questions from an API
    // For now, we'll use sample questions
    setIsLoading(true);
    setTimeout(() => {
      setQuestions(sampleQuestions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    // Update score if answer is correct
    const currentQuestion = questions[currentQuestionIndex];
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    // Check if there are more questions
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz complete
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizComplete(false);
  };

  // Function to get percentage score
  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  // Function to get feedback based on score
  const getScoreFeedback = () => {
    const percentage = getScorePercentage();

    if (percentage >= 90) return "Outstanding! You're a legal eagle!";
    if (percentage >= 75) return "Great job! You know your laws well.";
    if (percentage >= 60) return "Good effort! You have a solid understanding.";
    if (percentage >= 40) return "Not bad! But there's room for improvement.";
    return "Keep studying! Legal knowledge takes time to build.";
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-cinzel)] text-primary">
          Legal Trivia Challenge
        </h1>
        <p className="text-foreground/80 mt-2">
          Test your knowledge of Indian law with these challenging questions.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : quizComplete ? (
        // Quiz Results
        <motion.div
          className="bg-background rounded-lg p-8 shadow-lg border border-foreground/10 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Quiz Complete!
          </h2>

          <div className="py-6 px-4 rounded-full bg-foreground/5 inline-block mb-6">
            <span className="text-4xl font-bold">
              {score}/{questions.length}
            </span>
            <p className="text-foreground/70 mt-1">({getScorePercentage()}%)</p>
          </div>

          <p className="text-xl mb-8">{getScoreFeedback()}</p>

          <motion.button
            className="bg-primary text-background px-6 py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center mx-auto"
            onClick={restartQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
            <PiArrowCircleRight className="ml-2" size={20} />
          </motion.button>
        </motion.div>
      ) : (
        // Quiz Questions
        <div>
          {/* Progress Bar */}
          <motion.div
            className="bg-foreground/10 h-2 rounded-full mb-8 overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={{
                width: `${(currentQuestionIndex / questions.length) * 100}%`,
              }}
              animate={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Question Counter */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-foreground/70 text-sm">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-foreground/70 text-sm">
              Score: {score}/{currentQuestionIndex}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-background border border-foreground/10 rounded-lg p-6 shadow-md"
            >
              {/* Question */}
              <h2 className="text-xl font-medium mb-6">
                {questions[currentQuestionIndex].question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option, idx) => (
                  <div key={idx}>
                    <button
                      onClick={() => handleOptionSelect(idx)}
                      className={`w-full text-left p-4 border rounded-md flex items-center transition-colors ${
                        selectedOption === idx
                          ? isAnswered
                            ? idx ===
                              questions[currentQuestionIndex].correctAnswer
                              ? "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700"
                              : "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700"
                            : "bg-primary/20 border-primary/30"
                          : "bg-foreground/5 border-foreground/10 hover:bg-foreground/10"
                      }`}
                      disabled={isAnswered}
                    >
                      <span className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                      {isAnswered && selectedOption === idx && (
                        <span className="ml-auto">
                          {idx ===
                          questions[currentQuestionIndex].correctAnswer ? (
                            <PiCheckCircle
                              className="text-green-500"
                              size={24}
                            />
                          ) : (
                            <PiXCircle className="text-red-500" size={24} />
                          )}
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Explanation (shown after answering) */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-4 border-t border-foreground/10"
                  >
                    <h3 className="font-medium mb-2">Explanation:</h3>
                    <p className="text-foreground/80">
                      {questions[currentQuestionIndex].explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="mt-6 text-right"
                >
                  <button
                    onClick={handleNextQuestion}
                    className="bg-primary text-background px-6 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center ml-auto"
                  >
                    {currentQuestionIndex < questions.length - 1
                      ? "Next Question"
                      : "See Results"}
                    <PiArrowCircleRight className="ml-2" size={20} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// Sample questions for the trivia
const sampleQuestions: Question[] = [
  {
    id: 1,
    question:
      "Under Section 375 of the Indian Penal Code, which of the following is NOT an element of rape?",
    options: [
      "Sexual intercourse without consent",
      "Sexual intercourse with consent obtained through deception",
      "Sexual intercourse with wife below 15 years of age",
      "Sexual intercourse with mutual consent between unmarried adults",
    ],
    correctAnswer: 3,
    explanation:
      "Sexual intercourse with mutual consent between unmarried adults is not rape. The definition of rape under Section 375 IPC requires the absence of valid consent or consent obtained through deception, fear, or with a minor.",
  },
  {
    id: 2,
    question:
      "Which Article of the Indian Constitution abolishes untouchability?",
    options: ["Article 14", "Article 15", "Article 17", "Article 21"],
    correctAnswer: 2,
    explanation:
      "Article 17 of the Indian Constitution abolishes untouchability and forbids its practice in any form. It makes the enforcement of any disability arising out of untouchability a punishable offense.",
  },
  {
    id: 3,
    question:
      "What is the legal age for consumption of alcohol in most states in India?",
    options: [
      "18 years",
      "21 years",
      "25 years",
      "It varies by state with no uniform age",
    ],
    correctAnswer: 3,
    explanation:
      "There is no uniform drinking age in India. Different states have different legal drinking ages ranging from 18 years (in Sikkim) to 25 years (in states like Delhi, Punjab, and Maharashtra).",
  },
  {
    id: 4,
    question:
      "Under the Right to Information Act (RTI), within how many days must a public authority provide information to an applicant?",
    options: ["15 days", "30 days", "45 days", "60 days"],
    correctAnswer: 1,
    explanation:
      "Under Section 7(1) of the RTI Act, 2005, a public authority must provide the requested information within 30 days of receiving the application. In cases involving life or liberty, information must be provided within 48 hours.",
  },
  {
    id: 5,
    question:
      "Which of the following is NOT protected as a Fundamental Right under the Indian Constitution?",
    options: [
      "Right to Equality",
      "Right to Freedom of Religion",
      "Right to Property",
      "Right to Constitutional Remedies",
    ],
    correctAnswer: 2,
    explanation:
      "The Right to Property was originally a Fundamental Right under Article 31, but it was removed by the 44th Amendment in 1978. It now exists as a legal right under Article 300A but not as a Fundamental Right.",
  },
  {
    id: 6,
    question:
      "Which legal provision punishes the offense of 'stalking' in India?",
    options: [
      "Section 354A of IPC",
      "Section 354D of IPC",
      "Section 509 of IPC",
      "Section 498A of IPC",
    ],
    correctAnswer: 1,
    explanation:
      "Section 354D of the Indian Penal Code deals specifically with stalking. It was added after the Criminal Law Amendment Act of 2013 following the Nirbhaya case and makes physical or electronic stalking of women a punishable offense.",
  },
  {
    id: 7,
    question:
      "What is the punishment for dowry death under Section 304B of the Indian Penal Code?",
    options: [
      "Minimum 5 years, may extend to life imprisonment",
      "Minimum 7 years, may extend to life imprisonment",
      "Minimum 10 years, may extend to life imprisonment",
      "Death penalty",
    ],
    correctAnswer: 1,
    explanation:
      "Under Section 304B of the IPC, the punishment for dowry death is imprisonment for a minimum of 7 years, which may extend to life imprisonment. This is applicable when a woman dies of burns or bodily injury under unnatural circumstances within 7 years of marriage and had faced dowry-related harassment.",
  },
  {
    id: 8,
    question:
      "In which year was the Protection of Women from Domestic Violence Act enacted in India?",
    options: ["2001", "2003", "2005", "2007"],
    correctAnswer: 2,
    explanation:
      "The Protection of Women from Domestic Violence Act was enacted in 2005. It came into force on October 26, 2006, providing civil remedies to victims of domestic violence and offering a broader definition of domestic violence including physical, sexual, verbal, emotional, and economic abuse.",
  },
  {
    id: 9,
    question:
      "What is the maximum period for which a person can be detained under preventive detention laws in India without advisory board approval?",
    options: ["1 month", "2 months", "3 months", "6 months"],
    correctAnswer: 2,
    explanation:
      "According to Article 22(4) of the Indian Constitution, no law providing for preventive detention shall authorize detention of a person for a period longer than 3 months unless an Advisory Board reports that there is sufficient cause for such detention.",
  },
  {
    id: 10,
    question:
      "Which of the following statements about Section 377 of the IPC is currently correct?",
    options: [
      "It criminalizes all homosexual acts",
      "It was completely struck down by the Supreme Court",
      "It no longer criminalizes consensual acts between adults but still applies to non-consensual acts and acts with minors",
      "It was never enforced in independent India",
    ],
    correctAnswer: 2,
    explanation:
      "In the landmark judgment of Navtej Singh Johar v. Union of India (2018), the Supreme Court partially struck down Section 377, decriminalizing consensual sexual acts between adults. However, the section still applies to non-consensual acts and sexual acts with minors.",
  },
];

export const metadata: Metadata = {
  title: "Legal Trivia Challenge",
  description:
    "Test your knowledge of Indian law with challenging trivia questions. Improve your legal knowledge and have fun!",
  keywords:
    "Legal Trivia, Indian Law, Trivia Challenge, Legal Knowledge, Law Quiz",
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "Legal Trivia Challenge",
    description:
      "Test your knowledge of Indian law with challenging trivia questions. Improve your legal knowledge and have fun!",
    url: "https://yourwebsite.com/trivia",
    siteName: "Legal Trivia",
    images: [
      {
        url: "https://yourwebsite.com/trivia-image.jpg",
        width: 800,
        height: 600,
        alt: "Legal Trivia Challenge",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Trivia Challenge",
    description:
      "Test your knowledge of Indian law with challenging trivia questions. Improve your legal knowledge and have fun!",
    images: ["https://yourwebsite.com/trivia-image.jpg"],
  },
};
