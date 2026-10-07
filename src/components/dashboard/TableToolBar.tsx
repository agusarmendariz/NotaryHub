'use client';

import { Search, Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function TableToolbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 font-body">
      {/* Campo de búsqueda */}
      <div className="relative w-full sm:max-w-xl">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar por matrícula, n° escritura, partes o acto..."
          defaultValue={searchParams.get('search')?.toString() || ''}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 sm:py-2 text-base sm:text-xs bg-card border border-border rounded-xl sm:rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm min-h-[44px] sm:min-h-0"
        />
      </div>

      {/* Botón CTA */}
      <Link
        href="/dashboard/nuevoTestimonio"
        className="flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-medium text-sm sm:text-xs px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-lg shadow-sm transition-all shrink-0 min-h-[44px] sm:min-h-0 w-full sm:w-auto"
      >
        <Plus className="w-4 h-4" />
        <span>Nueva Escritura</span>
      </Link>
    </div>
  );
}