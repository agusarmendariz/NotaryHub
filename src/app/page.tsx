
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturesMarquee } from "@/components/landing/FeaturesMarquee";
import { Hero } from "@/components/landing/Hero"; // <-- 1. Importás el componente Hero

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-body selection:bg-primary selection:text-white">
      {/* Navbar Superior */}
      <header className="max-w-7xl w-full mx-auto px-6 py-7 flex justify-between items-center border-b border-border/80 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="font-title text-2xl font-bold tracking-tight text-foreground">
            Notary<span className="text-primary">Hub</span>
          </span>
        </div>
        
        <Link
          href="/login"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-primary/20 active:scale-[0.98]"
        >
          Ingresar
          <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      {/* Hero Central */}
      <main className="flex-1 flex flex-col justify-center">
        {/* 2. Reemplazás la etiqueta <section> por el componente <Hero /> */}
        <Hero />

        {/* Carrusel Infinito */}
        <FeaturesMarquee />
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-muted/70 text-xs font-body border-t border-border/80">
        © 2026 NotaryHub. Todos los derechos reservados.
      </footer>
    </div>
  );
}