"use client";
import Loading from "@/components/seguimiento/Loading";
import useSeguimientoPortes from "@/lib/hooks/useSeguimientoPortes";
import TableSeguimientoPortes from "@/components/seguimiento/TableSeguimientoPortes";
import { useState } from "react";
import { ISeguimientoPortes } from "@/lib/types";

export default function Page() {
  const { loading, selectedCliente, selectedVendedor, selectedTransporte, transportes, displayPortes, selectedDate, vendedores, clientes, setSelectedDate, setSelectedCliente, setSelectedVendedor, setSelectedTransporte} = useSeguimientoPortes();

  const [fecha, setFecha] = useState<string>(selectedDate);

  if (loading) {
    return <Loading loading={loading} />;
  }

  if (displayPortes && vendedores && clientes && transportes) {
    return (
      <div className="flex flex-col">
        <main className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-extrabold text-center">Seguimiento de Despachos</h2>
          <div className="rounded bg-gray-50 border-b border-gray-200 flex items-center">
            <div className="flex items-center">
              <label className="font-bold ml-4 ">Filtrar a partir de</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="mx-2 p-1 border border-gray-300 text-gray-900 text-sm rounded-lg"
              />
              <button
                className="mx-2 p-1 bg-blue-500 font-bold  text-white text-sm rounded-lg hover:bg-blue-600 hover:cursor-pointer"
                onClick={() => setSelectedDate(fecha)}
              >
                Confirmar
              </button>
            </div>
            <div>
              <label className="font-bold ml-4">Vendedor</label>
              <select
                className="mx-2 p-1 border border-gray-300 text-gray-900 text-sm rounded-lg"
                value={selectedVendedor}
                onChange={(e) => setSelectedVendedor(e.target.value)}
              >
                <option value="">Todos</option>
                {vendedores.map((vendedor) => (
                  <option key={vendedor.id} value={vendedor.id}>
                    {vendedor.id} - {vendedor.nombre}
                  </option>
                ))}
              </select>
            </div>
            {selectedVendedor.length > 0 && (
              <div>
                <label className="font-bold ml-4">Cliente</label>
                <select
                  className="mx-2 p-1 border border-gray-300 text-gray-900 text-sm rounded-lg"
                  value={selectedCliente}
                  onChange={(e) => setSelectedCliente(e.target.value)}
                >
                  <option value="">Todos</option>
                  {clientes
                    .filter((x) => x.viajante === Number(selectedVendedor))
                    .map((cliente) => (
                      <option key={cliente.cuenta} value={cliente.cuenta}>
                        {cliente.cuenta}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div>
              <label className="font-bold ml-4">Transporte</label>
              <select
                className="mx-2 p-1 border border-gray-300 text-gray-900 text-sm rounded-lg"
                value={selectedTransporte}
                onChange={(e) => setSelectedTransporte(e.target.value)}
              >
                <option value="">Todos</option>
                {transportes.map((transporte) => (
                  <option key={transporte.nombre} value={transporte.nombre}>
                    {transporte.nombre}
                  </option>
                ))}
              </select>

            </div>
          </div>
          {displayPortes.length > 0 && (
          <SeguimientoDespachos portes={displayPortes} />
          )}
        </main>
          {displayPortes.length === 0 && (
            <div className="flex flex-col items-center">
              <h2 className="inline-block m-4 p-4 text-2xl font-extrabold text-center">No se encontraron resultados</h2>
            </div>
          )}
      </div>
    );
  }
}

function SeguimientoDespachos(props: { portes: ISeguimientoPortes[] }) {
  return <TableSeguimientoPortes portes={props.portes} />;
}
