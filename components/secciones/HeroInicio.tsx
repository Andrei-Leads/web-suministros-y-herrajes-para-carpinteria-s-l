import type { ReactNode } from "react";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, type Imagen, type SiteConfig } from "@andrei-leads/core";
import { ArrowRight, Camera, Mail, MessageCircle, Phone } from "lucide-react";

import { SeparadorDoble } from "@/components/Decorados";
import { Foto } from "@/components/Foto";
import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible } from "@/lib/formato";
import { MENSAJE_FOTO, mailtoFoto, mensajeGeneral } from "@/lib/mensajes";
import { cn } from "@/lib/utils";
import { SliderHero } from "./SliderHero";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "sector" | "descripcionCorta">;
  contacto: SiteConfig["contacto"];
  imagenes: Imagen[];
};

/* Clases de las piezas que entran al rotar (A6 y A7). En la 1.ª carga no hay `data-animar`. */
const animTexto = "motion-safe:group-data-animar/slide:animate-hero-texto";
const animBodegon = "motion-safe:group-data-animar/slide:animate-hero-bodegon";

const titular =
  "m-0 text-[clamp(1.875rem,1.3rem+2.2vw,3rem)] leading-[1.17] font-black tracking-[0.03em] text-tinta text-balance";
const subtitulo =
  "m-0 max-w-[550px] text-base leading-[1.6] font-medium text-subtitulo md:text-xl md:leading-[28px] md:tracking-[0.06em]";

function Diapositiva({
  titulo,
  texto,
  cta,
  imagen,
  primera,
}: {
  titulo: ReactNode;
  texto: string;
  cta: ReactNode;
  imagen?: Imagen;
  primera?: boolean;
}) {
  return (
    <div
      className={cn(
        "contenedor grid items-center gap-x-6 md:min-h-[clamp(480px,40vw,560px)]",
        imagen && "md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
      )}
    >
      <div className="order-2 flex flex-col pt-3 pb-10 md:order-1 md:py-16">
        <div className={animTexto}>{titulo}</div>
        <SeparadorDoble className={cn("my-5 md:my-[22px]", animTexto)} />
        {/* En móvil el botón va antes del subtítulo: así se ve sin scroll a 375 × 667. */}
        <p className={cn(subtitulo, "order-2 md:order-1", animTexto)}>{texto}</p>
        <div className={cn("order-1 mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 md:order-2 md:mt-8 md:mb-0", animTexto)}>
          {cta}
        </div>
      </div>
      {imagen && (
        <div className="relative order-1 -mx-6 overflow-hidden md:order-2 md:-mr-[6vw] md:ml-0 md:overflow-visible">
          <div className={animBodegon}>
            <Foto
              imagen={imagen}
              proporcion="10/7"
              recorte
              priority={primera}
              sizes="(min-width: 768px) 55vw, 100vw"
              className="max-md:aspect-video"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * S1 · Hero de inicio (spec §5.1): fondo gris claro con curvas blancas (Ken Burns), 2 diapositivas
 * —titular, separador doble, subtítulo, CTA y bodegón que sobresale por la derecha— y la banda
 * diagonal de marca debajo. Diapositiva 1: `{sector} en {ciudad}` (h1) + descripción corta.
 * Diapositiva 2 (solo con 2 imágenes en `imagenesHero`): «mándanos foto de la pieza».
 * Por debajo de 768 px se apila: bodegón arriba y texto debajo (no se escala como el original).
 */
export function HeroInicio({ negocio, contacto, imagenes }: Props) {
  const verProductos = (
    <Link href="/servicios" className={cn(buttonVariants({ variant: "enlaceFlecha" }), "gap-2")}>
      Ver productos
      <ArrowRight aria-hidden="true" strokeWidth={2} className="size-5" />
    </Link>
  );

  const ctaPrincipal = contacto.whatsapp ? (
    <BotonWhatsApp
      numero={contacto.whatsapp}
      mensaje={mensajeGeneral(contacto)}
      className={buttonVariants({ variant: "principalGrande" })}
    >
      <MessageCircle aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
      Escríbenos por WhatsApp
    </BotonWhatsApp>
  ) : (
    <BotonLlamada telefono={contacto.telefono} className={buttonVariants({ variant: "principalGrande" })}>
      <Phone aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
      <span>Llamar · {telefonoVisible(contacto.telefono)}</span>
    </BotonLlamada>
  );

  const ctaFoto = contacto.whatsapp ? (
    <BotonWhatsApp numero={contacto.whatsapp} mensaje={MENSAJE_FOTO} className={buttonVariants({ variant: "principalGrande" })}>
      <Camera aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
      Mándanos la foto
    </BotonWhatsApp>
  ) : (
    <a href={mailtoFoto(contacto.email)} className={buttonVariants({ variant: "principalGrande" })}>
      <Mail aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
      Mándanos la foto por email
    </a>
  );

  const diapositivas: ReactNode[] = [
    <Diapositiva
      key="d1"
      primera
      titulo={
        <h1 className={titular}>
          {negocio.sector} en {contacto.direccion.ciudad}
        </h1>
      }
      texto={negocio.descripcionCorta}
      cta={
        <>
          {ctaPrincipal}
          {verProductos}
        </>
      }
      imagen={imagenes[0]}
    />,
  ];
  if (imagenes.length > 1) {
    diapositivas.push(
      <Diapositiva
        key="d2"
        titulo={<p className={titular}>¿No sabes cómo se llama la pieza? Mándanos una foto.</p>}
        texto="Con una foto y las medidas te ayudamos a identificarla. Si no la tenemos, te decimos dónde buscarla o una alternativa."
        cta={ctaFoto}
        imagen={imagenes[1]}
      />
    );
  }

  return (
    <section aria-label="Presentación" className="relative isolate overflow-hidden">
      {/* Fondo gris claro abstracto con curvas blancas (CSS + SVG), con Ken Burns. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,#ffffff,#ececec_60%,#e2e2e2)] motion-safe:animate-kenburns">
          <svg viewBox="0 0 1440 640" preserveAspectRatio="none" className="absolute inset-0 size-full">
            <path d="M-40 140 C 380 60, 760 260, 1480 40" fill="none" stroke="#fff" strokeWidth="40" opacity="0.6" />
            <path d="M-40 520 C 420 380, 980 640, 1480 360" fill="none" stroke="#fff" strokeWidth="26" opacity="0.5" />
            <path d="M900 -40 C 1040 200, 1180 420, 1480 520" fill="none" stroke="#fff" strokeWidth="18" opacity="0.45" />
          </svg>
        </div>
      </div>

      <SliderHero diapositivas={diapositivas} />

      {/* Banda diagonal de marca (75 px) con dos franjas oscuras en bisel debajo, a la izquierda. */}
      <div aria-hidden="true" className="relative h-[42px] md:h-[90px]">
        <div className="absolute inset-x-0 top-0 h-[34px] bg-[linear-gradient(90deg,var(--color-primario-oscuro),var(--color-primario)_30%,var(--color-primario)_85%,var(--color-primario-claro))] [clip-path:polygon(4%_0,100%_0,100%_100%,0_100%,0_40%)] md:h-[75px]" />
        <div className="absolute top-[34px] left-[5%] h-2 w-[11%] bg-[#333] [clip-path:polygon(0_0,100%_0,92%_100%,8%_100%)] md:top-[75px] md:h-[15px]" />
        <div className="absolute top-[34px] left-[15%] h-2 w-[7%] bg-[#555] [clip-path:polygon(0_0,100%_0,88%_100%,12%_100%)] md:top-[75px] md:h-[15px]" />
      </div>
    </section>
  );
}
