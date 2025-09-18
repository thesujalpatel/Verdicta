import Link from "next/link";
import ThemeSwitcher from "../hooks/ThemeSwitcher";
import { PiGithubLogo } from "react-icons/pi";
import { FiUser } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Branding */}
            <div>
              <h2 className="text-3xl text-primary font-[family-name:var(--font-cinzel)]">
                Verdicta
              </h2>
              <p className="text-foreground/80 mt-2 max-w-md text-base">
                Your AI-powered legal assistant that makes Indian law
                accessible, understandable, and interactive.
              </p>
              <div className="mt-6">
                <ThemeSwitcher />
              </div>
            </div>

            {/* Links */}
            <div className="md:ml-auto">
              <h3 className="text-lg font-medium mb-4 text-primary">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/chat"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    AI Chat Assistant
                  </Link>
                </li>
                <li>
                  <Link
                    href="/constitution"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    Constitution Explorer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trivia"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    Legal Trivia
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-primary">Authors</h3>
              <div className="flex flex-col space-x-4">
                <a
                  href="https://thesujalpatel.me"
                  className="text-foreground/70 hover:text-primary transition-colors w-fit"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Sujal Patel Portfolio"
                >
                  <div className="flex items-center space-x-2">
                    <FiUser className="text-primary" />
                    <p>Sujal Patel</p>
                  </div>
                </a>
                <a
                  href="https://shreyash0712.github.io"
                  className="text-foreground/70 hover:text-primary transition-colors w-fit"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Shreyash Swami GitHub"
                >
                  <div className="flex items-center space-x-2">
                    <FiUser className="text-primary" />
                    <p>Shreyash Swami</p>
                  </div>
                </a>
              </div>
              <div className="mt-4 text-sm text-foreground/60">
                <p>For suggestions or feedback:</p>
                <a
                  href="https://github.com/thesujalpatel/verdicta/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Contact us on GitHub"
                  className="space-x-2 text-foreground/70 hover:text-primary transition-colors w-fit"
                >
                  <div className="flex items-center gap-2">
                    <PiGithubLogo className="text-primary" size={18} />
                    <span>Contact Us</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-foreground/10 py-6 text-center text-sm text-foreground/60">
          <p>
            &copy; {currentYear} Verdicta. All rights reserved. Not a substitute
            for professional legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
