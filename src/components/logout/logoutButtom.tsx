'use client';

import { useState } from 'react';
import { createClient } from '@/lib/client'; // Tu helper de cliente existente

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    setLoading(true);
    try {
      // 1. Notificar a Supabase para destruir el token/sesión
      await supabase.auth.signOut();
      
      // 2. Redirigir al login y recargar la página para limpiar las cookies en el servidor
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={
        className ||
        'w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50'
      }
    >
      {loading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
    </button>
  );
}