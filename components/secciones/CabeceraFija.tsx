"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A1 · Cabecera fija. Blanca de 90 px (72 px por debajo de 1240 px); al pasar su altura con el
 * scroll pasa a `fixed`, baja a 60 px, fondo blanco al 80 % con desenfoque y sombra, y entra desde
 * arriba en 300 ms. Al volver arriba se quita sin animación (como el original).
 *
 * Un centinela de 1 px al final del hueco de la cabecera, observado con IntersectionObserver, pone
 * `data-fija`. El hueco conserva la altura, así el contenido no salta. Sin JavaScript, la cabecera
 * se queda arriba (no fija) y se ve igual.
 *
 * El contenido llega ya renderizado por el servidor (`children`): este archivo no importa nada de
 * core ni de site.config.
 */
export function CabeceraFija({ children }: { children: ReactNode }) {
  const centinela = useRef<HTMLDivElement>(null);
  const [fija, setFija] = useState(false);

  useEffect(() => {
    const el = centinela.current;
    if (!el) return;
    const observador = new IntersectionObserver(([entrada]) => {
      setFija(!entrada.isIntersecting && entrada.boundingClientRect.top < 0);
    });
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <div className="relative z-30 h-[72px] ancho:h-[90px]">
      <header
        data-fija={fija ? "" : undefined}
        className="group/cab absolute inset-x-0 top-0 h-full bg-superficie data-fija:fixed data-fija:h-[60px] data-fija:bg-white/80 data-fija:shadow-cabecera data-fija:backdrop-blur-md motion-safe:data-fija:animate-cabecera"
      >
        {children}
      </header>
      <div ref={centinela} aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-px" />
    </div>
  );
}
