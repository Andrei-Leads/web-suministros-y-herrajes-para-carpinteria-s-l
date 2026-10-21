import Image from "next/image";
import type { ReactNode } from "react";
import type { Imagen } from "@andrei-leads/core";

import { cn } from "@/lib/utils";

/** Proporciones de los huecos de imagen de la spec §7. */
export type Proporcion = "10/7" | "2/1" | "4/3" | "3/2" | "6/5" | "16/9" | "16/10" | "2/3" | "1/1";

type Props = {
  imagen: Imagen;
  proporcion: Proporcion;
  /** Atributo `sizes` de next/image (ancho real de la foto según el breakpoint). */
  sizes: string;
  priority?: boolean;
  /** Recorte de producto (PNG transparente): `object-contain` y sin fondo. */
  recorte?: boolean;
  /** Foto dentro de un enlace con texto propio: `alt=""` y etiqueta más pequeña. */
  decorativa?: boolean;
  /** Clases extra para la <img> (zoom en hover, Ken Burns…). */
  imgClassName?: string;
  /** Dónde va la etiqueta «Foto de ejemplo». */
  etiqueta?: "arriba-izquierda" | "abajo-derecha";
  className?: string;
  children?: ReactNode;
};

const PROPORCION: Record<Proporcion, string> = {
  "10/7": "aspect-[10/7]",
  "2/1": "aspect-[2/1]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "6/5": "aspect-[6/5]",
  "16/9": "aspect-video",
  "16/10": "aspect-[16/10]",
  "2/3": "aspect-[2/3]",
  "1/1": "aspect-square",
};

/**
 * Etiqueta «Foto de ejemplo»: rectángulo oscuro (radio 0, como todo el diseño).
 * Decorativa (aria-hidden): el alt ya describe la foto.
 */
export function EtiquetaEjemplo({
  pequena,
  posicion = "arriba-izquierda",
  texto = "Foto de ejemplo",
}: {
  pequena?: boolean;
  posicion?: "arriba-izquierda" | "abajo-derecha";
  texto?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-[2] inline-flex items-center bg-etiqueta-ejemplo font-medium whitespace-nowrap text-white",
        posicion === "arriba-izquierda" ? "top-2 left-2" : "right-2 bottom-2",
        pequena ? "px-1.5 py-0.5 text-[11px] leading-[1.4]" : "px-2 py-[3px] text-xs leading-[1.4]"
      )}
    >
      {texto}
    </span>
  );
}

/** ¿Es una imagen de ejemplo del template (`/ejemplo/…`)? */
export function esDeEjemplo(imagen: Imagen): boolean {
  return imagen.src.startsWith("/ejemplo/");
}

/** Foto con next/image, proporción fija y `object-cover`. Si es de ejemplo, lleva la etiqueta. */
export function Foto({
  imagen,
  proporcion,
  sizes,
  priority,
  recorte,
  decorativa,
  imgClassName,
  etiqueta = "arriba-izquierda",
  className,
  children,
}: Props) {
  return (
    <div className={cn("relative overflow-hidden", !recorte && "bg-submenu", PROPORCION[proporcion], className)}>
      <Image
        src={imagen.src}
        alt={decorativa ? "" : imagen.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(recorte ? "object-contain" : "object-cover", imgClassName)}
      />
      {esDeEjemplo(imagen) && <EtiquetaEjemplo pequena={decorativa} posicion={etiqueta} />}
      {children}
    </div>
  );
}
