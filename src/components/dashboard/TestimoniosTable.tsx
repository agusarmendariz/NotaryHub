'use client';

import { useRouter } from 'next/navigation';
import { AlertCircle, ExternalLink, FileText, CheckCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/client";
import { Escritura } from "@/types/escritura";

interface TestimoniosTableProps {
  testimonios: Escritura[];
  estadoActual: string;
}

export default function TestimoniosTable({ testimonios, estadoActual }: TestimoniosTableProps) {
  const router = useRouter();
  const supabase = createClient();

  // Acción: Pasar de EN_STOCK a RETIRADA
  const handleEntregar = async (id: number) => {
    const { error } = await supabase
      .from('escrituras')
      .update({ 
        estado: 'RETIRADA', 
        fecha_entrega: new Date().toISOString().split('T')[0] 
      })
      .eq('id', id);

    if (error) {
      alert('Error al actualizar el estado: ' + error.message);
    } else {
      router.refresh();
    }
  };

  // Acción: Borrar registro por error de carga
  const handleEliminar = async (id: number) => {
    const confirmado = window.confirm(
      '¿Estás seguro de que deseas eliminar esta escritura? Esta acción no se puede deshacer.'
    );
    if (!confirmado) return;

    const { error } = await supabase
      .from('escrituras')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error al eliminar: ' + error.message);
    } else {
      router.refresh();
    }
  };

  /* Estado vacío */
  if (testimonios.length === 0) {
    return (
      <div className="p-12 text-center bg-card border border-border rounded-xl my-4 font-body">
        <FileText className="w-10 h-10 text-muted mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-foreground">No se encontraron registros</h3>
        <p className="text-xs text-muted mt-1">
          No hay testimonios que coincidan con los filtros o la búsqueda actual.
        </p>
      </div>
    );
  }

  const esPendiente = estadoActual.toUpperCase().includes('PENDIENTE');

  return (
    <div className="font-body space-y-4">
      {/* VISTA MOBILE: Cards (se muestra solo en pantallas < md) */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {testimonios.map((item) => (
          <div 
            key={item.id} 
            className="bg-card border border-border rounded-xl p-4 shadow-sm space-y-3"
          >
            {/* Header Card */}
            <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
              <div>
                <span className="text-[10px] uppercase font-semibold text-muted block">
                  N° Escritura
                </span>
                <span className="text-sm font-bold text-foreground">
                  {item.numero_escritura}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-semibold text-muted block">
                  Matrícula
                </span>
                <span className="text-xs font-mono font-medium text-foreground">
                  {item.matricula_inmueble || '-'}
                </span>
              </div>
            </div>

            {/* Detalles */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted block text-[11px]">Acto / Operación:</span>
                <span className="font-medium text-foreground/90">{item.tipo_acto}</span>
              </div>
              <div>
                <span className="text-muted block text-[11px]">Fecha Ingreso:</span>
                <span className="font-medium text-foreground/90">
                  {item.fecha_ingreso_registro || item.fecha_firma}
                </span>
              </div>
            </div>

            <div>
              <span className="text-muted block text-[11px]">Partes Intervinientes:</span>
              <span className="font-medium text-foreground">{item.partes}</span>
            </div>

            {/* Motivo Observación (solo si es pendiente) */}
            {esPendiente && (
              <div className="flex items-start gap-1.5 text-amber-900 bg-amber-500/10 p-2 rounded-md border border-amber-500/20">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-snug font-medium">
                  {item.motivo_observacion || 'Sin motivo especificado'}
                </span>
              </div>
            )}

            {/* Acciones Mobile */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
              {item.estado === 'EN_STOCK' && (
                <button
                  onClick={() => handleEntregar(item.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 text-xs font-medium transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Entregar</span>
                </button>
              )}

              <button
                onClick={() => handleEliminar(item.id)}
                className="inline-flex items-center justify-center p-1.5 text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Eliminar escritura"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VISTA DESKTOP: Tabla Tradicional (se oculta en pantallas < md) */}
      <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-foreground">
            <thead className="bg-muted/30 text-[11px] font-semibold text-muted uppercase tracking-wider border-b border-border">
              <tr>
                <th className="px-6 py-3.5">Matrícula</th>
                <th className="px-6 py-3.5">N° Escritura</th>
                <th className="px-6 py-3.5">Acto / Operación</th>
                <th className="px-6 py-3.5">Partes Intervinientes</th>
                {esPendiente && (
                  <th className="px-6 py-3.5 text-amber-700">Motivo de Observación</th>
                )}
                <th className="px-6 py-3.5">Fecha Ingreso</th>
                <th className="px-6 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60">
              {testimonios.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-primary-light/30 transition-colors"
                >
                  <td className="px-6 py-4 font-mono font-medium text-foreground">
                    {item.matricula_inmueble || '-'}
                  </td>
                  <td className="px-6 py-4 font-semibold text-foreground">
                    {item.numero_escritura}
                  </td>
                  <td className="px-6 py-4 text-foreground/80">
                    {item.tipo_acto}
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.partes}
                  </td>
                  {esPendiente && (
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-1.5 text-amber-900 bg-amber-500/10 px-2.5 py-1.5 rounded-md border border-amber-500/20 max-w-md">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-snug font-medium">
                          {item.motivo_observacion || 'Sin motivo especificado'}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 text-muted whitespace-nowrap">
                    {item.fecha_ingreso_registro || item.fecha_firma}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                    {item.estado === 'EN_STOCK' && (
                      <button
                        onClick={() => handleEntregar(item.id)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-all mr-2"
                        title="Marcar como entregada al cliente"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Entregar</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleEliminar(item.id)}
                      className="inline-flex items-center justify-center text-red-600 hover:text-red-800 transition-colors p-1.5 rounded hover:bg-red-500/10"
                      title="Eliminar escritura"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}