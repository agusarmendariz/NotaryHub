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
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm font-body">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-foreground">
          {/* Header de la tabla */}
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

          {/* Cuerpo de la tabla */}
          <tbody className="divide-y divide-border/60">
            {testimonios.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-primary-light/30 transition-colors"
              >
                {/* Matrícula */}
                <td className="px-6 py-4 font-mono font-medium text-foreground">
                  {item.matricula_inmueble || '-'}
                </td>

                {/* N° Escritura */}
                <td className="px-6 py-4 font-semibold text-foreground">
                  {item.numero_escritura}
                </td>

                {/* Acto */}
                <td className="px-6 py-4 text-foreground/80">
                  {item.tipo_acto}
                </td>

                {/* Partes */}
                <td className="px-6 py-4 font-medium text-foreground">
                  {item.partes}
                </td>

                {/* Motivo de Observación (Solo en Pendientes) */}
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

                {/* Fecha */}
                <td className="px-6 py-4 text-muted whitespace-nowrap">
                  {item.fecha_ingreso_registro || item.fecha_firma}
                </td>

                {/* Acciones */}
                <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                  {/* Botón Entregar (Solo en EN_STOCK) */}
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

                  {/* Botón para eliminar */}
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
  );
}