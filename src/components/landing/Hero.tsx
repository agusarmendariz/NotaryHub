import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center flex flex-col items-center">
      <span className="px-4 py-1.5 rounded-full bg-primary-light border border-primary-border text-primary text-xs font-semibold tracking-widest uppercase mb-8">
        SISTEMA DE GESTIÓN Y TRAZABILIDAD NOTARIAL
      </span>
      
      <h1 className="font-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
        La infraestructura digital para el registro notarial moderno.
      </h1>
      
      <p className="text-muted text-lg sm:text-xl max-w-2xl mb-12 font-body leading-relaxed">
        Centralizá la trazabilidad de escrituras e ingresos al Registro en una plataforma ágil e intuitiva.
      </p>

      <Link
        href="/login"
        className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-white font-medium text-base px-8 py-4 rounded-xl transition-all shadow-xl shadow-primary/25 active:scale-[0.98]"
      >
        Ingresar al Sistema
        <ArrowRight className="w-5 h-5" />
      </Link>
    </section>
  );
}