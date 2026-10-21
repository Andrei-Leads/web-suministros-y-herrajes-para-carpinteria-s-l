import type { ReactNode } from "react";

/**
 * Columna de lectura de 68ch para los textos legales de core (no se puede tocar core).
 * El <article> de core ya trae px-6 y mx-auto max-w-3xl: el envoltorio lo estrecha y los
 * selectores de descendiente ponen la tipografía del template (h1 900 en tinta, h2 de 20 px
 * con filete superior, cuerpo 17/27).
 */
export function LecturaLegal({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[calc(68ch+3rem)] text-[17px] leading-[27px] [&_article]:py-8 md:[&_article]:py-12 [&_h1]:font-black [&_h1]:text-tinta [&_h1]:text-balance [&_h2]:mt-6 [&_h2]:border-t [&_h2]:border-linea [&_h2]:pt-5 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-tinta [&_a]:text-primario">
      {children}
    </div>
  );
}
