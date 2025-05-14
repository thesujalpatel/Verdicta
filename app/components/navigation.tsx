import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex justify-between fixed top-0 left-0 bg-background p-4 w-full z-10 border-b-2 border-foreground">
      <Link href="/" className="text-xl text-primary font-bold">
        Verdicta
      </Link>
      <div className="flex gap-4">
        <Link href="/lawChat">Law Chat</Link>
        <Link href="/constitution">Constitution</Link>
        <Link href="/trivia">Trivia</Link>
      </div>
    </div>
  );
}
