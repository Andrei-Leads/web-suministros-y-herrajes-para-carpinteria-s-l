import Image from "next/image";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp, type Imagen, type SiteConfig } from "@andrei-leads/core";
import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { telefonoVisible } from "@/lib/formato";
import { mensajeGeneral } from "@/lib/mensajes";
import type { ItemMenu } from "@/lib/navegacion";
import { cn } from "@/lib/utils";
import { CabeceraFija } from "./CabeceraFija";
import { MenuMovil, NavEscritorio } from "./MenuCabecera";

type Props = {
  nombre: string;
  logo?: Imagen;
  contacto: SiteConfig["contacto"];
  items: ItemMenu[];
};

/**
 * Cabecera blanca a todo el ancho (spec §4.1): logo + nombre a la izquierda, menú a la derecha y,
 * desde 768 px, el botón de WhatsApp (o de llamada si no hay WhatsApp). Por debajo de 1240 px,
 * hamburguesa de marca. Se vuelve fija al hacer scroll (CabeceraFija).
 */
export function Cabecera({ nombre, logo, contacto, items }: Props) {
  const largo = nombre.length > 30;
  return (
    <CabeceraFija>
      <div className="flex h-full items-center gap-3 pr-3 pl-4 md:pr-5 md:pl-6 ancho:gap-4 ancho:pl-[25px]">
        <Link href="/" className="mr-auto flex min-h-11 min-w-0 items-center gap-2.5 text-tinta no-underline">
          {logo && (
            <Image
              src={logo.src}
              alt=""
              width={96}
              height={32}
              className="h-8 w-auto max-w-16 flex-none object-contain object-left"
            />
          )}
          <span
            className={cn(
              "line-clamp-2 min-w-0 font-extrabold tracking-[-0.01em] text-balance",
              largo
                ? "text-[15px] leading-[1.15] md:text-[17px] group-data-fija/cab:md:text-[15px]"
                : "text-lg leading-[1.15] md:text-[22px] group-data-fija/cab:md:text-lg"
            )}
          >
            {nombre}
          </span>
        </Link>

        <NavEscritorio items={items} />

        {contacto.whatsapp ? (
          <BotonWhatsApp
            numero={contacto.whatsapp}
            mensaje={mensajeGeneral(contacto)}
            className={cn(buttonVariants({ variant: "cabecera" }), "hidden md:inline-flex")}
          >
            <MessageCircle aria-hidden="true" strokeWidth={2} className="size-[18px] flex-none" />
            <span>WhatsApp</span>
          </BotonWhatsApp>
        ) : (
          <BotonLlamada
            telefono={contacto.telefono}
            className={cn(buttonVariants({ variant: "cabecera" }), "hidden md:inline-flex")}
          >
            <Phone aria-hidden="true" strokeWidth={2} className="size-[18px] flex-none" />
            <span>{telefonoVisible(contacto.telefono)}</span>
          </BotonLlamada>
        )}

        <MenuMovil
          items={items}
          acciones={
            <>
              {contacto.whatsapp && (
                <BotonWhatsApp
                  numero={contacto.whatsapp}
                  mensaje={mensajeGeneral(contacto)}
                  className={cn(buttonVariants({ variant: "principalGrande" }), "w-full")}
                >
                  <MessageCircle aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                  WhatsApp
                </BotonWhatsApp>
              )}
              <BotonLlamada
                telefono={contacto.telefono}
                className={cn(buttonVariants({ variant: "contornoClaro" }), "w-full px-3")}
              >
                <Phone aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                <span>Llamar</span>
              </BotonLlamada>
            </>
          }
        />
      </div>
    </CabeceraFija>
  );
}
