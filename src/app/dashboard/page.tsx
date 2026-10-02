import TestimoniosTable from '@/components/dashboard/TestimoniosTable';
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

  // 2. Cliente de Supabase para Server Components
  const supabase = await createClient();

  let query = supabase.from('escrituras').select('*');

  // 3. Normalizar el parámetro del Sidebar/URL al Enum exacto de Supabase
  if (estado) {
    const estadoUpper = estado.toUpperCase();
    if (estadoUpper === 'PENDIENTE' || estadoUpper === 'PENDIENTE_INGRESO') {
      query = query.eq('estado', 'PENDIENTE_INGRESO');
    } else if (estadoUpper === 'EN_REGISTRO') {
      query = query.eq('estado', 'EN_REGISTRO');
    } else if (estadoUpper === 'EN_STOCK') {
      query = query.eq('estado', 'EN_STOCK');
    } else if (estadoUpper === 'RETIRADA') {
      query = query.eq('estado', 'RETIRADA');
    } else {
      query = query.eq('estado', estadoUpper);
    }
  }

  // 4. Búsqueda por término
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

  // Pasamos los datos puros sin transformar a interfaces viejas
  const escrituras = (escriturasData as Escritura[]) || [];

  return (
    <div className="space-y-4 max-w-7xl mx-auto font-body">
      <TableToolbar />
      <TestimoniosTable 
        testimonios={escrituras} 
        estadoActual={estado || 'EN_REGISTRO'} 
      />
    </div>
  );
}