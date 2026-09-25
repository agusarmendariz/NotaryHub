'use client'


import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    const supabase = createClient();
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(
          authError.message === 'Invalid login credentials'
            ? 'Credenciales inválidas. Verificá tu correo y contraseña.'
            : authError.message
        );
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al intentar iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background font-body transition-colors">
      <div className="max-w-md w-full p-6 bg-card rounded-xl border border-card-border shadow-sm space-y-6">
        
        {/* Encabezado */}
        <div className="space-y-1.5 text-center">
          <div className="inline-flex items-center justify-center p-2.5 rounded-lg bg-primary-light border border-primary-border mb-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground font-title tracking-tight">
            NotaryHub
          </h1>
          <p className="text-sm text-muted">
            Ingresá a tu cuenta para gestionar el protocolo de escrituras
          </p>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Correo Electrónico *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="escribania@ejemplo.com"
                className="w-full pl-9 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-transparent text-foreground text-sm"
              />
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-muted" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Contraseña *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-transparent text-foreground text-sm"
              />
              <Lock className="w-4 h-4 absolute left-3 top-2.5 text-muted" />
            </div>
          </div>

          {/* Botón de Acción */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 text-xs font-medium bg-primary hover:bg-primary-hover text-white rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 h-10"
            >
              <span>{loading ? 'Iniciando sesión...' : 'Ingresar al sistema'}</span>
              {!loading && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </form>

        {/* Pie de tarjeta */}
        <div className="pt-4 border-t border-border text-center">
          <p className="text-xs text-muted">
            Escribanía Digital &bull; Acceso Restringido
          </p>
        </div>

      </div>
    </div>
  );
}