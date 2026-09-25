
import Link from "next/link";
import { ArrowRight, Stamp } from "lucide-react";
import { FeaturesMarquee } from "@/components/landing/FeaturesMarquee";

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
          <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center flex flex-col items-center">
            <span className="px-4 py-1.5 rounded-full bg-primary-light border border-primary-border text-primary text-xs font-semibold tracking-widest uppercase mb-8">
              SISTEMA DE GESTIÓN Y TRAZABILIDAD NOTARIAL
            </span>
            
            <h1 className="font-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
            La infraestructura digital para el registro notarial moderno.
            </h1>
            
            <p className="text-muted text-lg sm:text-xl max-w-2xl mb-12 font-body leading-relaxed">
              Monitoreá el estado de cada trámite desde el ingreso hasta su retirada. Reducí inconsistencias y automatizá el seguimiento de plazos en tu escribanía.
            </p>
  
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-white font-medium text-base px-8 py-4 rounded-xl transition-all shadow-xl shadow-primary/25 active:scale-[0.98]"
            >
              Ingresar al Sistema
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>
  
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