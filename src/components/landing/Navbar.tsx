import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-title font-bold text-accent">
          NH
        </div>
        <span className="font-title text-xl font-semibold tracking-tight text-white">
          Notary<span className="text-accent">Hub</span>
        </span>
      </div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-accent/20"
      >
        Ingresar
        <ArrowRight className="w-4 h-4" />
      </Link>
    </header>
  );
}