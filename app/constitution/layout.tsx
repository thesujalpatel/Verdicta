import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Indian Constitution & Laws Database - Verdicta",
  description:
    "Explore the complete Indian Constitution and legal database with Verdicta. Access articles, amendments, fundamental rights, directive principles, and comprehensive legal documentation in an easy-to-navigate format.",
  keywords: [
    "Indian Constitution",
    "Constitution of India",
    "fundamental rights India",
    "directive principles",
    "constitutional articles",
    "Indian law database",
    "legal documents India",
    "constitutional amendments",
    "Indian legal system",
    "constitution articles",
    "Article 370",
    "fundamental duties",
    "constitutional law India",
    "Indian judiciary",
    "constitutional provisions",
  ],
  openGraph: {
    title: "Indian Constitution & Laws Database - Verdicta",
    description:
      "Explore the complete Indian Constitution and legal database with comprehensive articles, amendments, and legal documentation.",
    url: "https://verdicta.netlify.app/constitution",
  },
  twitter: {
    title: "Indian Constitution & Laws Database - Verdicta",
    description:
      "Explore the complete Indian Constitution and legal database with Verdicta.",
  },
  alternates: {
    canonical: "https://verdicta.netlify.app/constitution",
  },
};

export default function ConstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
