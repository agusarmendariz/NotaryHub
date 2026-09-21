export type EstadoEscritura =
  | 'PENDIENTE_INGRESO'
  | 'EN_REGISTRO'
  | 'EN_STOCK'
  | 'RETIRADA';

export type CondicionRegistral =
  | 'DEFINITIVA'
  | 'PROVISIONAL'
  | 'NO_APLICA';

export interface Escritura {
  id: string; // UUID de Supabase
  created_at?: string;
  numero_escritura: number;
  anio: number;
  partes: string;
  tipo_acto: string;
  estado: EstadoEscritura;
  condicion_registral?: CondicionRegistral | null; // Nulo mientras está en trámite en el Registro
  fecha_firma: string; // Formato YYYY-MM-DD
  
  // Campos opcionales
  matricula_inmueble?: string | null;
  motivo_observacion?: string | null; // El motivo del defecto cuando es PROVISIONAL
  fecha_vencimiento_condicional?: string | null; // Fecha límite de los 180 días
  fecha_ingreso_registro?: string | null;
  fecha_salida_registro?: string | null;
  fecha_entrega?: string | null;
}