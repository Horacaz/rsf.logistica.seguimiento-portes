export interface ISeguimientoPortes {
  numeroDePorte: string;
  fechaDeFacturacion: string;
  horaDeFacturacion: string;
  subTotal: number;
  facturas: string[];
  numeroDeCuenta: string;
  razonSocial: string;
  idVendedor: number;
  vendedor: string;
  kilos: number;
  bultos: number;
  gravado: number;
  pallets: number;
  m3: number;
  hora: string;
  fechaEnvio: string;
  diaEntregaTransporte: string;
  horaEntregaTransporte: string;
  despachante: string;
  redespachante: string;
  estado: string;
}

export interface IVendedor {
  id: number;
  nombre: string;
}

export interface ICliente {
  cuenta: string;
  razonSocial: string;
  viajante: number;
}

export interface ITransporte{
  nombre: string;
}