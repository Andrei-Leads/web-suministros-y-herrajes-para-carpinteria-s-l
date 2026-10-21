import type { SiteConfig } from "@andrei-leads/core";
import type { Ancla } from "./formato";

export type ItemMenu = Ancla & { hijos?: Ancla[] };

/** /trabajos existe si hay trabajos o, al menos, fotos en la galería. */
export function hayTrabajos(config: Pick<SiteConfig, "trabajos" | "galeria">): boolean {
  return config.trabajos.length > 0 || config.galeria.length > 0;
}

/**
 * Menú de cabecera, menú lateral y pie (spec §2): INICIO · SOBRE NOSOTROS · PRODUCTOS (con las
 * familias en desplegable) · GALERÍA (solo si existe /trabajos) · CONTACTO.
 * Las rutas son las fijas del kit; solo cambian las etiquetas.
 */
export function menu(config: Pick<SiteConfig, "trabajos" | "galeria" | "servicios">): ItemMenu[] {
  const items: ItemMenu[] = [
    { href: "/", texto: "Inicio" },
    { href: "/empresa", texto: "Sobre nosotros" },
    {
      href: "/servicios",
      texto: "Productos",
      hijos: config.servicios.map((s) => ({ href: `/servicios/${s.slug}`, texto: s.titulo })),
    },
  ];
  if (hayTrabajos(config)) items.push({ href: "/trabajos", texto: "Galería" });
  items.push({ href: "/contacto", texto: "Contacto" });
  return items;
}
