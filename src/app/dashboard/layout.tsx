import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-background">
      {/* Sidebar con ancho fijo en desktop */}
      <Sidebar />

      {/* Contenedor principal: el flex-1 debe llevar min-w-0 y overflow-x-hidden */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen w-full min-w-0 overflow-x-hidden">
        <main className="flex-1 p-4 sm:p-6 w-full max-w-7xl mx-auto min-w-0 box-border">
          {children}
        </main>
      </div>
    </div>
  );
}