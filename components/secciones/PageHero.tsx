import Image from "next/image";
import type { Imagen } from "@andrei-leads/core";

import { EtiquetaEjemplo, esDeEjemplo } from "@/components/Foto";
import { TrazoBajoHero } from "@/components/Decorados";

type Props = {
  titulo: string;
  imagen?: Imagen;
};

/**
 * P1 · Hero de página interior (Productos, Sobre nosotros, Contacto): foto a sangre de 500 px con
 * velo negro al 50 % y el h1 centrado (80 px, 700, blanco), un poco por debajo del centro.
 * A9: Ken Burns sobre la foto (solo transform; se pinta en el primer frame).
 * A10: barrido de un bloque de marca que deja el título a la vista (solo se anima el ::after).
 * Debajo, el trazo tinta de 3 × 40 px.
 */
export function PageHero({ titulo, imagen }: Props) {
  return (
    <>
      <section className="foco-blanco relative isolate flex min-h-[260px] items-center justify-center overflow-hidden bg-tinta md:h-[500px]">
        {imagen && (
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image
              src={imagen.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover motion-safe:animate-kenburns"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        {imagen && esDeEjemplo(imagen) && <EtiquetaEjemplo posicion="abajo-derecha" />}
        <h1 className="contenedor m-0 pt-[clamp(24px,7vw,68px)] pb-6 text-center text-[clamp(2.5rem,1.4rem+4.6vw,5rem)] leading-[1.05] font-bold text-white text-balance">
          <span className="titulo-barrido">{titulo}</span>
        </h1>
      </section>
      <TrazoBajoHero />
    </>
  );
}
