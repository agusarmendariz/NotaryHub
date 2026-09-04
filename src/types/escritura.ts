export type EstadoEscritura = 'PENDIENTE_INGRESO' | 'EN_REGISTRO' | 'EN_STOCK' | 'RETIRADA';
export type CondicionRegistral = 'DEFINITIVA' | 'CONDICIONAL'| 'NO_APLICA';

export interface Escritura {
    id: string;
    numeroEscritura: string;
    anio: number;
    partes:string;
    tipoActo:string;
    matriculaInmueble:string;

    //estado
    estado: EstadoEscritura;
    condicionRegistral: CondicionRegistral;
    motivoObservacion?: string;
    fechaVencimientoCondicional?: string;

    //fechas
    fechaFirma:string;
    fechaIngresoRegistro?:string;
    fechaSalidaRegistro?:string;
    fechaEntrega?:string;

}