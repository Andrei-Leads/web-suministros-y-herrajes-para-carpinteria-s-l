import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BotonLlamada, BotonWhatsApp, metadatosTrabajo } from "@andrei-leads/core";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import config from "@/site.config";
import { Foto } from "@/components/Foto";
import { Migas } from "@/components/Migas";
import { BandaCta } from "@/components/secciones/BandaCta";
import { buttonVariants } from "@/components/ui/button";
import { cuerpo, display } from "@/lib/estilos";
import { telefonoVisible } from "@/lib/formato";
import { mensajeTrabajo } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
// Con "navigation", Next espera al resultado completo: 404 desde la primera petición.
export const ensureStatic = "navigation";

// Con `cacheComponents` la lista no puede ser []: sin trabajos, un slug de relleno que acaba en 404.
export function generateStaticParams() {
  const params = config.trabajos.map((t) => ({ slug: t.slug }));
  return params.length > 0 ? params : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosTrabajo(config, slug);
}

/** Ficha de un trabajo: h1 centrado, fotos, texto, testimonio y CTA. */
export default async function Page({ params }: PageProps<"/trabajos/[slug]">) {
  const { slug } = await params;
  const trabajo = config.trabajos.find((t) => t.slug === slug);
  if (!trabajo) notFound();

  const { contacto } = config;
  const familia = trabajo.servicio ? config.servicios.find((s) => s.slug === trabajo.servicio) : undefined;
  const [principal, ...resto] = trabajo.imagenes;
  const datos = [trabajo.ubicacion, trabajo.anio && String(trabajo.anio), trabajo.duracion, trabajo.superficie, trabajo.precio].filter(Boolean);

  return (
    <>
      <div className="contenedor pt-3">
        <Migas items={[{ href: "/", texto: "Inicio" }, { href: "/trabajos", texto: "Galería" }, { texto: trabajo.titulo }]} />
      </div>
      <article className="pt-[clamp(32px,5vw,70px)] pb-[clamp(48px,6vw,90px)]">
        <div className="contenedor flex flex-col gap-8">
          <h1 className={cn(display, "text-center")}>{trabajo.titulo}</h1>
          {datos.length > 0 && <p className="m-0 text-center font-bold text-tinta">{datos.join(" · ")}</p>}
          <Foto imagen={principal} proporcion="16/9" priority sizes="(min-width: 1286px) 1220px, 100vw" />
          {(resto.length > 0 || trabajo.antes) && (
            <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 md:grid-cols-3">
              {trabajo.antes && (
                <li>
                  <Foto imagen={trabajo.antes} proporcion="4/3" sizes="(min-width: 768px) 33vw, 50vw">
                    <span className="absolute right-2 bottom-2 bg-tinta px-2 py-0.5 text-xs font-bold text-white">Antes</span>
                  </Foto>
                </li>
              )}
              {resto.map((f, i) => (
                <li key={`${f.src}-${i}`}>
                  <Foto imagen={f} proporcion="4/3" sizes="(min-width: 768px) 33vw, 50vw" />
                </li>
              ))}
            </ul>
          )}
          <div className="mx-auto flex max-w-[68ch] flex-col gap-4">
            <p className={cn(cuerpo, "font-bold text-tinta")}>{trabajo.descripcion}</p>
            {trabajo.contenido.map((p, i) => (
              <p key={i} className={cuerpo}>
                {p}
              </p>
            ))}
            {trabajo.testimonio && (
              <figure className="m-0 mt-4 rounded-[40px_0_40px_0] bg-tarjeta p-7">
                <blockquote className="m-0 text-lg leading-[1.5] font-medium text-tinta">«{trabajo.testimonio.texto}»</blockquote>
                <figcaption className="mt-3 text-sm font-bold text-texto">{trabajo.testimonio.autor}</figcaption>
              </figure>
            )}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {contacto.whatsapp ? (
                <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensajeTrabajo(trabajo)} className={buttonVariants({ variant: "principalGrande" })}>
                  <MessageCircle aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                  Pregúntanos por WhatsApp
                </BotonWhatsApp>
              ) : (
                <BotonLlamada telefono={contacto.telefono} className={buttonVariants({ variant: "principalGrande" })}>
                  <Phone aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                  <span>Llamar · {telefonoVisible(contacto.telefono)}</span>
                </BotonLlamada>
              )}
              {familia && (
                <Link href={`/servicios/${familia.slug}`} className={buttonVariants({ variant: "enlaceFlecha" })}>
                  Ver {familia.titulo}
                  <ArrowRight aria-hidden="true" strokeWidth={2} className="size-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
      <BandaCta contacto={contacto} servicios={config.servicios} />
    </>
  );
}
