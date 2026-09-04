
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturesMarquee } from "@/components/landing/FeaturesMarquee";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-accent selection:text-white">
      {/* Navbar Superior */}
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

      {/* Hero Central + Carrusel */}
      <main>
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center flex flex-col items-center">
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
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-8 py-3.5 rounded-xl transition-all shadow-xl shadow-accent/20"
          >
            Probar App
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Carrusel Infinito */}
        <FeaturesMarquee />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-600 text-xs font-body border-t border-slate-900">
        © 2026 NotaryHub. Todos los derechos reservados.
      </footer>
    </div>
  );
}