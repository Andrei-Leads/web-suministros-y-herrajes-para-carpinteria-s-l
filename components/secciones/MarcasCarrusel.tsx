"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * S6 · «Marcas que distribuimos» (spec §5.1). El contrato solo trae nombres (`marcas: string[]`),
 * así que cada celda es el nombre en texto, nunca un logo inventado.
 * A13: carrusel sin librería — scroll-snap + flechas que desplazan un ancho visible (6 celdas en
 * escritorio, 4 en tableta, 2 en móvil). Sin bucle infinito ni autoplay (como el original).
 * A11: la sección entra desde arriba (-40 px) con opacidad en 1 s al verse. Solo empieza oculta
 * bajo `html.js`: sin JavaScript se ve.
 * A18: hover de celda con fondo negro al 5 %.
 */
export function MarcasCarrusel({ marcas }: { marcas: string[] }) {
  const seccion = useRef<HTMLElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);
  const [desborda, setDesborda] = useState(false);

  useEffect(() => {
    const el = seccion.current;
    if (!el) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    const ul = lista.current;
    if (!ul) return;
    const medir = () => setDesborda(ul.scrollWidth > ul.clientWidth + 1);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(ul);
    return () => ro.disconnect();
  }, []);

  function mover(sentido: 1 | -1) {
    const ul = lista.current;
    if (!ul) return;
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ul.scrollBy({ left: sentido * ul.clientWidth, behavior: reducir ? "auto" : "smooth" });
  }

  const flecha =
    "flex size-11 flex-none cursor-pointer items-center justify-center bg-[#f7f7f7] text-[#7d7d7d] transition-colors hover:bg-black/10 hover:text-tinta";

  return (
    <section
      ref={seccion}
      aria-labelledby="titulo-marcas"
      data-visible={visible ? "" : undefined}
      className="bg-superficie py-[clamp(40px,5vw,64px)] transition-[opacity,transform] duration-1000 ease-[ease] [.js_&]:-translate-y-10 [.js_&]:opacity-0 [.js_&]:data-visible:translate-y-0 [.js_&]:data-visible:opacity-100"
    >
      <div className="contenedor">
        <h2 id="titulo-marcas" className="m-0 text-[clamp(1.375rem,1.1rem+1vw,1.7rem)] leading-tight font-extrabold tracking-[0.02em] text-black uppercase">
          Marcas que trabajamos
        </h2>
        <div className="mt-6 flex items-center gap-2 md:mt-10">
          {desborda && (
            <button type="button" onClick={() => mover(-1)} className={flecha}>
              <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
              <span className="sr-only">Marcas anteriores</span>
            </button>
          )}
          <ul
            ref={lista}
            // Demo: con pocas marcas (no desborda), la fila va centrada en vez de pegada a la izquierda.
            className={cn(
              "m-0 flex min-w-0 flex-1 list-none snap-x snap-mandatory overflow-x-auto scroll-smooth p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              !desborda && "justify-center"
            )}
          >
            {marcas.map((m) => (
              <li
                key={m}
                className={cn(
                  "flex h-[120px] flex-none basis-1/2 snap-start items-center justify-center px-3 text-center transition-colors hover:bg-black/5 md:basis-1/4 lg:h-[220px] lg:basis-1/6"
                )}
              >
                <span className="text-lg leading-tight font-black tracking-[0.04em] text-[#5b6064] uppercase md:text-xl">{m}</span>
              </li>
            ))}
          </ul>
          {desborda && (
            <button type="button" onClick={() => mover(1)} className={flecha}>
              <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-5" />
              <span className="sr-only">Más marcas</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
