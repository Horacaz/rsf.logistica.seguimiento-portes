"use client";
import Loading from "@/components/seguimiento/Loading";
import useSeguimientoPortes from "@/lib/hooks/useSeguimientoPortes";
import TableSeguimientoPortes from "@/components/seguimiento/TableSeguimientoPortes";
import { useState } from "react";

export default function Page() {
  const { loading, seguimientoPortes, selectedDate, setSelectedDate } = useSeguimientoPortes();

  const [fecha, setFecha] = useState<string>(selectedDate);

  if (loading) {
    return <Loading loading={loading} />;
  }

  if (seguimientoPortes) {
    return (
      <div className="flex flex-col gap-4">
        <main className="max-w-6xl mx-auto my-2 p-6">
          <h2 className="m-2 p-2 text-2xl font-extrabold text-center">Seguimiento de Despachos</h2>
          <div className="rounded bg-gray-50 border-b border-gray-200 my-2 p-2 flex items-center">
            <div className="ms-auto">
              <label className="font-bold ml-4">Filtrar a partir de</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="mx-2 p-1 border border-gray-300 text-gray-900 text-sm rounded-lg"
              />
              <button
                className="mx-2 p-1 bg-blue-500 font-bold border border-gray-300 text-white text-sm rounded-lg"
                onClick={() => setSelectedDate(fecha)}
              >
                Confirmar
              </button>
            </div>
          </div>
          <TableSeguimientoPortes portes={seguimientoPortes} />
        </main>
      </div>
    );
  }
}
