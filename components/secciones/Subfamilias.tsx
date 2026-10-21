import Image from "next/image";
import { Package } from "lucide-react";

import { EtiquetaEjemplo, esDeEjemplo } from "@/components/Foto";
import type { Subfamilia } from "@/lib/catalogo";
import { display700 } from "@/lib/estilos";
import { cn } from "@/lib/utils";

/**
 * F2 · «Nuestra gama» + tarjetas de subfamilia (spec §5.3, rasgo de firma): fondo #f9f9f9, radio
 * asimétrico 40/0/40/0 y recorte de producto que sobresale por encima del borde superior (en
 * móvil, dentro de la tarjeta). Lista de referencias con viñeta de punto.
 * Hover propuesto: la tarjeta sube 4 px y el recorte gira -3° y crece un 5 %, en 300 ms.
 */
export function Subfamilias({ titulo, subfamilias }: { titulo: string; subfamilias: Subfamilia[] }) {
  if (subfamilias.length === 0) return null;
  return (
    <section aria-labelledby="titulo-gama" className="pt-[clamp(56px,10vw,180px)] pb-[clamp(56px,7vw,110px)]">
      <div className="contenedor">
        <h2 id="titulo-gama" className={cn(display700, "mx-auto max-w-[22ch] text-center")}>
          {titulo}
        </h2>
        <ul className="m-0 mt-12 grid list-none gap-x-[30px] gap-y-10 p-0 sm:grid-cols-2 md:mt-[100px] md:gap-y-[100px] lg:grid-cols-4">
          {subfamilias.map((s) => (
            <li
              key={s.titulo}
              className="group relative flex flex-col rounded-[40px_0_40px_0] bg-tarjeta px-[30px] pt-6 pb-[30px] transition-transform duration-300 ease-in-out motion-safe:hover:-translate-y-1 md:pt-[80px]"
            >
              <div className="relative mb-4 size-[130px] md:absolute md:-top-[70px] md:left-[22px] md:mb-0 md:size-[150px]">
                {s.imagen ? (
                  <>
                    <Image
                      src={s.imagen.src}
                      alt={s.imagen.alt}
                      fill
                      sizes="150px"
                      className="object-contain transition-transform duration-300 ease-in-out motion-safe:group-hover:scale-105 motion-safe:group-hover:-rotate-3"
                    />
                    {esDeEjemplo(s.imagen) && <EtiquetaEjemplo pequena />}
                  </>
                ) : (
                  <div className="flex size-full items-center justify-center text-primario">
                    <Package aria-hidden="true" strokeWidth={1.25} className="size-16" />
                  </div>
                )}
              </div>
              <h3 className="m-0 mt-6 text-[clamp(1.6rem,1.3rem+0.9vw,2.1rem)] leading-[1.1] font-bold break-words text-primario">
                {s.titulo}
              </h3>
              <ul className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0">
                {s.referencias.map((r) => (
                  <li key={r} className="flex items-baseline gap-[10px] text-[17px] leading-[1.35] text-texto-lista">
                    <span aria-hidden="true" className="size-[5px] flex-none -translate-y-[3px] rounded-full bg-texto-lista" />
                    {r}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
