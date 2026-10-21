import type { SiteConfig } from "@andrei-leads/core";

type Contacto = Pick<SiteConfig["contacto"], "coordenadas" | "direccion">;

/**
 * Enlace «Cómo llegar» a Google Maps (Specs §5). Siempre un enlace: nunca
 * iframe ni captura de mapa, así no hay cookies de terceros.
 */
export function urlComoLlegar({ coordenadas, direccion }: Contacto): string {
  const base = "https://www.google.com/maps/dir/?api=1&destination=";
  if (coordenadas) return base + `${coordenadas.lat},${coordenadas.lng}`;
  const { calle, cp, ciudad, provincia } = direccion;
  return base + encodeURIComponent(`${calle}, ${cp} ${ciudad}, ${provincia}`);
}
