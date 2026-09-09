interface PageProps{
    searchParams: Promise<{
        search?:string;
        estado?: string;
    }>
}

export default  async function DashboardPage ({ searchParams}: PageProps) {
    const {search, estado= 'en_registro'} = await searchParams;
    return(
        <div className="space-y-6">
           <h1 className="text-2xl font-bold text-white">
        Primeros Testimonios en Registro
      </h1>
      <p className="text-slate-400 text-sm">
        Listado y gestión de escrituras para seguimiento notarial.
      </p>

      {/* Acá va tu tabla y buscador */}
    </div>
    )
}