import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BotonLlamada,
  BotonWhatsApp,
  enlacesLegales,
  formatearHorario,
  type SiteConfig,
} from "@andrei-leads/core";
import { ArrowUpRight } from "lucide-react";

import { anioActual } from "@/lib/anio";
import { listaRedes, telefonoVisible } from "@/lib/formato";
import { urlComoLlegar } from "@/lib/llegar";
import { mensajeGeneral } from "@/lib/mensajes";
import type { ItemMenu } from "@/lib/navegacion";

type Props = {
  negocio: SiteConfig["negocio"];
  contacto: SiteConfig["contacto"];
  redes: SiteConfig["redes"];
  items: ItemMenu[];
};

/** Separador corto centrado encima de cada columna (30 × 2 px; 20 px arriba, 15 px abajo). */
function Filete() {
  return <span aria-hidden="true" className="mx-auto mt-5 mb-[15px] block h-0.5 w-[30px] bg-white/35" />;
}

const titulo = "m-0 mb-3 text-xl leading-tight font-bold text-primario-claro";
const enlace = "inline-flex min-h-11 items-center text-[15px] text-white no-underline hover:text-primario-claro";
const etiqueta = "font-bold";

/**
 * Pie negro (spec §4.3): 4 columnas de 1/4 — marca, contacto, menú y horario (la 4.ª sustituye a
 * los logos institucionales del original). Copyright centrado con los legales de core.
 */
export async function Pie({ negocio, contacto, redes, items }: Props) {
  const anio = await anioActual();
  const redesLista = listaRedes(redes);
  const horario = formatearHorario(contacto.horario);
  const { calle, cp, ciudad } = contacto.direccion;

  return (
    <footer className="foco-blanco bg-pie text-white">
      <div className="contenedor grid grid-cols-1 gap-x-6 gap-y-2 pt-6 pb-10 text-[15px] leading-[1.6] sm:grid-cols-2 lg:grid-cols-4 lg:pt-10 lg:pb-14">
        <div>
          <Filete />
          <div className="flex items-center gap-2.5">
            {negocio.logo && (
              <Image src={negocio.logo.src} alt="" width={96} height={32} className="h-8 w-auto max-w-16 object-contain" />
            )}
            <p className="m-0 text-lg leading-tight font-extrabold">{negocio.nombre}</p>
          </div>
          <p className="mt-4 mb-0 max-w-[34ch] font-light text-white/85">{negocio.descripcionCorta}</p>
        </div>

        <div>
          <Filete />
          <h2 className={titulo}>Contacto</h2>
          <p className="m-0">
            <span className={etiqueta}>Teléfono: </span>
            <BotonLlamada telefono={contacto.telefono} className={enlace + " tabular-nums"}>
              {telefonoVisible(contacto.telefono)}
            </BotonLlamada>
          </p>
          {contacto.whatsapp && (
            <p className="m-0">
              <span className={etiqueta}>WhatsApp: </span>
              <BotonWhatsApp numero={contacto.whatsapp} mensaje={mensajeGeneral(contacto)} className={enlace}>
                Escríbenos
              </BotonWhatsApp>
            </p>
          )}
          <p className="m-0">
            <span className={etiqueta}>Email: </span>
            <a href={`mailto:${contacto.email}`} className={enlace + " break-all"}>
              {contacto.email}
            </a>
          </p>
          <p className="mt-4 mb-1 text-primario-claro">Encuéntranos en</p>
          <p className="m-0">
            {calle}
            <br />
            {cp} {ciudad}
          </p>
          <a href={urlComoLlegar(contacto)} target="_blank" rel="noopener noreferrer" className={enlace + " gap-1 font-bold underline underline-offset-4"}>
            Cómo llegar
            <ArrowUpRight aria-hidden="true" strokeWidth={2} className="size-4" />
          </a>
          {redesLista.length > 0 && (
            <ul className="m-0 mt-2 flex list-none flex-wrap gap-x-5 p-0">
              {redesLista.map((r) => (
                <li key={r.href}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className={enlace + " underline underline-offset-4"}>
                    {r.texto}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Pie">
          <Filete />
          <h2 className={titulo}>Menú</h2>
          <ul className="m-0 list-none p-0">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={enlace}>
                  {item.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <Filete />
          <h2 className={titulo}>Horario</h2>
          <dl className="m-0">
            {horario.map((h) => (
              <div key={h.dias} className="mb-2">
                <dt className="font-bold">{h.dias}</dt>
                <dd className="m-0 text-white/85 tabular-nums">{h.horas}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="contenedor flex flex-wrap items-center justify-center gap-x-2 gap-y-0 py-4 text-center text-sm text-white/70">
          <p className="m-0">
            © {anio} {negocio.nombreLegal} · NIF {negocio.nif}
          </p>
          <span aria-hidden="true" className="hidden sm:inline">
            |
          </span>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-0">
            {enlacesLegales.map((l, i) => (
              <Fragment key={l.href}>
                {i > 0 && (
                  <span aria-hidden="true" className="hidden px-1.5 sm:inline">
                    -
                  </span>
                )}
                <Link href={l.href} className="inline-flex min-h-11 items-center text-primario-claro no-underline hover:underline">
                  {l.texto}
                </Link>
              </Fragment>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
