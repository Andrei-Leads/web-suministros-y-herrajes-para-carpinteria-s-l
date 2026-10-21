import { BotonLlamada, BotonWhatsApp, formatearHorario, type Imagen, type SiteConfig } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { Foto } from "@/components/Foto";
import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";
import { cn } from "@/lib/utils";

type Props = {
  contacto: SiteConfig["contacto"];
  fachada?: Imagen;
};

/** Caja de horario de marca (S3 de inicio). También la reutiliza la ficha de sede de /contacto. */
export function CajaHorario({ contacto, conBoton = true, className }: { contacto: Props["contacto"]; conBoton?: boolean; className?: string }) {
  const filas = formatearHorario(contacto.horario);
  return (
    <div className={cn("foco-blanco bg-primario px-6 pt-10 pb-12 text-sobre-primario md:px-[10%] md:pb-[60px]", className)}>
      <h2 className="m-0 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] leading-[1.05] font-bold">Horario</h2>
      <dl className="m-0 mt-6 text-[17px] leading-[1.45] md:text-[19px]">
        {filas.map((f) => (
          <div key={f.dias} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 border-b border-white/30 py-3.5">
            <dt className="font-bold">{f.dias}</dt>
            <dd className="m-0 text-right tabular-nums">{f.horas}</dd>
          </div>
        ))}
      </dl>
      {conBoton && (
        <div className="mt-7">
          {contacto.whatsapp ? (
            <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensajeGeneral(contacto)} className={buttonVariants({ variant: "blanco" })}>
              <MessageCircle aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
              Escríbenos por WhatsApp
            </BotonWhatsApp>
          ) : (
            <BotonLlamada telefono={contacto.telefono} className={buttonVariants({ variant: "blanco" })}>
              <Phone aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
              <span>Llamar · {telefonoVisible(contacto.telefono)}</span>
            </BotonLlamada>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * S3 · Horario + fachada (spec §5.1): caja de marca con el horario (`formatearHorario`) a la
 * izquierda y la foto de la fachada (`empresa.imagenes[0]`, 2:1) a la derecha. Sin foto, la caja sola.
 */
export function HorarioFachada({ contacto, fachada }: Props) {
  return (
    <section className="py-10">
      <div className={cn("contenedor grid items-start gap-x-6 gap-y-8", fachada && "md:grid-cols-2")}>
        <CajaHorario contacto={contacto} className={cn(fachada ? "lg:w-3/4" : "md:max-w-[560px]")} />
        {fachada && (
          <Foto imagen={fachada} proporcion="2/1" sizes="(min-width: 1286px) 610px, (min-width: 768px) 50vw, 100vw" className="md:self-start" />
        )}
      </div>
    </section>
  );
}
