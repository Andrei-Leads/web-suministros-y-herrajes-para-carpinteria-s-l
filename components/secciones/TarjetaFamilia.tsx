import Link from "next/link";
import type { Servicio } from "@andrei-leads/core";
import { Package } from "lucide-react";

import { Foto } from "@/components/Foto";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** «desde 12 €» → etiqueta DESDE + «12 €»; cualquier otro texto, tal cual. */
export function Precio({ texto, className }: { texto: string; className?: string }) {
  const m = /^desde\s+(.+)$/i.exec(texto.trim());
  return (
    <p className={cn("m-0 text-[15px] text-tinta", className)}>
      {m ? (
        <>
          <span className="mr-1.5 text-xs font-bold tracking-[0.08em] text-primario uppercase">Desde</span>
          <span className="font-bold tabular-nums">{m[1]}</span>
        </>
      ) : (
        <span className="font-bold">{texto}</span>
      )}
    </p>
  );
}

type Props = {
  servicio: Servicio;
  nivel?: "h2" | "h3";
  /** Texto del botón: «Ver más» (Productos) o «Más información» (Sobre nosotros). */
  boton?: string;
  /** Con descripción bajo el título (N4 de Sobre nosotros). */
  conDescripcion?: boolean;
  sizes?: string;
};

/**
 * P3 · Tarjeta de familia (sliding_box): foto 3:2, título de marca centrado y una línea de 2 px
 * que pasa del 20 % al 60 % del ancho en hover (A15, 0,5 s). El botón va dentro de la tarjeta y
 * toda ella es el enlace a /servicios/{slug} (la spec lo recomienda: en Cerda va en otra fila).
 */
export function TarjetaFamilia({ servicio, nivel: Titulo = "h2", boton = "Ver más", conDescripcion, sizes }: Props) {
  const foto = servicio.imagenes[0];
  return (
    <Link href={`/servicios/${servicio.slug}`} className="group flex h-full flex-col items-center text-center no-underline">
      {foto ? (
        <Foto
          imagen={foto}
          proporcion="3/2"
          decorativa
          sizes={sizes ?? "(min-width: 1024px) 282px, (min-width: 640px) 45vw, 90vw"}
          className="w-full"
          imgClassName="transition-transform duration-300 ease-in-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex aspect-[3/2] w-full items-center justify-center bg-tarjeta text-primario">
          <Package aria-hidden="true" strokeWidth={1.25} className="size-16" />
        </div>
      )}
      <Titulo className="m-0 mt-4 text-xl leading-[1.25] font-medium text-primario text-balance md:text-[22px]">
        {servicio.titulo}
      </Titulo>
      <span
        aria-hidden="true"
        className="mt-4 block h-0.5 w-1/5 bg-primario transition-[width] duration-500 ease-in-out group-hover:w-3/5"
      />
      {conDescripcion && <p className="m-0 mt-4 text-base leading-[1.6] text-texto">{servicio.descripcion}</p>}
      {servicio.precioDesde && <Precio texto={servicio.precioDesde} className="mt-3" />}
      <span className="mt-auto pt-6">
        <span className={cn(buttonVariants({ variant: "principal" }), "group-hover:bg-primario-oscuro")}>{boton}</span>
      </span>
    </Link>
  );
}
