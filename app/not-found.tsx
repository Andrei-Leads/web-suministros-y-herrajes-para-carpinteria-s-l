import type { Metadata } from "next";
import Link from "next/link";
import { BotonLlamada, BotonWhatsApp } from "@andrei-leads/core";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import config from "@/site.config";
import { LetraTramada, SeparadorDoble } from "@/components/Decorados";
import { buttonVariants } from "@/components/ui/button";
import { antetitulo, display } from "@/lib/estilos";
import { telefonoVisible } from "@/lib/formato";
import { MENSAJE_NO_ENCONTRADA } from "@/lib/mensajes";

// Next añade <meta name="robots" content="noindex"> a toda respuesta 404. Aquí se
// anulan el robots y el canonical «/» que heredaría del layout.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: null,
  alternates: { canonical: null },
};

const enlaces = [
  { href: "/", texto: "Volver al inicio" },
  { href: "/servicios", texto: "Ver los productos" },
  { href: "/contacto", texto: "Contacto y horario" },
];

/** 404 de «Almacén»: «404» tramado detrás, h1 display, enlaces con flecha y llamada / WhatsApp. */
export default function NotFound() {
  const { telefono, whatsapp } = config.contacto;
  return (
    <section className="relative overflow-hidden py-[clamp(64px,10vw,140px)]">
      <LetraTramada letra="404" className="text-[10rem] leading-none md:text-[20rem] lg:text-[26rem]" />
      <div className="contenedor relative z-10 grid items-start gap-x-6 gap-y-10 lg:grid-cols-[1fr_2fr_2fr]">
        <div className="flex flex-col gap-5 lg:col-start-2">
          <p className={antetitulo}>Error 404</p>
          <h1 className={display}>No encontramos esta página</h1>
          <SeparadorDoble />
          <p className="m-0 max-w-[48ch] text-lg leading-[1.5] font-medium text-tinta">
            Puede que el enlace esté mal o que la página ya no exista. Mira los productos o pregúntanos lo que buscabas.
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:pt-4">
          <nav aria-label="Páginas principales">
            <ul className="m-0 flex list-none flex-col p-0">
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className={buttonVariants({ variant: "enlaceFlecha" })}>
                    {e.texto}
                    <ArrowRight aria-hidden="true" strokeWidth={2} className="size-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-3">
            {whatsapp && (
              <BotonWhatsApp numero={whatsapp} mensaje={MENSAJE_NO_ENCONTRADA} className={buttonVariants({ variant: "principalGrande" })}>
                <MessageCircle aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
                Pregúntanos por WhatsApp
              </BotonWhatsApp>
            )}
            <BotonLlamada telefono={telefono} className={buttonVariants({ variant: whatsapp ? "contornoTinta" : "principalGrande" })}>
              <Phone aria-hidden="true" strokeWidth={2} className="size-5 flex-none" />
              <span>Llamar · {telefonoVisible(telefono)}</span>
            </BotonLlamada>
          </div>
        </div>
      </div>
    </section>
  );
}
