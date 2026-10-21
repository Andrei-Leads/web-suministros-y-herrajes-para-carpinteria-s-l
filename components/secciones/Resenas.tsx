import type { Resena, SiteConfig } from "@andrei-leads/core";
import { ArrowUpRight } from "lucide-react";

import { SeparadorDoble } from "@/components/Decorados";
import { antetitulo } from "@/lib/estilos";
import { estrellas, fechaLegible, mediaVisible } from "@/lib/formato";

type Props = {
  resenas: Resena[];
  valoracion?: SiteConfig["valoracion"];
  fichaGoogle?: string;
  max?: number;
};

/**
 * Reseñas (no están en la spec de Cerda; el scraper de leads las trae y la demo debe verse completa
 * con ellas). Sobrias: tarjetas #f9f9f9 con el radio de firma 40/0/40/0. Vacías: nada.
 */
export function Resenas({ resenas, valoracion, fichaGoogle, max = 3 }: Props) {
  if (resenas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-resenas" className="py-[clamp(48px,6vw,90px)]">
      <div className="contenedor flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 id="titulo-resenas" className={antetitulo}>
            Lo que dicen nuestros clientes
          </h2>
          {valoracion && (
            <p className="m-0 text-lg font-bold text-tinta">
              <span aria-hidden="true" className="mr-2 text-primario">
                {estrellas(valoracion.media)}
              </span>
              {mediaVisible(valoracion.media)} de 5 · {valoracion.total} opiniones en Google
            </p>
          )}
          <SeparadorDoble />
        </div>
        <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-3">
          {resenas.slice(0, max).map((r) => (
            <li key={`${r.autor}-${r.texto.slice(0, 20)}`} className="flex flex-col gap-3 rounded-[40px_0_40px_0] bg-tarjeta p-7">
              <p className="m-0 text-primario">
                <span aria-hidden="true">{estrellas(r.puntuacion)}</span>
                <span className="sr-only">{r.puntuacion} de 5</span>
              </p>
              <blockquote className="m-0 text-base leading-[1.6] text-tinta">«{r.texto}»</blockquote>
              <p className="m-0 mt-auto text-sm font-bold text-tinta">
                {r.autor}
                {r.fecha && <span className="font-normal text-texto"> · {fechaLegible(r.fecha)}</span>}
              </p>
            </li>
          ))}
        </ul>
        {fichaGoogle && (
          <a href={fichaGoogle} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 self-start font-bold text-tinta underline underline-offset-4 hover:text-primario">
            Ver todas las opiniones en Google
            <ArrowUpRight aria-hidden="true" strokeWidth={2} className="size-4" />
          </a>
        )}
      </div>
    </section>
  );
}
