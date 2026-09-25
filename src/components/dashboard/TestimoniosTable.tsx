'use client';

import { AlertCircle, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

export interface Testimonio {
  id: string;
  matricula: string;
  escrituraNro: string;
  acto: string;
  partes: string;
  fechaIngreso: string;
  estado: 'en_registro' | 'pendiente' | 'en_stock';
  motivoObservacion?: string;
}

interface TestimoniosTableProps {
  testimonios: Testimonio[];
  estadoActual: string;
}

export default function TestimoniosTable({ testimonios, estadoActual }: TestimoniosTableProps) {

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
              {estadoActual === 'pendiente' && (
                <th className="px-6 py-3.5 text-amber-700">Motivo de Observación</th>
              )}
              <th className="px-6 py-3.5">Fecha Ingreso</th>
              <th className="px-6 py-3.5 text-right">Acción</th>
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
                  {item.matricula}
                </td>

                {/* N° Escritura */}
                <td className="px-6 py-4 font-semibold text-foreground">
                  {item.escrituraNro}
                </td>

                {/* Acto */}
                <td className="px-6 py-4 text-foreground/80">
                  {item.acto}
                </td>

                {/* Partes */}
                <td className="px-6 py-4 font-medium text-foreground">
                  {item.partes}
                </td>

                {/* Motivo de Observación (Solo en solapa Pendientes) */}
                {estadoActual === 'pendiente' && (
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-1.5 text-amber-900 bg-amber-500/10 px-2.5 py-1.5 rounded-md border border-amber-500/20 max-w-md">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-snug font-medium">
                        {item.motivoObservacion || 'Sin motivo especificado'}
                      </span>
                    </div>
                  </td>
                )}

                {/* Fecha */}
                <td className="px-6 py-4 text-muted whitespace-nowrap">
                  {item.fechaIngreso}
                </td>

                {/* Link Ver Detalle */}
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <Link
                    href={`/dashboard/escritura/${item.id}`}
                    className="inline-flex items-center gap-1 text-foreground hover:text-primary font-medium hover:underline transition-all"
                  >
                    <span>Ver detalle</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}