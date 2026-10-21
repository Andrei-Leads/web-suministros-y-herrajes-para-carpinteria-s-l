import Image from "next/image";
import Link from "next/link";
import type { Imagen } from "@andrei-leads/core";

import { EtiquetaEjemplo, esDeEjemplo } from "@/components/Foto";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  titulo: string;
  texto: string;
  href: string;
  /** Enlace externo (Google Maps): nueva pestaña. */
  externo?: boolean;
  imagen?: Imagen;
};

/**
 * N3 · «Trailer box» (spec §5.5): imagen de alto fijo (16:10) con el título blanco 800 centrado
 * abajo; debajo, un párrafo y «Más información». A16 (el hover más vistoso del sitio): velo negro
 * al 15 % y la franja del título se rellena con el color de marca en 300 ms.
 */
export function CajaTrailer({ titulo, texto, href, externo, imagen }: Props) {
  const contenido = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-tinta md:aspect-auto md:h-[350px]">
        {imagen && (
          <Image src={imagen.src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        )}
        <span aria-hidden="true" className="absolute inset-0 bg-black/15 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
        {imagen && esDeEjemplo(imagen) && <EtiquetaEjemplo pequena />}
        <h3 className="absolute inset-x-0 bottom-0 m-0 bg-gradient-to-t from-black/55 to-transparent px-[15px] pt-[27px] pb-[30px] text-center text-2xl leading-tight font-extrabold text-white transition-colors duration-300 ease-in-out [text-shadow:0_1px_4px_rgb(0_0_0/0.4)] group-hover:bg-primario group-hover:bg-none md:text-[30px]">
          {titulo}
        </h3>
      </div>
      <p className="m-0 mt-6 text-center text-base leading-[1.6] text-texto md:text-[17px]">{texto}</p>
      <span className="mt-auto pt-6 text-center">
        <span className={cn(buttonVariants({ variant: "principal" }), "min-h-11 px-4 text-sm group-hover:bg-primario-oscuro")}>
          Más información
        </span>
      </span>
    </>
  );
  const clase = "group flex h-full flex-col no-underline";
  return externo ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={clase}>
      {contenido}
    </a>
  ) : (
    <Link href={href} className={clase}>
      {contenido}
    </Link>
  );
}
