const features = [
    {
      titulo: "Trazabilidad de Trámites",
      descripcion: "Estados claros: En Registro, Pendiente, Stock o Retiradas.",
    },
    {
      titulo: "Búsqueda Ultra Rápida",
      descripcion: "Filtros instantáneos por número, partes o matrícula.",
    },
    {
      titulo: "Ingreso en Término",
      descripcion: "Alertas tempranas de vencimiento para la presentación del testimonio en el Registro.",
    }
    
  ];
  
  export function FeaturesMarquee() {
    return (
      <div className="w-full overflow-hidden fade-edges py-12">
        <div className="animate-marquee flex gap-6 hover:[animation-play-state:paused]">
          {/* Renderizado doble para el bucle continuo */}
          {[...features, ...features].map((item, index) => (
            <div
              key={index}
              className="w-[300px] bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shrink-0 shadow-lg"
            >
              <h3 className="font-title text-lg font-semibold text-white mb-2">
                {item.titulo}
              </h3>
              <p className="text-sm text-slate-400 font-body leading-snug">
                {item.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }