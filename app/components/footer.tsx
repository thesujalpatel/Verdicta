import ThemeSwitcher from "../hooks/ThemeSwitcher";

export default function Footer() {
  return (
    <footer className="py-4 border-t-2 border-foreground">
      <div className="flex justify-between px-4">
        <div>
          <h2 className="text-3xl text-primary font-[family-name:var(--font-cinzel)]">
            Verdicta
          </h2>
          <p className="text-foreground">Your AI-powered legal assistant.</p>
          <p className="text-sm mt-3">
            &copy; 2025 Verdicta. All rights reserved.
          </p>
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
