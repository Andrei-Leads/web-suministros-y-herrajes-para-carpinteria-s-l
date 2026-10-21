import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

type Props = {
  telefono: string;
  whatsapp?: string;
  mensaje: string;
};

/**
 * Barra inferior (solo < 768 px): WhatsApp (marca) | Llamar (tinta). Sin WhatsApp, Llamar a todo
 * el ancho. Sticky y último hijo del body: al final queda debajo del pie sin taparlo.
 */
export function BarraMovil({ telefono, whatsapp, mensaje }: Props) {
  return (
    <div className="sticky bottom-0 z-30 flex gap-2 border-t border-linea bg-superficie px-4 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] shadow-barra md:hidden">
      {whatsapp && (
        <BotonWhatsApp numero={whatsapp} mensaje={mensaje} className={buttonVariants({ variant: "barraWhatsapp" })}>
          <MessageCircle aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
          <span>WhatsApp</span>
        </BotonWhatsApp>
      )}
      <BotonLlamada telefono={telefono} className={buttonVariants({ variant: "barraLlamar" })}>
        <Phone aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
        <span>Llamar</span>
      </BotonLlamada>
    </div>
  );
}
