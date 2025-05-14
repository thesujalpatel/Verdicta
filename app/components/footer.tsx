import ThemeSwitcher from "../hooks/ThemeSwitcher";

export default function Footer() {
  return (
    <footer className="py-4 border-t-2 border-foreground">
      <div className="flex justify-between items-center px-4">
        <p>&copy; 2025 Verdicta. All rights reserved.</p>
        <ThemeSwitcher />
      </div>
    </footer>
  );
}
