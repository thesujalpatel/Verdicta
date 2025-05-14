import Image from "next/image";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-background h-screen">
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
