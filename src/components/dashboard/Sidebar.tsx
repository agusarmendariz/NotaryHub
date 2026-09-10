import Link from "next/link"

import { FileText,Building2, Clock, CheckCircle2,Archive, Settings, Stamp } from "lucide-react"

const statusNavigation = [
{label: 'En Registro', href: '/dashboard?estado=en_registro', icon:Building2},
{label:'Pendientes/Observadas', href:'/dashboard?estado=pendiente',icon:Clock},
{label:'En stock', href:'/dashboard?estado=en_stock', icon:Archive}
]

export function Sidebar (){
    return (
        <aside className="w-64 h-screen border-r border-slate-200 bg-white text-slate-900 fixed left-0 top-0">
        
        <div className="h-16 px-6 border-b border-slate-200 flex items-center">
          <span className="font-title text-xl font-semibold tracking-tight text-slate-900">
            Notary<span className="text-primary">Hub</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
        {statusNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors group"
            >
              <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
            
        </aside>
    )
}