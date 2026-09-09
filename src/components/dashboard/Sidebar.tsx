import Link from "next/link"

import { FileText,Building2, Clock, CheckCircle2,Archive, Settings, Stamp } from "lucide-react"

const statusNavigation = [
{label: 'En Registro', href: '/dashboard?estado=en_registro', icon:Building2},
{label:'Pendientes/Observadas', href:'/dashboard?estado=pendiente',icon:Clock},
{label:'En stock', href:'/dashboard?estado=en:_stock', icon:Archive}
]

export function Sidebar (){
    return (
        <aside className="w-64 h-screen bg-slate-900 text-slate-200 border-r ">
            <div>
          <span className="font-bold text-base text-white block leading-none">Notary Hub</span>
          <span className="text-[10px] text-slate-400 tracking-wider uppercase">Gestión Notarial</span>
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