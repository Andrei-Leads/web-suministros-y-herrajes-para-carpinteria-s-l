import type { Metadata } from "next";
import { metadatosPagina } from "@andrei-leads/core";

import config from "@/site.config";
import { BandaCta } from "@/components/secciones/BandaCta";
import { PageHero } from "@/components/secciones/PageHero";
import { TarjetaFamilia } from "@/components/secciones/TarjetaFamilia";
import { IMAGENES } from "@/lib/catalogo";
import { antetitulo } from "@/lib/estilos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/servicios", titulo: "Productos" });

/** Productos (spec §5.2): PageHero · intro centrada · rejilla de familias de 4 columnas · banda CTA. */
export default function Page() {
  const { servicios, negocio, contacto } = config;
  const pocas = servicios.length < 4;
  return (
    <>
      <PageHero titulo="Productos" imagen={IMAGENES.portadas.productos} />

      <section aria-labelledby="titulo-intro" className="pt-[clamp(48px,7vw,110px)] pb-[clamp(24px,4vw,50px)]">
        <div className="contenedor flex flex-col items-center gap-6 text-center">
          <h2 id="titulo-intro" className={antetitulo}>
            Nuestros productos
          </h2>
          <p className="m-0 max-w-[68ch] text-base leading-[1.65] text-texto md:px-[45px] md:text-[17px] md:leading-[27px]">
            {negocio.descripcionCorta}
          </p>
        </div>
      </section>

      <section aria-label="Familias" className="pt-[clamp(24px,4vw,60px)] pb-[clamp(56px,7vw,110px)]">
        <div className="contenedor">
          <ul
            className={cn(
              "m-0 grid list-none gap-x-6 gap-y-[50px] p-0",
              pocas ? "mx-auto max-w-[900px] sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"
            )}
          >
            {servicios.map((s) => (
              <li key={s.slug}>
                <TarjetaFamilia servicio={s} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BandaCta contacto={contacto} servicios={servicios} />
    </>
  );
}
