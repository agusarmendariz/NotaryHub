import { createClient } from '@/lib/server'; // Asegurar el import correcto de Server Component
import TableToolbar from '../../components/dashboard/TableToolBar';
import TestimoniosTable from '@/components/dashboard/TestimoniosTable';
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

  // 4. Búsqueda por término (Soporta texto y N° de escritura si es un número)
  if (search.trim()) {
    const term = search.trim();
    const terminoLike = `%${term}%`;
    
    // Si el usuario ingresa un número, incluimos la búsqueda exacta por numero_escritura
    if (!isNaN(Number(term))) {
      const numEscritura = parseInt(term, 10);
      query = query.or(
        `numero_escritura.eq.${numEscritura},matricula_inmueble.ilike.${terminoLike},partes.ilike.${terminoLike},tipo_acto.ilike.${terminoLike}`
      );
    } else {
      query = query.or(
        `matricula_inmueble.ilike.${terminoLike},partes.ilike.${terminoLike},tipo_acto.ilike.${terminoLike}`
      );
    }
  }

  const { data: escriturasData, error } = await query.order('numero_escritura', {
    ascending: false,
  });

  if (error) {
    console.error('Error al obtener escrituras desde Supabase:', error.message);
  }

  const escrituras = (escriturasData as Escritura[]) || [];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6 font-body box-border min-w-0">
      <TableToolbar />
      <TestimoniosTable 
        testimonios={escrituras} 
        estadoActual={estado || 'EN_REGISTRO'} 
      />
    </div>
  );
}