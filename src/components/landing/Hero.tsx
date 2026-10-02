import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center flex flex-col items-center">
      <span className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-accent text-xs font-semibold tracking-wider uppercase mb-6">
        PLATAFORMA DE GESTIÓN NOTARIAL
      </span>
      
      <h1 className="font-title text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6">
        Agilidad, precisión y control total de tus escrituras.
      </h1>
      
      <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mb-10 font-body leading-relaxed">
        Centralizá la trazabilidad de trámites, certificados y matriculados en una interfaz diseñada para la velocidad operativa.
      </p>

      <Link
        href="/login"
        className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-8 py-3.5 rounded-xl transition-all shadow-xl shadow-accent/20"
      >
        Probar App
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}