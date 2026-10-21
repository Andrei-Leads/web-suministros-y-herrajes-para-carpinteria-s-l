import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BotonLlamada, BotonWhatsApp, metadatosServicio } from "@andrei-leads/core";
import { MessageCircle, Package, Phone } from "lucide-react";

import config from "@/site.config";
import { Foto } from "@/components/Foto";
import { Migas } from "@/components/Migas";
import { BandaCta } from "@/components/secciones/BandaCta";
import { Preguntas } from "@/components/secciones/Preguntas";
import { Subfamilias } from "@/components/secciones/Subfamilias";
import { Precio } from "@/components/secciones/TarjetaFamilia";
import { buttonVariants } from "@/components/ui/button";
import { familiaCatalogo } from "@/lib/catalogo";
import { antetitulo, cuerpo, display } from "@/lib/estilos";
import { telefonoVisible } from "@/lib/formato";
import { mensajeServicio } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

// Un slug que no está en generateStaticParams se genera en la primera visita. Sin esto,
// partialPrefetching sirve antes el App Shell con 200 y el 404 solo llega a la segunda.
// Con "navigation", Next espera al resultado completo: 404 desde la primera petición.
export const ensureStatic = "navigation";

// Con cacheComponents, generateStaticParams no puede devolver [].
export function generateStaticParams() {
  const params = config.servicios.map((s) => ({ slug: s.slug }));
  return params.length > 0 ? params : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadatosServicio(config, slug);
}

/**
 * Página de familia (spec §5.3, patrón /mecanica/ de Cerda). Sin hero.
 * F1: h1 centrado + 3 columnas en espejo (lema y texto alineados a la derecha | foto 3:2 con línea
 * de marca | lema y texto a la izquierda, con precio y botones). F2: subfamilias de lib/catalogo.ts.
 * Después, las preguntas del servicio y la banda CTA.
 */
export default async function Page({ params }: PageProps<"/servicios/[slug]">) {
  const { slug } = await params;
  const servicio = config.servicios.find((s) => s.slug === slug);
  if (!servicio) notFound();

  const { contacto } = config;
  const familia = familiaCatalogo(servicio.slug);
  const foto = servicio.imagenes[1] ?? servicio.imagenes[0];

  // Columna izquierda: el lema local o, si no hay, la descripción como lema.
  const izqTitulo = familia?.lemaIzquierda ?? servicio.descripcion;
  // Demo: con lema, la izquierda lleva el 1.er párrafo y la derecha el resto (la descripción ya va en la meta).
  const izqTexto = familia?.lemaIzquierda && servicio.contenido.length < 2 ? servicio.descripcion : servicio.contenido[0];
  const resto = familia?.lemaIzquierda && servicio.contenido.length < 2 ? servicio.contenido : servicio.contenido.slice(1);
  const derTitulo = familia?.lemaDerecha ?? (servicio.incluye.length > 0 ? "Qué encontrarás" : "Pídenos precio");

  return (
    <>
      <div className="contenedor pt-3">
        <Migas
          items={[
            { href: "/", texto: "Inicio" },
            { href: "/servicios", texto: "Productos" },
            { texto: servicio.titulo },
          ]}
        />
      </div>

      <section className="pt-[clamp(32px,6vw,90px)] pb-[clamp(40px,6vw,90px)]">
        <div className="contenedor">
          <h1 className={cn(display, "text-center")}>
            {servicio.titulo}
            <span className="mt-3 block text-[0.4em] leading-tight font-bold tracking-normal text-texto">
              en {contacto.direccion.ciudad}
            </span>
          </h1>

          <div className="mt-10 grid items-start gap-x-[clamp(24px,4vw,64px)] gap-y-8 md:mt-14 lg:grid-cols-3">
            <div className="flex flex-col gap-5 lg:text-right">
              <h2 className={cn(antetitulo, "lg:ml-auto lg:max-w-[16ch]")}>{izqTitulo}</h2>
              {izqTexto && <p className={cuerpo}>{izqTexto}</p>}
            </div>

            <div className="flex flex-col items-center gap-6">
              {foto ? (
                <Foto imagen={foto} proporcion="3/2" priority sizes="(min-width: 1024px) 382px, 100vw" className="w-full" />
              ) : (
                <div className="flex aspect-[3/2] w-full items-center justify-center bg-tarjeta text-primario">
                  <Package aria-hidden="true" strokeWidth={1.25} className="size-20" />
                </div>
              )}
              <span aria-hidden="true" className="block h-0.5 w-[75px] bg-primario" />
            </div>

            <div className="flex flex-col gap-5">
              <h2 className={cn(antetitulo, "lg:max-w-[14ch]")}>{derTitulo}</h2>
              {resto.map((p, i) => (
                <p key={i} className={cuerpo}>
                  {p}
                </p>
              ))}
              {servicio.incluye.length > 0 && (
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {servicio.incluye.map((inc) => (
                    <li key={inc} className="flex items-baseline gap-[10px] text-[17px] leading-[1.4] text-texto-lista">
                      <span aria-hidden="true" className="size-[5px] flex-none -translate-y-[3px] rounded-full bg-primario" />
                      {inc}
                    </li>
                  ))}
                </ul>
              )}
              {servicio.precioDesde && <Precio texto={servicio.precioDesde} className="text-lg" />}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row">
                {contacto.whatsapp && (
                  <BotonWhatsApp
                    numero={contacto.whatsapp}
                    mensaje={mensajeServicio(servicio)}
                    className={buttonVariants({ variant: "principalGrande" })}
                  >
                    <MessageCircle aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                    <span>Pide presupuesto de {servicio.titulo} por WhatsApp</span>
                  </BotonWhatsApp>
                )}
                <BotonLlamada
                  telefono={contacto.telefono}
                  className={buttonVariants({ variant: contacto.whatsapp ? "contornoTinta" : "principalGrande" })}
                >
                  <Phone aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                  <span>Llamar · {telefonoVisible(contacto.telefono)}</span>
                </BotonLlamada>
              </div>
            </div>
          </div>
        </div>
      </section>

      {familia && (
        <Subfamilias
          titulo={familia.tituloGama ?? `Nuestra gama de ${servicio.titulo.toLowerCase()}`}
          subfamilias={familia.subfamilias}
        />
      )}

      <Preguntas preguntas={servicio.preguntas} titulo={`Preguntas sobre ${servicio.titulo.toLowerCase()}`} />

      <BandaCta contacto={contacto} servicios={config.servicios} />
    </>
  );
}
