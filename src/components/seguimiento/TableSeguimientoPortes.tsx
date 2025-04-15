"use client";
import { useEffect, useState } from "react";
import { ISeguimientoPortes } from "@/lib/types";
import useRecuperarFactura from "@/lib/hooks/useRecuperarFactura";
import { sortByProperty, NumberFormatter } from "@/lib/utils";

export default function TableSeguimientoPortes(props: { portes: ISeguimientoPortes[] }) {
  const { handlePdf } = useRecuperarFactura();
  const { portes } = props;
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const [sortedList, setSortedList] = useState(portes);
  const [sortDirections, setSortDirections] = useState(sortDirectionsKeys);

  useEffect(() => {
    setSortedList(portes);
  }, [portes]);

  const handleSort = (property: keyof TablaSeguimientoPortesSortDirections) => {
    const newSortDirection = !sortDirections[property];
    setSortedList(sortByProperty(property, newSortDirection, portes));
    setSortDirections({ ...sortDirections, [property]: newSortDirection });
  };

  const toggleFacturas = (index: number) => {
    setExpandedRows({ ...expandedRows, [index]: !expandedRows[index] });
  };

  return (
    <table className="text-left text-gray-500 table-auto m-auto">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
        <tr className="text-center">
          <th scope="col" className="px-2 py-1 hover:cursor-pointer hover:text-blue-500 font-bold">
            Idx
          </th>
          <th
            scope="col"
            className="px-2 py-1 hover:cursor-pointer hover:text-blue-500 font-bold min-w-[150px]"
            onClick={() => handleSort("idVendedor")}
          >
            N° Vendedor
          </th>
          <th
            scope="col"
            className="px-2 py-1 hover:cursor-pointer hover:text-blue-500 font-bold"
            onClick={() => handleSort("vendedor")}
          >
            Vendedor
          </th>
          <th
            scope="col"
            className="px-2 py-1 hover:cursor-pointer hover:text-blue-500 font-bold"
            onClick={() => handleSort("numeroDeCuenta")}
          >
            Cuenta
          </th>
          <th
            scope="col"
            className="px-2 py-1 hover:cursor-pointer hover:text-blue-500 font-bold"
            onClick={() => handleSort("razonSocial")}
          >
            Razon Social
          </th>
          <th
            scope="col"
            className="px-2 py-1 hover:cursor-pointer hover:text-blue-500 font-bold min-w-[150px]"
            onClick={() => handleSort("subTotal")}
          >
            Facturas
          </th>
          <th
            scope="col"
            className="px-2 py-1 hover:cursor-pointer hover:text-blue-500 font-bold"
            onClick={() => handleSort("fechaDeFacturacion")}
          >
            Facturación
          </th>
          <th
            scope="col"
            className="px-2 py-1 hover:cursor-pointer hover:text-blue-500 font-bold"
            onClick={() => handleSort("kilos")}
          >
            Contenido
          </th>
          <th
            scope="col"
            className="px-2 py-1 hover:cursor-pointer hover:text-blue-500 font-bold"
            onClick={() => handleSort("estado")}
          >
            Embalado
          </th>
          <th
            scope="col"
            className="px-2 py-1 hover:cursor-pointer hover:text-blue-500 font-bold"
            onClick={() => handleSort("despachante")}
          >
            Transporte
          </th>
          <th
            scope="col"
            className="px-2 py-1 hover:cursor-pointer hover:text-blue-500 font-bold"
            onClick={() => handleSort("redespachante")}
          >
            Redespachante
          </th>
          <th
            scope="col"
            className="px-2 py-1 hover:cursor-pointer hover:text-blue-500 font-bold"
            onClick={() => handleSort("diaEntregaTransporte")}
          >
            Fecha Entrega
          </th>
        </tr>
      </thead>
      <tbody className="text-xs">
        {sortedList.map((porte, index) => (
          <tr key={index} className="odd:bg-white even:bg-gray-100 border-b border-gray-200">
            <td className="px-2 py-1 text-center font-medium text-gray-900">{index + 1}</td>
            <td className="px-2 py-1 text-center font-medium text-gray-900">{porte.idVendedor}</td>
            <td className="px-2 py-1 text-center font-medium text-gray-900">{porte.vendedor}</td>

            <td className="px-2 py-1 text-center">{porte.numeroDeCuenta}</td>
            <td className="px-2 py-1">{porte.razonSocial}</td>
            <td className="px-2 py-1 text-center">
              <p className="font-bold text-blue-900">
                {NumberFormatter.convertirAMonedaConPuntos(porte.subTotal)} + IVA
              </p>
              <button onClick={() => toggleFacturas(index)} className="text-blue-600 hover:underline">
                {expandedRows[index] ? "Ocultar" : "Mostrar"}
              </button>
              {expandedRows[index] && (
                <div>
                  {porte.facturas.map((factura, facturaIndex) => (
                    <a
                      key={facturaIndex}
                      onClick={() => handlePdf(porte.idVendedor, porte.fechaDeFacturacion, factura)}
                      className="block hover:cursor-pointer hover:text-blue-600"
                    >
                      {factura}
                    </a>
                  ))}
                </div>
              )}
            </td>
            <td className="px-2 py-1 text-center">
              <div>
                {porte.fechaDeFacturacion === null ? null : (
                  <>
                    <p className="font-bold text-center text-green-500">FACTURADO</p>
                    <p>{porte.fechaDeFacturacion.split("-").reverse().join("-")}</p>
                    <p>{porte.horaDeFacturacion}</p>
                  </>
                )}
              </div>
            </td>
            <td className="px-2 py-1">
              {porte.m3 === 0 ? null : (
                <div>
                  {porte.pallets > 0 ? <p>PALLETS: {porte.pallets}</p> : null}
                  {porte.bultos > 0 ? <p>BULTOS: {porte.bultos}</p> : null}
                  <p>KILOS: {porte.kilos}</p>
                  <p>M3: {porte.m3}</p>
                </div>
              )}
            </td>
            <td className="px-2 py-1 text-center">
              <p className={`${ColorEstado(porte.estado)} font-bold`}>
                {porte.estado == "FACTURADO" ? "" : porte.estado}
              </p>
              {porte.estado === "FINALIZADO" ? (
                <>
                  <p>{porte.fechaEnvio.split("-").reverse().join("-")}</p>
                  <p>{porte.hora}</p>
                </>
              ) : null}
            </td>
            <td className="px-2 py-1">{porte.despachante}</td>
            <td className="px-2 py-1">{porte.redespachante}</td>
            <td className="px-2 py-1 text-center">
              {porte.diaEntregaTransporte === null ? null : (
                <>
                  <p className="font-bold text-center text-green-500">ENTREGADO</p>
                  <p>{porte.diaEntregaTransporte.split("-").reverse().join("-")}</p>
                  <p>{porte.horaEntregaTransporte}</p>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ColorEstado(estado: string) {
  switch (estado) {
    case "FINALIZADO":
      return "text-green-500";
    case "FACTURADO":
      return "text-red-500";
    case "COMENZADO":
      return "text-yellow-500";
    default:
      return "";
  }
}

const sortDirectionsKeys = {
  idVendedor: true,
  vendedor: true,
  razonSocial: true,
  fechaDeFacturacion: true,
  numeroDeCuenta: true,
  fechaEnvio: true,
  diaEntregaTransporte: true,
  kilos: true,
  subTotal: true,
  despachante: true,
  redespachante: true,
  estado: true,
};

type TablaSeguimientoPortesSortDirections = {
  idVendedor: boolean;
  vendedor: boolean;
  razonSocial: boolean;
  fechaDeFacturacion: boolean;
  numeroDeCuenta: boolean;
  fechaEnvio: boolean;
  diaEntregaTransporte: boolean;
  kilos: boolean;
  subTotal: boolean;
  despachante: boolean;
  redespachante: boolean;
  estado: boolean;
};
