import type { SiteConfig } from "@andrei-leads/core";

export type Paso = { titulo: string; texto: string };

/**
 * «Cómo trabajamos» por defecto cuando `proceso` está vacío (spec §5.1 S5).
 * Textos genéricos de cualquier almacén de recambios: sin cifras, plazos ni marcas.
 */
export const PASOS_POR_DEFECTO: Paso[] = [
  {
    titulo: "Mándanos una foto",
    texto: "Haz una foto de la pieza rota o de la etiqueta y envíanosla. Te decimos si la tenemos.",
  },
  {
    titulo: "La identificamos en el mostrador",
    texto: "Tráenos la pieza vieja y la comparamos con lo que hay en el almacén.",
  },
  {
    titulo: "Atención a profesionales",
    texto: "Carpinteros, instaladores y comunidades: preparamos pedidos completos y por obra.",
  },
  {
    titulo: "Listo para recoger",
    texto: "Si la pieza está en stock, te la apartamos para que pases a por ella.",
  },
];

/** `proceso` del cliente (≤ 6) o, si está vacío, los pasos por defecto. */
export function pasosProceso(proceso: SiteConfig["proceso"]): Paso[] {
  return proceso.length > 0 ? proceso : PASOS_POR_DEFECTO;
}
