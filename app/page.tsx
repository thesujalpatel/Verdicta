import Image from "next/image";

export default function Landing() {
  return (
    <div className="absolute flex flex-col items-center w-full bg-background top-0 left-0 h-screen justify-center">
      <h1 className="text-6xl font-bold mb-4 text-primary">Verdicta</h1>
      <p className="text-2xl mb-8">Your AI-powered legal assistant</p>
      <div className="flex flex-col items-center">
        <p className="text-lg mb-4">Coming soon...</p>
        <p className="text-lg mb-4">Stay tuned for updates!</p>
        <p className="text-lg mb-4">
          Follow us on social media for the latest news!
        </p>
      </div>
    </div>
  );
}
