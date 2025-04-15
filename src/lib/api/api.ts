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

export async function getCommonsListaVendedores<T>(): Promise<T> {
  const baseUrl = `${BASE_URL}/Commons/Vendedores`;
  const response = await fetch(baseUrl, {
    method: "GET",
  });

  return await response.json();
}

export async function getCommonsListaClientes<T>(): Promise<T> {
  const baseUrl = `${BASE_URL}/Commons/Clientes`;
  const response = await fetch(baseUrl, {
    method: "GET",
  });

  return await response.json();
}

export async function getCommonsListaTransportes<T>(): Promise<T> {
  const baseUrl = `${BASE_URL}/Commons/Transportes`;
  const response = await fetch(baseUrl, {
    method: "GET",
  });

  return await response.json();
}


export async function recuperarFactura(idVendedor: number, fecha: string, factura: string) {
  const baseUrl = `${BASE_URL}/RecuperarFactura?idVendedor=${idVendedor}&fecha=${fecha}&factura=${factura}`;
  const response = await fetch(baseUrl, {
    method: "GET",
  });

  return response.blob();
}
