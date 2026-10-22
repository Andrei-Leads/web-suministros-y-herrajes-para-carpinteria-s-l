import type { Metadata } from "next";
import Image from "next/image";
import { BotonLlamada, BotonWhatsApp, formatearHorario, metadatosPagina } from "@andrei-leads/core";
import { ArrowUpRight, Mail, MessageCircle, Navigation, Phone } from "lucide-react";

import config from "@/site.config";
import { EtiquetaEjemplo, esDeEjemplo } from "@/components/Foto";
import { SeparadorDoble } from "@/components/Decorados";
import { Composicion } from "@/components/secciones/ComoTrabajamos";
import { PageHero } from "@/components/secciones/PageHero";
import { Preguntas } from "@/components/secciones/Preguntas";
import { buttonVariants } from "@/components/ui/button";
import { IMAGENES } from "@/lib/catalogo";
import { antetitulo } from "@/lib/estilos";
import { telefonoVisible } from "@/lib/formato";
import { urlComoLlegar } from "@/lib/llegar";
import { mensajeGeneral } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = metadatosPagina(config, { ruta: "/contacto", titulo: "Contacto" });

const dato = "m-0 text-[17px] leading-[1.5]";

/**
 * Contacto (spec §5.6) con las reglas del kit: sin formulario ni reCAPTCHA (C2 pasa a ser la lista
 * de canales) y sin iframe de mapa (C3: caja de marca con los datos + foto de la fachada con
 * «Cómo llegar» a Google Maps). Sin banda CTA: la página ya es el CTA (spec C4).
 */
export default function Page() {
  const { contacto, negocio, empresa } = config;
  const { direccion } = contacto;
  const fachada = empresa.imagenes[0];
  const horario = formatearHorario(contacto.horario);

  return (
    <>
      {/* El carpintero de la portada está a la derecha: en móvil se encuadra hacia él. */}
      <PageHero titulo="Contacto" imagen={IMAGENES.portadas.contacto} enfoque="object-[80%_50%]" />

      <section aria-labelledby="titulo-contacta" className="pt-[clamp(48px,6vw,90px)] pb-[clamp(40px,5vw,70px)]">
        <div className="contenedor grid items-start gap-x-6 gap-y-10 lg:grid-cols-[2fr_1fr_2fr]">
          <div className="flex flex-col gap-5">
            <h2 id="titulo-contacta" className={antetitulo}>
              Cuéntanos qué buscas
            </h2>
            <p className="m-0 text-[15px] leading-[1.55] font-bold text-texto md:text-base">
              Dinos qué pieza necesitas y para qué ventana o puerta es. Si puedes, añade las medidas y envíanos una foto por
              email a {contacto.email}. Te contestamos en horario de almacén.
            </p>
            <Composicion nombre={negocio.nombre} logo={negocio.logo} className="mt-6 hidden max-w-[440px] lg:block" />
          </div>

          <div className="flex flex-col gap-4 lg:col-start-3">
            <h2 className="m-0 text-xl font-bold text-tinta">Elige cómo</h2>
            {contacto.whatsapp && (
              <BotonWhatsApp
                numero={contacto.whatsapp}
                mensaje={mensajeGeneral(contacto)}
                className={cn(buttonVariants({ variant: "principalGrande" }), "justify-start")}
              >
                <MessageCircle aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                WhatsApp: mándanos la foto de la pieza
              </BotonWhatsApp>
            )}
            <BotonLlamada
              telefono={contacto.telefono}
              className={cn(buttonVariants({ variant: contacto.whatsapp ? "contornoTinta" : "principalGrande" }), "justify-start")}
            >
              <Phone aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
              <span>Llamar · {telefonoVisible(contacto.telefono)}</span>
            </BotonLlamada>
            <a href={`mailto:${contacto.email}`} className={cn(buttonVariants({ variant: "contornoTinta" }), "justify-start text-left")}>
              <Mail aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
              {/* Demo: si el email no cabe (móvil), se parte antes de la arroba y no a mitad de palabra. */}
              <span className="min-w-0">
                {contacto.email.split("@")[0]}
                <wbr />@{contacto.email.split("@")[1]}
              </span>
            </a>
            <SeparadorDoble className="mt-4" />
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-sede" className="pb-[clamp(56px,7vw,110px)]">
        <div className="contenedor grid items-stretch lg:grid-cols-3">
          <div className="foco-blanco flex flex-col gap-5 bg-primario px-6 py-10 text-sobre-primario md:px-10">
            <h2 id="titulo-sede" className="m-0 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-tight font-bold uppercase">
              {direccion.ciudad}
            </h2>
            <p className={dato}>
              <span className="font-bold">Dirección: </span>
              {direccion.calle}, {direccion.cp} {direccion.ciudad} ({direccion.provincia})
            </p>
            <p className={dato}>
              <span className="font-bold">Teléfono: </span>
              <BotonLlamada telefono={contacto.telefono} className="inline-flex min-h-11 items-center text-white underline underline-offset-4 tabular-nums">
                {telefonoVisible(contacto.telefono)}
              </BotonLlamada>
            </p>
            <p className={dato}>
              <span className="font-bold">Email: </span>
              <a href={`mailto:${contacto.email}`} className="inline-flex min-h-11 items-center break-all text-white underline underline-offset-4">
                {contacto.email}
              </a>
            </p>
            <div id="horario">
              <p className={cn(dato, "font-bold")}>Horario</p>
              <dl className="m-0 mt-2">
                {horario.map((h) => (
                  <div key={h.dias} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 border-b border-white/30 py-2.5 text-[16px]">
                    <dt>{h.dias}</dt>
                    <dd className="m-0 text-right font-bold tabular-nums">{h.horas}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {contacto.whatsapp && (
              <BotonWhatsApp
                numero={contacto.whatsapp}
                mensaje={mensajeGeneral(contacto)}
                className={cn(buttonVariants({ variant: "blanco" }), "mt-2 self-start")}
              >
                <MessageCircle aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                WhatsApp
              </BotonWhatsApp>
            )}
          </div>

          <div className="foco-blanco relative isolate flex min-h-[280px] items-end overflow-hidden bg-tinta p-6 lg:col-span-2 md:p-10">
            {fachada && (
              <>
                <Image src={fachada.src} alt={fachada.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="-z-10 object-cover" />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/45 to-black/10" />
                {esDeEjemplo(fachada) && <EtiquetaEjemplo />}
              </>
            )}
            <div className="flex flex-col gap-3">
              <p className="m-0 max-w-[30ch] text-xl leading-tight font-bold text-white md:text-2xl">
                {direccion.calle}, {direccion.cp} {direccion.ciudad}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={urlComoLlegar(contacto)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "principalGrande" })}
                >
                  <Navigation aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                  Cómo llegar
                </a>
                {contacto.fichaGoogle && (
                  <a href={contacto.fichaGoogle} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "contornoClaro" })}>
                    Ver ficha en Google
                    <ArrowUpRight aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Preguntas preguntas={config.preguntas} />
    </>
  );
}
