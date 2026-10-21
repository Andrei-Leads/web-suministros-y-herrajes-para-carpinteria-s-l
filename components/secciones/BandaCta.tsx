import Image from "next/image";
import { BotonLlamada, BotonWhatsApp, type Servicio, type SiteConfig } from "@andrei-leads/core";
import { Camera, Mail, Phone } from "lucide-react";

import { EtiquetaEjemplo, esDeEjemplo } from "@/components/Foto";
import { buttonVariants } from "@/components/ui/button";
import { IMAGENES, fotoTile } from "@/lib/catalogo";
import { display700 } from "@/lib/estilos";
import { telefonoVisible } from "@/lib/formato";
import { MENSAJE_FOTO, mailtoFoto } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = {
  contacto: Pick<SiteConfig["contacto"], "telefono" | "whatsapp" | "email">;
  servicios: Servicio[];
};

/**
 * S9 · Banda CTA final, igual en todas las páginas salvo Contacto (spec §5.1).
 * Fondo: mosaico 4 × 2 con las fotos de los tiles de familia y un velo negro al 60 %.
 * «Mándanos foto de la pieza»: WhatsApp si hay número; si no, email y llamada.
 */
export function BandaCta({ contacto, servicios }: Props) {
  const fotos = [...servicios.slice(0, 7).map(fotoTile), IMAGENES.verTodo].filter((f) => f !== undefined);
  // 8 celdas: si hay menos fotos, se repiten.
  const celdas = fotos.length > 0 ? Array.from({ length: 8 }, (_, i) => fotos[i % fotos.length]) : [];
  const hayEjemplo = celdas.some(esDeEjemplo);

  return (
    <section aria-labelledby="banda-cta" className="foco-blanco relative isolate overflow-hidden bg-tinta">
      {celdas.length > 0 && (
        <div aria-hidden="true" className="absolute inset-0 -z-10 grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2">
          {celdas.map((f, i) => (
            <div key={i} className="relative">
              <Image src={f.src} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}
      {hayEjemplo && <EtiquetaEjemplo texto="Fotos de ejemplo" posicion="abajo-derecha" />}

      <div className="contenedor flex flex-col items-center gap-5 py-[clamp(88px,12vw,170px)] text-center text-white">
        <h2 id="banda-cta" className={cn(display700, "text-white")}>
          ¿No sabes qué pieza es?
        </h2>
        <p className="m-0 max-w-[46ch] text-lg leading-[1.5] font-medium text-white/90 md:text-xl">
          {contacto.whatsapp
            ? "Mándanos una foto por WhatsApp y te ayudamos a identificarla."
            : "Llámanos o envíanos la foto por email y te ayudamos a identificarla."}
        </p>
        <div className="mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {contacto.whatsapp ? (
            <BotonWhatsApp
              numero={contacto.whatsapp}
              mensaje={MENSAJE_FOTO}
              className={buttonVariants({ variant: "principalGrande" })}
            >
              <Camera aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
              Mándanos la foto por WhatsApp
            </BotonWhatsApp>
          ) : (
            <>
              <a href={mailtoFoto(contacto.email)} className={buttonVariants({ variant: "principalGrande" })}>
                <Mail aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                Mándanos la foto por email
              </a>
              <BotonLlamada telefono={contacto.telefono} className={buttonVariants({ variant: "contornoClaro" })}>
                <Phone aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                <span>Llamar · {telefonoVisible(contacto.telefono)}</span>
              </BotonLlamada>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
