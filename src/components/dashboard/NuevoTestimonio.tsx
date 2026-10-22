'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/client';
import { EstadoEscritura, CondicionRegistral } from '@/types/escritura';
import { formatFecha } from '@/lib/helper/date';

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
      // Mandamos la fecha limpia 'YYYY-MM-DD' a Supabase
      const payload = {
        numero_escritura: parseInt(formData.numero_escritura, 10),
        anio: parseInt(formData.anio, 10),
        partes: formData.partes,
        tipo_acto: formData.tipo_acto,
        estado: formData.estado,
        condicion_registral: formData.condicion_registral,
        fecha_firma: formData.fecha_firma ? formData.fecha_firma.split('T')[0] : null,
        matricula_inmueble: formData.matricula_inmueble || null,
        motivo_observacion:
          formData.condicion_registral === 'PROVISIONAL'
            ? formData.motivo_observacion
            : null,
        fecha_ingreso_registro:
          formData.estado === 'EN_REGISTRO' && formData.fecha_ingreso_registro
            ? formData.fecha_ingreso_registro.split('T')[0]
            : null,
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

  const esEnRegistro = formData.estado === 'EN_REGISTRO';

  return (
    <div className="bg-card p-6 rounded-2xl border border-border max-w-2xl w-full mx-auto font-body shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Nueva Escritura</h2>
        <p className="text-xs text-muted mt-1">Carga un nuevo Primer Testimonio</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fila 1: Fechas y datos principales en grilla adaptable */}
        <div className={`grid grid-cols-1 ${esEnRegistro ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} gap-4`}>
          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-1">
              N° Escritura *
            </label>
            <input
              type="number"
              name="numero_escritura"
              value={formData.numero_escritura}
              onChange={handleChange}
              placeholder="123"
              required
              className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-1">
              Año *
            </label>
            <input
              type="number"
              name="anio"
              value={formData.anio}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-1">
              Fecha de Firma *
            </label>
            <input
              type="date"
              name="fecha_firma"
              value={formData.fecha_firma}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Fecha Ingreso Registro condicional */}
          {esEnRegistro && (
            <div>
              <label className="block text-xs font-semibold text-muted uppercase mb-1 truncate" title="Fecha de Ingreso al Registro">
                Fecha Ingreso *
              </label>
              <input
                type="date"
                name="fecha_ingreso_registro"
                value={formData.fecha_ingreso_registro}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          )}
        </div>

        {/* Fila 2: Acto y Partes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-1">
              Tipo de Acto *
            </label>
            <input
              type="text"
              name="tipo_acto"
              value={formData.tipo_acto}
              onChange={handleChange}
              placeholder="Ej: Compraventa, Donación"
              required
              className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-1">
              Partes Intervinientes *
            </label>
            <input
              type="text"
              name="partes"
              value={formData.partes}
              onChange={handleChange}
              placeholder="Ej: Pérez a favor de Gómez"
              required
              className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Fila 3: Estado, Matrícula y Condición Registral */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-1">
              Estado Inicial
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="PENDIENTE_INGRESO">Pendiente Ingreso</option>
              <option value="EN_REGISTRO">En Registro</option>
              <option value="EN_STOCK">En Stock</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-1">
              Matrícula Inmueble
            </label>
            <input
              type="text"
              name="matricula_inmueble"
              value={formData.matricula_inmueble}
              onChange={handleChange}
              placeholder="Ej: 12345/0"
              className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-1">
              Condición Registral
            </label>
            <select
              name="condicion_registral"
              value={formData.condicion_registral}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="NO_APLICA">No Aplica</option>
              <option value="DEFINITIVA">Definitiva</option>
              <option value="PROVISIONAL">Provisional</option>
            </select>
          </div>
        </div>

        {/* Campo observacion condicional */}
        {formData.condicion_registral === 'PROVISIONAL' && (
          <div>
            <label className="block text-xs font-semibold text-amber-700 uppercase mb-1">
              Motivo de Observación *
            </label>
            <textarea
              name="motivo_observacion"
              value={formData.motivo_observacion}
              onChange={handleChange}
              placeholder="Describa el motivo de la inscripción provisional..."
              required
              rows={2}
              className="w-full px-3 py-2 border border-amber-500/30 bg-amber-500/5 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-xs font-medium text-muted hover:text-foreground transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? 'Guardando...' : '+ Registrar Escritura'}
          </button>
        </div>
      </form>
    </div>
  );
}