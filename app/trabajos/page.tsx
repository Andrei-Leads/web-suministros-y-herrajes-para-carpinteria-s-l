import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/Foto";
import { BandaCta } from "@/components/secciones/BandaCta";
import { PageHero } from "@/components/secciones/PageHero";
import { hayTrabajos } from "@/lib/navegacion";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/trabajos", titulo: "Galería" });

/**
 * Galería (/trabajos, ruta fija del kit; no está en la spec de Cerda). Solo existe con trabajos o
 * galería; si no, 404 y fuera del menú. Trabajos: tarjetas tipo «trailer» 16:10 con enlace a su
 * ficha. Solo galería: rejilla de fotos 4:3 con pie.
 */
export default function Page() {
  if (!hayTrabajos(config)) notFound();
  const { trabajos, galeria, contacto, servicios, empresa } = config;

  return (
    <>
      <PageHero titulo="Galería" imagen={trabajos[0]?.imagenes[0] ?? galeria[0] ?? empresa.imagenes[0]} />
      <section aria-label="Fotos" className="pt-[clamp(48px,6vw,90px)] pb-[clamp(56px,7vw,110px)]">
        <div className="contenedor">
          {trabajos.length > 0 ? (
            <ul className="m-0 grid list-none gap-x-6 gap-y-12 p-0 md:grid-cols-2 lg:grid-cols-3">
              {trabajos.map((t) => (
                <li key={t.slug}>
                  <Link href={`/trabajos/${t.slug}`} className="group flex h-full flex-col gap-4 no-underline">
                    <Foto
                      imagen={t.imagenes[0]}
                      proporcion="16/10"
                      decorativa
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                      imgClassName="transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    <h2 className="m-0 text-xl leading-tight font-bold text-primario">{t.titulo}</h2>
                    <p className="m-0 text-base leading-[1.6] text-texto">{t.descripcion}</p>
                    {t.ubicacion && <p className="m-0 mt-auto text-sm font-bold text-tinta">{t.ubicacion}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 md:grid-cols-3 lg:grid-cols-4">
              {galeria.map((f, i) => (
                <li key={`${f.src}-${i}`}>
                  <figure className="m-0 flex flex-col gap-2">
                    <Foto imagen={f} proporcion="4/3" sizes="(min-width: 1024px) 290px, (min-width: 768px) 31vw, 46vw" />
                    {f.titulo && <figcaption className="text-sm leading-[1.4] text-texto">{f.titulo}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <BandaCta contacto={contacto} servicios={servicios} />
    </>
  );
}
