'use client';

import { useState } from "react";
import Link from "next/link";
import { Building2, Clock, Archive, Stamp, Menu, X } from "lucide-react";
import { LogoutButton } from "../logout/logoutButtom";

const statusNavigation = [
  { label: 'En Registro', href: '/dashboard?estado=EN_REGISTRO', icon: Building2 },
  { label: 'Pendientes/Observadas', href: '/dashboard?estado=PENDIENTE_INGRESO', icon: Clock },
  { label: 'En stock', href: '/dashboard?estado=EN_STOCK', icon: Archive },
  { label: 'Retiradas', href: '/dashboard?estado=RETIRADA', icon: Stamp }
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* 1. Header Mobile Superior (Visible en < md) */}
      <header className="md:hidden flex items-center justify-between h-16 px-4 bg-card border-b border-border sticky top-0 z-40">
        <span className="font-title text-xl font-semibold tracking-tight text-foreground">
          Notary<span className="text-primary">Hub</span>
        </span>
        <button
          onClick={toggleMenu}
          className="p-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors focus:outline-none"
          aria-label="Abrir menú"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* 2. Overlay Oscuro de fondo en Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* 3. Sidebar Drawer (Mobile) + Fijo (Desktop) */}
      <aside
        className={`
          w-64 h-screen border-r border-border bg-card text-foreground font-body flex flex-col fixed left-0 top-0 z-50 transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
        `}
      >
        {/* Brand / Header Sidebar */}
        <div className="h-16 px-6 border-b border-border flex items-center justify-between shrink-0">
          <span className="font-title text-xl font-semibold tracking-tight text-foreground">
            Notary<span className="text-primary">Hub</span>
          </span>
          <button
            onClick={closeMenu}
            className="md:hidden p-1 text-muted hover:text-foreground rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {statusNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-primary-light/50 transition-colors group"
              >
                <Icon className="w-4 h-4 text-muted group-hover:text-primary transition-colors shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-border shrink-0">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}