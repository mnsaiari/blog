import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-surface sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-text-primary hover:text-accent transition-colors">
          مدونتي
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/" className="text-text-secondary hover:text-accent transition-colors text-sm">
            الرئيسية
          </Link>
        </div>
      </div>
    </nav>
  );
}
