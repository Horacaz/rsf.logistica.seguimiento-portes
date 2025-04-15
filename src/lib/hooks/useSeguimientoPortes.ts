"use client";
import { useEffect, useState } from "react";
import { ISeguimientoPortes, IVendedor, ICliente, ITransporte } from "../types";
import { getCommonsListaClientes, getCommonsListaVendedores, getSeguimientoPortesActuales, getCommonsListaTransportes } from "../api/api";

export default function useSeguimientoPortes() {
  const [loading, setLoading] = useState(true);
  const [seguimientoPortes, setSeguimientoPortes] = useState<ISeguimientoPortes[] | null>(null);
  const [displayPortes, setDisplayPortes] = useState<ISeguimientoPortes[] | null>(null);
  
  const [selectedVendedor, setSelectedVendedor] = useState<string>("");
  const [selectedCliente, setSelectedCliente] = useState<string>("");
  const [selectedTransporte, setSelectedTransporte] = useState<string>("");
  
  const [clientes, setClientes] = useState<ICliente[] | null>(null);
  const [vendedores, setVendedores] = useState<IVendedor[] | null>(null);
  const [transportes, setTransportes] = useState<ITransporte[] | null>(null);

  const [selectedDate, setSelectedDate] = useState(() => {
    const fechaActual = new Date();
    return `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, "0")}-${String(fechaActual.getDate()).padStart(2, "0")}`;
  });

  useEffect(() => {
    async function obtenerSeguimientoPortes(fechaCorte: string) {
      try {
        setLoading(true);

        const seguimientoPortes = await getSeguimientoPortesActuales<ISeguimientoPortes[]>(fechaCorte);
        const clientes = await getCommonsListaClientes<ICliente[]>();
        const vendedores = await getCommonsListaVendedores<IVendedor[]>();
        const transportes = await getCommonsListaTransportes<ITransporte[]>();

        setClientes(clientes);
        setTransportes(transportes)
        setVendedores(vendedores);
        setSeguimientoPortes(seguimientoPortes);
        setDisplayPortes(seguimientoPortes);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    }

    if (selectedDate) {
      obtenerSeguimientoPortes(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!seguimientoPortes) return;
  
    let filtered = seguimientoPortes;
  
    if (selectedTransporte) {
      filtered = filtered.filter((x) => x.despachante === selectedTransporte);
    }

    if (selectedVendedor) {
      filtered = filtered.filter((x) => x.idVendedor === Number(selectedVendedor));
    }
  
    if (selectedCliente) {
      filtered = filtered.filter((x) => x.numeroDeCuenta === selectedCliente);
    }
  
    setDisplayPortes(filtered);
  }, [seguimientoPortes, selectedCliente, selectedVendedor, selectedTransporte]);

  return {
    displayPortes,
    loading,
    selectedCliente,
    selectedVendedor,
    selectedTransporte,
    vendedores,
    transportes,
    clientes,
    selectedDate,
    setSelectedDate,
    setSelectedCliente,
    setSelectedTransporte,
    setSelectedVendedor,
  };
}
