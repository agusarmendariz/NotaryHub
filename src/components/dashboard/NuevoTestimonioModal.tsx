'use client';

import { useState } from 'react';
import { X, Plus, FileText } from 'lucide-react';

interface NuevoTestimonioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGuardar?: (data: any) => void;
}

export function NuevoTestimonioModal({ isOpen, onClose }: NuevoTestimonioModalProps) {
    const [formData, setFormData] = useState({
      matricula: '',
      escrituraNro: '',
      acto: '',
      partes: '',
      estado: 'en_registro',
      motivoObservacion: '',
    });
  
    if (!isOpen) return null;
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Aquí se enviaría a la base de datos o Server Action
      console.log('Nuevo testimonio:', formData);
      onClose();
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
        <div className="bg-white border border-slate-200 rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Cabecera del Modal */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded-md text-primary">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-semibold text-slate-800">
                Ingresar Nuevo Testimonio
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
  
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-slate-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Matrícula *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 12-3456/M"
                  value={formData.matricula}
                  onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  N° Escritura *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: N° 142"
                  value={formData.escrituraNro}
                  onChange={(e) => setFormData({ ...formData, escrituraNro: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>
  
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Acto / Operación *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Compraventa Inmobiliaria"
                value={formData.acto}
                onChange={(e) => setFormData({ ...formData, acto: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
  
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Partes Intervinientes *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Pérez c/ Gómez"
                value={formData.partes}
                onChange={(e) => setFormData({ ...formData, partes: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
  
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Estado Inicial
              </label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
              >
                <option value="en_registro">En Registro</option>
                <option value="pendiente">Pendiente / Observado</option>
                <option value="retirada">Retirada del Registro</option>
                <option value="en_stock">En Stock / Custodia</option>
              </select>
            </div>
  
            {formData.estado === 'pendiente' && (
              <div>
                <label className="block font-medium text-amber-800 mb-1">
                  Motivo de Observación
                </label>
                <textarea
                  rows={2}
                  placeholder="Detalle la documentación faltante u observación..."
                  value={formData.motivoObservacion}
                  onChange={(e) => setFormData({ ...formData, motivoObservacion: e.target.value })}
                  className="w-full px-3 py-2 border border-amber-200 bg-amber-50/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/20 text-xs text-amber-900"
                />
              </div>
            )}
  
            {/* Acciones */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Registrar Escritura</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }