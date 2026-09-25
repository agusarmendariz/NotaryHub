'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react'; // Importación agregada
import { supabase } from '@/lib/supabase';
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

  const [formData, setFormData] = useState<FormState>({
    numero_escritura: '',
    anio: new Date().getFullYear().toString(),
    partes: '',
    tipo_acto: '',
    estado: 'EN_REGISTRO',
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        numero_escritura: parseInt(formData.numero_escritura),
        anio: parseInt(formData.anio),
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
        .insert([payload]);

      if (insertError) throw insertError;

      if (onClose) {
        onClose();
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Error al guardar la escritura');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white bg-slate-900 rounded-xl border border-slate-200 border-slate-800 shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 text-white">
          + Nueva Escritura
        </h2>
        <p className="text-sm text-slate-500">
          Carga un nuevo Primer Testimonio
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 rounded-lg border border-red-200 dark:border-red-900">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BLOQUE 1: Datos de la Escritura */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Número Escritura *
            </label>
            <input
              type="number"
              name="numero_escritura"
              value={formData.numero_escritura}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 bg-transparent text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Año *
            </label>
            <input
              type="number"
              name="anio"
              value={formData.anio}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 bg-transparent text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Fecha de Firma *
            </label>
            <input
              type="date"
              name="fecha_firma"
              value={formData.fecha_firma}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 bg-transparent text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Tipo de Acto *
            </label>
            <input
              type="text"
              name="tipo_acto"
              placeholder="Ej: Compraventa, Donación, Poder"
              value={formData.tipo_acto}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 bg-transparent text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Partes Intervinientes *
            </label>
            <input
              type="text"
              name="partes"
              placeholder="Ej: Pérez c/ Gómez"
              value={formData.partes}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 bg-transparent text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* BLOQUE 2: Estado y Datos Registrales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Estado Inicial
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="PENDIENTE_INGRESO">Pendiente de Ingreso</option>
              <option value="EN_REGISTRO">En Registro</option>
              <option value="EN_STOCK">En Stock / Custodia</option>
              <option value="RETIRADA">Retirada</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Matrícula Inmueble
            </label>
            <input
              type="text"
              name="matricula_inmueble"
              placeholder="Ej: 12345/0"
              value={formData.matricula_inmueble}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 bg-transparent text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Condición Registral
            </label>
            <select
              name="condicion_registral"
              value={formData.condicion_registral}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              <option value="NO_APLICA">No Aplica</option>
              <option value="DEFINITIVA">Definitiva</option>
              <option value="PROVISIONAL">Provisional (180 días)</option>
            </select>
          </div>
        </div>

        {/* BLOQUE 3: Motivo de Observación Condicional */}
        {formData.condicion_registral === 'PROVISIONAL' && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900 space-y-2">
            <label className="block text-sm font-semibold text-amber-800 dark:text-amber-300">
              Motivo de Observación / Defecto
            </label>
            <textarea
              name="motivo_observacion"
              rows={3}
              placeholder="Detalle los defectos o requisitos faltantes..."
              value={formData.motivo_observacion}
              onChange={handleChange}
              className="w-full p-2.5 text-sm rounded-md border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>
        )}

        {/* BLOQUE 4: Botones de Acción */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose || (() => router.push('/dashboard'))}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-xs font-medium bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{loading ? 'Guardando...' : 'Registrar Escritura'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}