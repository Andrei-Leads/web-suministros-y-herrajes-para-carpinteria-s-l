import type { Metadata } from "next";
import { metadatosPagina, type Imagen } from "@andrei-leads/core";

import config from "@/site.config";
import { Foto } from "@/components/Foto";
import { BandaCta } from "@/components/secciones/BandaCta";
import { CajaTrailer } from "@/components/secciones/CajaTrailer";
import { PageHero } from "@/components/secciones/PageHero";
import { Resenas } from "@/components/secciones/Resenas";
import { TarjetaFamilia } from "@/components/secciones/TarjetaFamilia";
import { IMAGENES } from "@/lib/catalogo";
import { antetitulo, cuerpo } from "@/lib/estilos";
import { direccionLinea, horarioCorto, iniciales, listaY } from "@/lib/formato";
import { urlComoLlegar } from "@/lib/llegar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/empresa", titulo: "Sobre nosotros" });

/**
 * Sobre nosotros (spec §5.5): PageHero · N2 historia (foto 6:5 + texto) · N3 «Más sobre nosotros»
 * (4 cajas que llevan a productos, cómo trabajamos, contacto y cómo llegar) · equipo (si hay) ·
 * N4 tres familias destacadas · reseñas (si hay) · banda CTA.
 */
export default function Page() {
  const { negocio, empresa, contacto, servicios } = config;
  const fotoHistoria = empresa.imagenes[2] ?? empresa.imagenes[0];
  const [primero, ...resto] = empresa.historia.length > 0 ? empresa.historia : [negocio.descripcionCorta];

  const cajas: { titulo: string; texto: string; href: string; externo?: boolean; imagen?: Imagen }[] = [
    {
      titulo: "Nuestros productos",
      texto: `${listaY(servicios.slice(0, 4).map((s) => s.titulo))}${servicios.length > 4 ? ", entre otras familias" : ""}.`,
      href: "/servicios",
      imagen: servicios[0]?.imagenes[0],
    },
    {
      titulo: "Cómo trabajamos",
      // Demo: frase del copy (S5) en vez de la lista de títulos de `proceso`, que aquí no se leía bien.
      texto: "No necesitas saber cómo se llama la pieza: con una foto, las medidas o la pieza vieja, la buscamos contigo.",
      href: "/#como-trabajamos",
      imagen: IMAGENES.proceso[0],
    },
    {
      titulo: "Contacta con nosotros",
      texto: horarioCorto(contacto.horario),
      href: "/contacto",
      imagen: empresa.imagenes[3] ?? IMAGENES.portadas.contacto,
    },
    {
      titulo: "Cómo llegar",
      texto: direccionLinea(contacto.direccion),
      href: urlComoLlegar(contacto),
      externo: true,
      imagen: empresa.imagenes[0],
    },
  ];

  return (
    <>
      <PageHero titulo="Sobre nosotros" imagen={IMAGENES.portadas.empresa} />

      <section aria-labelledby="titulo-historia" className="pt-[clamp(48px,7vw,110px)] pb-[clamp(40px,5vw,70px)]">
        <div className={cn("contenedor grid items-center gap-x-6 gap-y-10", fotoHistoria && "lg:grid-cols-2")}>
          {fotoHistoria && <Foto imagen={fotoHistoria} proporcion="6/5" priority sizes="(min-width: 1024px) 586px, 100vw" />}
          <div className="flex flex-col gap-5 lg:pl-[10%]">
            <h2 id="titulo-historia" className={antetitulo}>
              Nuestra historia
            </h2>
            <p className={cn(cuerpo, "font-bold text-tinta")}>{primero}</p>
            {resto.map((p, i) => (
              <p key={i} className={cuerpo}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-mas" className="pt-[clamp(40px,5vw,70px)] pb-[clamp(48px,6vw,90px)]">
        <div className="contenedor">
          <h2 id="titulo-mas" className={antetitulo}>
            Más sobre nosotros
          </h2>
          <ul className="m-0 mt-10 grid list-none gap-x-[2%] gap-y-12 p-0 md:mt-16 md:grid-cols-2">
            {cajas.map((c) => (
              <li key={c.titulo}>
                <CajaTrailer {...c} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {empresa.equipo.length > 0 && (
        <section aria-labelledby="titulo-equipo" className="pb-[clamp(48px,6vw,90px)]">
          <div className="contenedor">
            <h2 id="titulo-equipo" className={antetitulo}>
              Quién te atiende
            </h2>
            <ul className="m-0 mt-8 grid list-none grid-cols-2 gap-6 p-0 md:grid-cols-4">
              {empresa.equipo.map((p) => (
                <li key={p.nombre} className="flex flex-col gap-3">
                  {p.foto ? (
                    <Foto imagen={p.foto} proporcion="1/1" sizes="(min-width: 768px) 25vw, 50vw" />
                  ) : (
                    <div aria-hidden="true" className="flex aspect-square items-center justify-center bg-tarjeta text-4xl font-black text-primario">
                      {iniciales(p.nombre)}
                    </div>
                  )}
                  <p className="m-0 font-bold text-tinta">
                    {p.nombre}
                    {p.cargo && <span className="block font-normal text-texto">{p.cargo}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {servicios.length > 0 && (
        <section aria-labelledby="titulo-destacadas" className="py-[clamp(56px,7vw,110px)]">
          <div className="contenedor">
            <h2 id="titulo-destacadas" className={cn(antetitulo, "text-center")}>
              Familias destacadas
            </h2>
            <ul className="m-0 mt-10 grid list-none gap-x-5 gap-y-12 p-0 md:mt-14 md:grid-cols-3">
              {servicios.slice(0, 3).map((s) => (
                <li key={s.slug}>
                  <TarjetaFamilia servicio={s} nivel="h3" boton="Más información" conDescripcion sizes="(min-width: 1024px) 363px, (min-width: 768px) 31vw, 90vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Resenas resenas={config.resenas} valoracion={config.valoracion} fichaGoogle={contacto.fichaGoogle} />

      <BandaCta contacto={contacto} servicios={servicios} />
    </>
  );
}
