"use client";
import { useState } from "react";
import { recuperarFactura } from "../api/api";

export default function useRecuperarFactura() {
  const [error, setError] = useState<Error | null>(null);
  const handlePdf = async (idVendedor: number, fechaCorte: string, factura: string) => {
    const fechaFilter = fechaCorte.split("-");

    const blob = await recuperarFactura(idVendedor, fechaFilter[0] + "-" + fechaFilter[1], factura);

    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return {
    error,
    setError,
    handlePdf,
  };
}
