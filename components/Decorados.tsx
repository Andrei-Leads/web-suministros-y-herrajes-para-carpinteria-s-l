import { cn } from "@/lib/utils";

/*
 * Rasgos de firma del diseño hechos con CSS (spec §6, «no son imágenes»). Todos decorativos.
 */

/** Separador doble horizontal: barra tinta de 55 × 3 px pegada a una línea gris de 1 px (190 px en total). */
export function SeparadorDoble({ className, centrado }: { className?: string; centrado?: boolean }) {
  return (
    <div aria-hidden="true" className={cn("flex w-[190px] items-end", centrado && "mx-auto", className)}>
      <span className="h-[3px] w-[55px] bg-tinta" />
      <span className="h-px flex-1 bg-black/20" />
    </div>
  );
}

/** Separador vertical (home S8): línea gris de 1 px y tramo inferior tinta de 3 × 50 px. */
export function SeparadorVertical({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("mx-auto flex h-[150px] w-[3px] flex-col items-center md:h-[190px]", className)}>
      <span className="w-px flex-1 bg-black/25" />
      <span className="h-[50px] w-[3px] bg-tinta" />
    </div>
  );
}

/** Trazo tinta de 3 × 40 px centrado bajo el PageHero (el tramo inferior del separador vertical). */
export function TrazoBajoHero() {
  return <div aria-hidden="true" className="mx-auto h-10 w-[3px] bg-tinta" />;
}

/**
 * Letra gigante tramada de puntos detrás de los titulares, cortada por el borde izquierdo.
 * El padre debe ser `relative` con `overflow-hidden` (o `overflow-x-clip`) para no desbordar.
 */
export function LetraTramada({ letra, className }: { letra: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "letra-tramada pointer-events-none absolute top-1/2 -left-[4%] z-0 -translate-y-1/2 text-[18rem] leading-none font-black uppercase opacity-90 select-none md:text-[30rem] lg:text-[38rem]",
        className
      )}
    >
      {letra}
    </span>
  );
}
