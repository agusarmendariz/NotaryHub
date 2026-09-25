import TestimoniosTable, { Testimonio } from '@/components/dashboard/TestimoniosTable';
import { TableToolbar } from '@/components/dashboard/TableToolBar';
import { createClient } from '@/lib/server';
import { Escritura } from '@/types/escritura';

// 1. Forzar datos frescos sin caché en el servidor
export const revalidate = 0;
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    estado?: string;
  }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const { search = '', estado } = await searchParams;

  // 2. Creás el cliente asíncrono con las cookies del usuario
  const supabase = await createClient();

  let query = supabase.from('escrituras').select('*');

  if (estado) {
    query = query.eq('estado', estado.toUpperCase());
  }

  if (search.trim()) {
    const termino = `%${search.trim()}%`;
    query = query.or(
      `matricula_inmueble.ilike.${termino},partes.ilike.${termino},tipo_acto.ilike.${termino}`
    );
  }

  const { data: escriturasData, error } = await query.order('numero_escritura', {
    ascending: false,
  });

  if (error) {
    console.error('Error al obtener escrituras desde Supabase:', error.message);
  }

  const escrituras = (escriturasData as Escritura[]) || [];

  const testimonios: Testimonio[] = escrituras.map((item) => ({
    id: item.id,
    matricula: item.matricula_inmueble || 'S/N',
    escrituraNro: `N° ${item.numero_escritura}`,
    acto: item.tipo_acto,
    partes: item.partes,
    fechaIngreso: item.fecha_ingreso_registro
      ? new Date(item.fecha_ingreso_registro).toLocaleDateString('es-AR')
      : item.fecha_firma,
    estado: item.estado.toLowerCase() as Testimonio['estado'],
    motivoObservacion: item.motivo_observacion || undefined,
  }));

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <TableToolbar />
      <TestimoniosTable 
        testimonios={testimonios} 
        estadoActual={estado || 'en_registro'} 
      />
    </div>
  );
}