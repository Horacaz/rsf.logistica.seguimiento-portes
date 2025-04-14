"use client";
import { useEffect, useState } from "react";

import ISeguimientoPortes from "../types";
import { getSeguimientoPortesActuales } from "../api/api";

export default function useSeguimientoPortes() {
  const [loading, setLoading] = useState(true);
  const [seguimientoPortes, setSeguimientoPortes] = useState<ISeguimientoPortes[] | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const fechaActual = new Date();
    return `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, "0")}-${String(fechaActual.getDate()).padStart(2, "0")}`;
  });

  useEffect(() => {
    async function obtenerSeguimientoPortes(fechaCorte: string) {
      try {
        setLoading(true);
        const seguimientoPortes = await getSeguimientoPortesActuales<ISeguimientoPortes[]>(fechaCorte);
        setSeguimientoPortes(seguimientoPortes);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    }

    if (selectedDate) {
      obtenerSeguimientoPortes(selectedDate);
    }
  }, [, selectedDate]);

  return {
    seguimientoPortes,
    loading,
    selectedDate,
    setSelectedDate,
  };
}

type Cliente = {
  cuenta: string;
};
