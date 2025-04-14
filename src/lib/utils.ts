import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class NumberFormatter {
  static convertirAMonedaConPuntos = (numero: number) => {
    const formatter = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });

    return formatter.format(numero);
  };

  static removerSignoMonetario = (numero: string) => {
    const stringRemovePeso = numero.replaceAll("$", "");
    const stringRemoveDots = stringRemovePeso.replaceAll(".", "");
    return Number(stringRemoveDots);
  };

  static convertirATendenciaDecimales = (numero: number) => {
    const numeroString = numero.toString();
    if (numeroString.length === 1) {
      return numeroString + ".00";
    }

    if (numeroString.length === 3) {
      return numeroString + "0";
    }

    return numeroString;
  };
}

export function sortByProperty<T>(property: string, sortDirection: boolean, list: T[]) {
  const getValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  };

  const sortedList = list.sort((a, b) => {
    const valueA = getValue(a, property);
    const valueB = getValue(b, property);

    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return sortDirection ? 1 : -1;
    if (valueB == null) return sortDirection ? -1 : 1;

    if (valueA > valueB) {
      return sortDirection ? -1 : 1;
    } else if (valueA < valueB) {
      return sortDirection ? 1 : -1;
    } else {
      return 0;
    }
  });

  return sortedList;
}
