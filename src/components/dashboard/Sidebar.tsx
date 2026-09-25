import Link from "next/link";
import { FileText, Building2, Clock, CheckCircle2, Archive, Settings, Stamp } from "lucide-react";
import { LogoutButton } from "../logout/logoutButtom";

const statusNavigation = [
  { label: 'En Registro', href: '/dashboard?estado=en_registro', icon: Building2 },
  { label: 'Pendientes/Observadas', href: '/dashboard?estado=pendiente', icon: Clock },
  { label: 'En stock', href: '/dashboard?estado=en_stock', icon: Archive }
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r border-border bg-card text-foreground fixed left-0 top-0 font-body flex flex-col">
      
      {/* Brand / Header */}
      <div className="h-16 px-6 border-b border-border flex items-center shrink-0">
        
        <span className="font-title text-xl font-semibold tracking-tight text-foreground">
          Notary<span className="text-primary">Hub</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {statusNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-primary-light/50 transition-colors group"
            >
              <Icon className="w-4 h-4 text-muted group-hover:text-primary transition-colors shrink-0" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Settings Opcional */}
      <div className="p-4 border-t border-border shrink-0">
      <LogoutButton />
      </div>

    </aside>
  );
}