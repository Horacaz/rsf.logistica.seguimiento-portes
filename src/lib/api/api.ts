const BASE_URL = process.env.BASE_URL;

export async function getSeguimientoPortes<T>(idVendedor: number, fechaCorte: string): Promise<T> {
  const baseUrl = `${BASE_URL}/SeguimientoPortes?idVendedor=${idVendedor}&fechaCorte=${fechaCorte}`;
  const response = await fetch(baseUrl, {
    method: "GET",
  });

  return await response.json();
}

export async function getSeguimientoPortesActuales<T>(fechaCorte: string): Promise<T> {
  const baseUrl = `${BASE_URL}/SeguimientoPortes/Actuales?fechaCorte=${fechaCorte}`;
  const response = await fetch(baseUrl, {
    method: "GET",
  });

  return await response.json();
}

export async function getClientesPorVendedor<T>(idVendedor: number): Promise<T> {
  const baseUrl = `${BASE_URL}/Deudores/clientesPorVendedor?idVendedor=${idVendedor}`;
  const response = await fetch(baseUrl, {
    method: "GET",
  });

  return await response.json();
}

export async function recuperarFactura(idVendedor: number, fecha: string, factura: string) {
  const baseUrl = `${BASE_URL}/SeguimientoPortes/RecuperarFactura?idVendedor=${idVendedor}&fecha=${fecha}&factura=${factura}`;
  const response = await fetch(baseUrl, {
    method: "GET",
  });

  return response.blob();
}
