

import TestimoniosTable, { Testimonio } from '@/components/dashboard/TestimoniosTable';
import { TableToolbar } from '@/components/dashboard/TableToolBar';

interface PageProps {
  searchParams: Promise<{
    search?: string;
    estado?: string;
  }>;
}

// Datos de prueba temporales
const MOCK_TESTIMONIOS: Testimonio[] = [
  {
    id: '1',
    matricula: '500789654',
    escrituraNro: 'N° 142',
    acto: 'Venta',
    partes: 'Pérez c/ Gómez',
    fechaIngreso: '02/09/2026',
    estado: 'en_registro',
  },
  {
    id: '2',
    matricula: '400852963',
    escrituraNro: 'N° 98',
    acto: 'Donación con Reserva de Usufructo',
    partes: 'Fernández a favor de Fernández',
    fechaIngreso: '28/08/2026',
    estado: 'pendiente',
    motivoObservacion: 'Falta adjuntar certificado catastral.',
  },
  {
    id: '3',
    matricula: '600123654',
    escrituraNro: 'N° 50',
    acto: 'Reglamento de PH',
    partes: 'Alberto Peñas Flores',
    fechaIngreso: '28/08/2026',
    estado: 'en_stock',
  },
];

export default async function DashboardPage({ searchParams }: PageProps) {
  const { search = '', estado = 'en_registro' } = await searchParams;

  // Filtrado de testimonios por estado y texto de búsqueda
  const testimoniosFiltrados = MOCK_TESTIMONIOS.filter((item) => {
    const coincideEstado = item.estado === estado;
    const termino = search.toLowerCase();
    
    const coincideBusqueda = 
      !search ||
      item.matricula.toLowerCase().includes(termino) ||
      item.escrituraNro.toLowerCase().includes(termino) ||
      item.partes.toLowerCase().includes(termino) ||
      item.acto.toLowerCase().includes(termino);

    return coincideEstado && coincideBusqueda;
  });

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
    <TableToolbar/>
      <TestimoniosTable 
        testimonios={testimoniosFiltrados} 
        estadoActual={estado} 
      />
    </div>
  );
}