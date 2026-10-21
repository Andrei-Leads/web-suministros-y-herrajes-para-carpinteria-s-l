import type { SiteConfig, Servicio, Trabajo } from "@andrei-leads/core";

export const MENSAJE_GENERICO = "Hola, os escribo desde vuestra web.";

/** Página 404 (app/not-found.tsx). */
export const MENSAJE_NO_ENCONTRADA = "Hola, buscaba una página en vuestra web y no la encontré.";

/** «Mándanos foto de la pieza»: diapositiva 2 del hero y banda CTA final. */
export const MENSAJE_FOTO = "Hola, os mando una foto de la pieza que necesito:";

/** Asunto del email cuando no hay WhatsApp y el CTA cae al correo. */
export const ASUNTO_FOTO = "Foto de una pieza";

/** Inicio, cabecera, barra móvil y contacto. */
export function mensajeGeneral(contacto: Pick<SiteConfig["contacto"], "mensajeWhatsapp">): string {
  return contacto.mensajeWhatsapp ?? MENSAJE_GENERICO;
}

/** /servicios/[slug] (página de familia). */
export function mensajeServicio(servicio: Pick<Servicio, "titulo" | "mensajeWhatsapp">): string {
  return servicio.mensajeWhatsapp ?? `Hola, quiero precio de ${servicio.titulo}. Os mando foto de la pieza:`;
}

/** /trabajos/[slug]. */
export function mensajeTrabajo(trabajo: Pick<Trabajo, "titulo">): string {
  return `Hola, he visto «${trabajo.titulo}» en vuestra web y quería preguntaros:`;
}

/** `mailto:` con asunto, para el CTA «mándanos foto» sin WhatsApp. */
export function mailtoFoto(email: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(ASUNTO_FOTO)}`;
}
