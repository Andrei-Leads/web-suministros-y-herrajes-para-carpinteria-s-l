/** Clases compartidas entre secciones y páginas (escala tipográfica de la spec §3.2). */

/** Padding de sección de contenido: 110 px arriba / 70 px abajo en escritorio. */
export const seccion = "pt-[clamp(56px,8vw,110px)] pb-[clamp(48px,5vw,70px)]";

/** Titular «display»: h2 de 60 px, peso 900, tinta (51 · 45 · 36 px según ancho). */
export const display =
  "m-0 text-[clamp(2.125rem,1.4rem+3vw,3.75rem)] leading-[1.05] font-black tracking-[0.01em] text-tinta text-balance";

/** Variante 700 del display (h2 «Nuestra gama…» y h1 de la banda CTA). */
export const display700 =
  "m-0 text-[clamp(2rem,1.4rem+2.8vw,3.75rem)] leading-[1.1] font-bold text-tinta text-balance";

/** Antetítulo de sección: el «h3» de marca de Cerda (40 px, 700). Se pinta como <p> o como h2/h3 según la jerarquía. */
export const antetitulo =
  "m-0 text-[clamp(1.5rem,1.1rem+1.8vw,2.5rem)] leading-[1.05] font-bold text-primario text-balance";

/** Párrafo destacado (el h4 de Cerda): 20/24, peso 500, tinta. */
export const destacado = "m-0 text-[18px] leading-[1.45] font-medium text-tinta md:text-xl md:leading-[1.4]";

/** Cuerpo de bloque: 17/27, alineado a la izquierda (Cerda justifica; la spec recomienda no hacerlo). */
export const cuerpo = "m-0 text-base leading-[1.65] text-texto md:text-[17px] md:leading-[27px] text-pretty";

/** Enlaces del menú (Raleway 600 en mayúsculas, sustituye a Orbitron). */
export const menuTexto = "text-[15px] font-semibold tracking-[0.06em] uppercase";

/** Clases de la nav de migas (ver components/Migas.tsx). */
export const migas = {
  nav: "text-sm text-texto",
  lista: "m-0 flex list-none flex-wrap items-center p-0",
  item: "flex items-center",
  enlace: "inline-flex min-h-11 items-center text-tinta underline underline-offset-4 hover:text-primario",
  actual: "inline-flex min-h-11 items-center text-texto",
} as const;
