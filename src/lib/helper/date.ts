export const formatFecha = (fechaStr: string | null | undefined): string => {
    if (!fechaStr) return '-';
  
    // Si la fecha incluye hora (T00:00:00), cortamos solo la parte YYYY-MM-DD
    const soloFecha = fechaStr.split('T')[0];
    const partes = soloFecha.split('-');
  
    if (partes.length !== 3) return '-';
  
    const [anio, mes, dia] = partes;
    return `${dia}/${mes}/${anio}`;
  };