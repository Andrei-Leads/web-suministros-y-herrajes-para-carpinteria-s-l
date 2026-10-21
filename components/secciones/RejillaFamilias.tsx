import Image from "next/image";
import Link from "next/link";
import type { Imagen, Servicio } from "@andrei-leads/core";

import { EtiquetaEjemplo, esDeEjemplo } from "@/components/Foto";
import { IMAGENES, fotoTile } from "@/lib/catalogo";
import { cn } from "@/lib/utils";

type Tile = { href: string; titulo: string; imagen?: Imagen };

/**
 * S4 · Rejilla de categorías a sangre (spec §5.1): 2 filas × 4 tiles sin separación (≈ 1,38:1 a
 * 1440 px; 4:3 en 2 columnas en móvil). Foto oscurecida con el nombre de la familia en vivo,
 * blanco 800 centrado. El último tile, «Ver todo», enlaza a /servicios.
 * A17: el velo baja de /45 a /30 y la foto hace zoom 1,05 en 300 ms.
 */
export function RejillaFamilias({ servicios }: { servicios: Servicio[] }) {
  const tiles: Tile[] = servicios.slice(0, 7).map((s) => ({
    href: `/servicios/${s.slug}`,
    titulo: s.titulo,
    imagen: fotoTile(s),
  }));
  tiles.push({ href: "/servicios", titulo: "Ver todos los productos", imagen: IMAGENES.verTodo });
  // Filas completas: 4 columnas si cuadra; si no, 3 (6 tiles) o tantas como tiles (2).
  const n = tiles.length;
  const columnas = n % 4 === 0 ? "lg:grid-cols-4" : n % 3 === 0 ? "lg:grid-cols-3" : n === 2 ? "lg:grid-cols-2" : "lg:grid-cols-4";

  return (
    <section aria-label="Familias de producto">
      <ul className={cn("m-0 grid list-none grid-cols-2 p-0", columnas)}>
        {tiles.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="group foco-blanco relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-tinta text-white no-underline lg:aspect-[360/260]"
            >
              {t.imagen && (
                <Image
                  src={t.imagen.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              )}
              <span aria-hidden="true" className="absolute inset-0 bg-black/45 transition-colors duration-300 ease-in-out group-hover:bg-black/30" />
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 to-transparent" />
              {t.imagen && esDeEjemplo(t.imagen) && <EtiquetaEjemplo pequena />}
              <span className="relative px-3 text-center text-lg leading-[1.15] font-extrabold text-balance [text-shadow:0_1px_6px_rgb(0_0_0/0.45)] sm:text-xl md:text-[26px] xl:text-[34px]">
                {t.titulo}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
