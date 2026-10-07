'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { createClient } from '@/lib/client';
import { EstadoEscritura, CondicionRegistral } from '@/types/escritura';

interface FormState {
  numero_escritura: string;
  anio: string;
  partes: string;
  tipo_acto: string;
  estado: EstadoEscritura;
  condicion_registral: CondicionRegistral;
  fecha_firma: string;
  matricula_inmueble: string;
  motivo_observacion: string;
  fecha_ingreso_registro: string;
}

interface NuevoTestimonioProps {
  onClose?: () => void;
}

export function NuevoTestimonio({ onClose }: NuevoTestimonioProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const [formData, setFormData] = useState<FormState>({
    numero_escritura: '',
    anio: new Date().getFullYear().toString(),
    partes: '',
    tipo_acto: '',
    estado: 'PENDIENTE_INGRESO',
    condicion_registral: 'NO_APLICA',
    fecha_firma: '',
    matricula_inmueble: '',
    motivo_observacion: '',
    fecha_ingreso_registro: '',
  });

  type InputChangeEvent = ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;

  const handleChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      if (name === 'condicion_registral') {
        if (value === 'PROVISIONAL') {
          updated.estado = 'PENDIENTE_INGRESO';
        } else if (prev.condicion_registral === 'PROVISIONAL' && value !== 'PROVISIONAL') {
          updated.estado = 'EN_REGISTRO';
        }
      }
      
      return updated;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        numero_escritura: parseInt(formData.numero_escritura, 10),
        anio: parseInt(formData.anio, 10),
        partes: formData.partes,
        tipo_acto: formData.tipo_acto,
        estado: formData.estado,
        condicion_registral: formData.condicion_registral,
        fecha_firma: formData.fecha_firma,
        matricula_inmueble: formData.matricula_inmueble || null,
        motivo_observacion:
          formData.condicion_registral === 'PROVISIONAL'
            ? formData.motivo_observacion
            : null,
        fecha_ingreso_registro: formData.fecha_ingreso_registro || null,
      };

      const { error: insertError } = await supabase
        .from('escrituras')
        .insert([payload])
        .select();

      if (insertError) throw insertError;

      router.refresh();

      if (onClose) {
        onClose();
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Error al guardar la escritura');
    } finally {
      setLoading(false);
    }
  };

  // Clases compartidas optimizadas para legibilidad y toque en móviles
  const inputBaseStyles =
    'w-full px-3.5 py-2.5 min-h-[44px] text-base sm:text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card text-foreground transition-all';
  const labelStyles =
    'block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5';

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-card rounded-2xl border border-border/80 shadow-sm space-y-6 font-body max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-title font-semibold tracking-tight text-foreground">
          Nueva Escritura
        </h2>
        <p className="text-xs sm:text-sm text-muted mt-0.5">
          Carga un nuevo Primer Testimonio
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-500/10 rounded-xl border border-red-500/20 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* BLOQUE 1: Datos numéricos y fecha */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
          <div>
            <label className={labelStyles}>N° Escritura *</label>
            <input
              type="number"
              name="numero_escritura"
              value={formData.numero_escritura}
              onChange={handleChange}
              required
              inputMode="numeric"
              placeholder="123"
              className={inputBaseStyles}
            />
          </div>

          <div>
            <label className={labelStyles}>Año *</label>
            <input
              type="number"
              name="anio"
              value={formData.anio}
              onChange={handleChange}
              required
              inputMode="numeric"
              className={inputBaseStyles}
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className={labelStyles}>Fecha de Firma *</label>
            <input
              type="date"
              name="fecha_firma"
              min="1900-01-01"
              max="9999-12-31"
              value={formData.fecha_firma}
              onChange={handleChange}
              required
              className={inputBaseStyles}
            />
          </div>
        </div>

        {/* BLOQUE 2: Acto y Partes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          <div>
            <label className={labelStyles}>Tipo de Acto *</label>
            <input
              type="text"
              name="tipo_acto"
              placeholder="Ej: Compraventa, Donación"
              value={formData.tipo_acto}
              onChange={handleChange}
              required
              className={`${inputBaseStyles} placeholder:text-muted/60`}
            />
          </div>

          <div>
            <label className={labelStyles}>Partes Intervinientes *</label>
            <input
              type="text"
              name="partes"
              placeholder="Ej: Pérez c/ Gómez"
              value={formData.partes}
              onChange={handleChange}
              required
              className={`${inputBaseStyles} placeholder:text-muted/60`}
            />
          </div>
        </div>

        {/* BLOQUE 3: Estado y Datos Registrales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
          <div>
            <label className={labelStyles}>Estado Inicial</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className={inputBaseStyles}
            >
              <option value="PENDIENTE_INGRESO">Pendiente de Ingreso</option>
              <option value="EN_REGISTRO">En Registro</option>
              <option value="EN_STOCK">En Stock / Custodia</option>
            </select>
          </div>

          <div>
            <label className={labelStyles}>Matrícula Inmueble</label>
            <input
              type="text"
              name="matricula_inmueble"
              placeholder="Ej: 12345/0"
              value={formData.matricula_inmueble}
              onChange={handleChange}
              className={`${inputBaseStyles} placeholder:text-muted/60`}
            />
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <label className={labelStyles}>Condición Registral</label>
            <select
              name="condicion_registral"
              value={formData.condicion_registral}
              onChange={handleChange}
              className={inputBaseStyles}
            >
              <option value="NO_APLICA">No Aplica</option>
              <option value="DEFINITIVA">Definitiva</option>
              <option value="PROVISIONAL">Provisional (180 días)</option>
            </select>
          </div>
        </div>

        {/* BLOQUE 4: Motivo de Observación Condicional */}
        {formData.condicion_registral === 'PROVISIONAL' && (
          <div className="p-3.5 sm:p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Motivo de Observación / Defecto
            </label>
            <textarea
              name="motivo_observacion"
              rows={3}
              placeholder="Detalle los defectos o requisitos faltantes..."
              value={formData.motivo_observacion}
              onChange={handleChange}
              className="w-full p-3 text-base sm:text-sm rounded-lg border border-amber-500/30 bg-card text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
        )}

        {/* BLOQUE 5: Botones de Acción */}
        <div className="pt-4 border-t border-border flex flex-col-reverse sm:flex-row items-center sm:justify-end gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onClose || (() => router.push('/dashboard'))}
            className="w-full sm:w-auto px-5 py-3 sm:py-2.5 min-h-[44px] text-sm font-medium text-muted hover:text-foreground hover:bg-primary-light/50 rounded-xl transition-colors text-center"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-5 py-3 sm:py-2.5 min-h-[44px] text-sm font-medium bg-primary hover:bg-primary-hover text-white rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>{loading ? 'Guardando...' : 'Registrar Escritura'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}