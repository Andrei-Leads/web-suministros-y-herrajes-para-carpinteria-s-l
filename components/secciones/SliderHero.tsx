"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

/** Tiempo por diapositiva. Cerda usa 4000 ms; aquí 6000 para que dé tiempo a leer tras la entrada (2 s). */
const INTERVALO = 6000;

/**
 * A5 · Slider del hero de inicio. Diapositivas apiladas en la misma celda de rejilla (la altura es la
 * de la más alta) que cambian con un fundido de 700 ms.
 * - La 1.ª sale del servidor en su estado final y sin animación de entrada (LCP). Las entradas
 *   (A6 texto, A7 bodegón) solo corren al rotar: la diapositiva activa recibe `data-animar`.
 * - La inactiva lleva `inert` (fuera del orden de tabulación y del lector de pantalla).
 * - Se pausa con la pestaña oculta, con el foco dentro y con el botón de pausa (WCAG 2.2.2).
 *   Con «menos movimiento» no rota.
 * - A8: puntos cuadrados de 12 px, ocultos por debajo de 768 px.
 *
 * Las diapositivas llegan renderizadas por el servidor: este archivo no importa core ni site.config.
 */
export function SliderHero({ diapositivas }: { diapositivas: ReactNode[] }) {
  const n = diapositivas.length;
  const [activa, setActiva] = useState(0);
  const [animar, setAnimar] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [foco, setFoco] = useState(false);

  useEffect(() => {
    if (n < 2 || pausado || foco) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setAnimar(true);
      setActiva((a) => (a + 1) % n);
    }, INTERVALO);
    return () => window.clearInterval(id);
  }, [n, pausado, foco]);

  function ir(i: number) {
    setAnimar(true);
    setActiva(i);
  }

  return (
    <div
      className="relative"
      onFocus={() => setFoco(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFoco(false);
      }}
    >
      <div className="grid">
        {diapositivas.map((d, i) => {
          const esActiva = i === activa;
          return (
            <div
              key={i}
              data-activa={esActiva ? "" : undefined}
              data-animar={esActiva && animar ? "" : undefined}
              inert={!esActiva}
              className="group/slide col-start-1 row-start-1 opacity-0 transition-opacity duration-700 ease-in-out data-activa:z-[1] data-activa:opacity-100"
            >
              {d}
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <div className="absolute top-2 right-2 z-[2] flex items-center gap-[15px] md:top-auto md:right-auto md:bottom-[35px] md:left-1/2 md:-translate-x-1/2">
          <div className="hidden items-center gap-[15px] md:flex">
            {diapositivas.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-current={i === activa ? "true" : undefined}
                onClick={() => ir(i)}
                className="group flex size-6 cursor-pointer items-center justify-center"
              >
                <span className="block size-3 bg-neutral-500/50 transition-colors group-hover:bg-neutral-500 group-aria-[current]:bg-neutral-500" />
                <span className="sr-only">Diapositiva {i + 1}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPausado((p) => !p)}
            className="flex size-11 cursor-pointer items-center justify-center bg-white/70 text-tinta hover:bg-white md:size-8"
          >
            {pausado ? (
              <Play aria-hidden="true" strokeWidth={2} className="size-4" />
            ) : (
              <Pause aria-hidden="true" strokeWidth={2} className="size-4" />
            )}
            <span className="sr-only">{pausado ? "Reanudar" : "Pausar"} el carrusel</span>
          </button>
        </div>
      )}
    </div>
  );
}
