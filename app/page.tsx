import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full bg-background px-6 text-center lg:text-left">

      <div className="w-full lg:mt-[-100] lg:w-1/2 lg:mb-0 mt-[-100]">
        <h1 className="text-6xl font-bold text-primary mb-4 lg:mb-6">
          Verdicta
        </h1>
        <p className="text-2xl text-muted-foreground">
          Your AI-powered legal assistant
        </p><br /><br />
        <p className="text-md text-muted-foreground">
          Chat with AI Legal Assistant. <br />
          Understand the Indian Constitution. <br />
          Test Your Legal Knowledge with Trivia.
        </p>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:mt-[-70]">
        <div className="bg-muted p-6 w-full max-w-md mb-8 mt-10 lg:mt-0">
          <p className="lg:text-lg text-sm mb-3 italic">
            This assistant offers insights, not decisions.
          </p>
          <p className="lg:text-lg text-sm mb-3 italic">
            No algorithm can match your lawyer’s precision.
          </p>
          <p className="lg:text-lg text-sm mb-3 italic">
            Consult the wise when stakes are high —
          </p>
          <p className="lg:text-lg text-sm italic">
            Machines may help, but humans apply.
          </p>
        </div>

        <Link href="/lawChat">
          <button className="group inline-flex items-center gap-2 bg-primary text-white lg:px-8 px-6 lg:py-5 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-primary/90 transition lg:ml-10">
            Start Now
            <span className="inline-block transform transition-transform group-hover:translate-x-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
