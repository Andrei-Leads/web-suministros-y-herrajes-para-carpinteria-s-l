import type { Imagen, SiteConfig } from "@andrei-leads/core";

import { LetraTramada, SeparadorDoble } from "@/components/Decorados";
import { Foto } from "@/components/Foto";
import { IMAGENES } from "@/lib/catalogo";
import { antetitulo, cuerpo } from "@/lib/estilos";
import { pasosProceso } from "@/lib/proceso";
import { cn } from "@/lib/utils";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "sector" | "logo">;
  proceso: SiteConfig["proceso"];
  /** Demo: el párrafo del copy vale con y sin WhatsApp (se mantiene la prop por compatibilidad). */
  conWhatsapp: boolean;
};

/** Composición circular de producto con el nombre (o el logo) en el círculo blanco central. */
export function Composicion({ nombre, logo, className }: { nombre: string; logo?: Imagen; className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[520px]", className)}>
      <Foto imagen={IMAGENES.composicion} proporcion="1/1" recorte sizes="(min-width: 1024px) 520px, 90vw" />
      <div className="absolute inset-[31%] flex items-center justify-center rounded-full bg-white p-3 text-center shadow-[0_0_0_1px_rgb(0_0_0/0.06)]">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element -- logo pequeño, sin optimizar (SVG o PNG del cliente)
          <img src={logo.src} alt="" className="max-h-[60%] max-w-[80%] object-contain" />
        ) : (
          <span className="text-[clamp(0.8rem,0.6rem+0.9vw,1.25rem)] leading-[1.1] font-black text-primario text-balance">{nombre}</span>
        )}
      </div>
    </div>
  );
}

/**
 * S5 · «Cómo trabajamos» (spec §5.1; sustituye a la página «Servicios» de Cerda). Fila 1: hueco de
 * 1/6, texto de 1/3 (antetítulo, h2 de 47 px, separador doble y párrafo) y la composición circular.
 * Fila 2: 4 tarjetas con título encima de la foto (6:5) y descripción, de `proceso` (o pasos por
 * defecto). Letra tramada detrás.
 */
export function ComoTrabajamos({ negocio, proceso }: Props) {
  const pasos = pasosProceso(proceso).slice(0, 4);
  return (
    <section id="como-trabajamos" aria-labelledby="titulo-como" className="relative scroll-mt-20 overflow-hidden pt-[clamp(40px,5vw,60px)] pb-[clamp(56px,7vw,100px)]">
      <LetraTramada letra={negocio.sector.charAt(0)} className="top-[22%] left-[2%] md:top-[28%]" />
      <div className="contenedor relative z-10">
        <div className="grid items-center gap-x-6 gap-y-10 lg:grid-cols-[1fr_2fr_3fr]">
          <div className="flex flex-col gap-5 lg:col-start-2">
            <p className={antetitulo}>Cómo trabajamos</p>
            <h2 id="titulo-como" className="m-0 text-[clamp(2rem,1.4rem+2.2vw,2.95rem)] leading-[1.15] font-black text-tinta text-balance">
              Enséñanos la pieza y la buscamos
            </h2>
            <SeparadorDoble className="my-3" />
            <p className={cn(cuerpo, "text-tinta")}>
              En <strong>Suministros y Herrajes</strong> no necesitas saber cómo se llama la pieza. Con una foto, las medidas o
              la pieza vieja en la mano, la identificamos contigo y te decimos qué opciones tienes.
            </p>
          </div>
          <Composicion nombre={negocio.nombre} logo={negocio.logo} />
        </div>

        <ul className="m-0 mt-[clamp(48px,6vw,80px)] grid list-none gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso, i) => {
            const foto = IMAGENES.proceso[i];
            return (
              <li key={paso.titulo} className="group flex flex-col gap-4">
                <h3 className="m-0 text-xl leading-[1.2] font-extrabold text-tinta transition-colors duration-300 group-hover:text-primario">
                  {paso.titulo}
                </h3>
                {foto && (
                  <Foto
                    imagen={foto}
                    proporcion="6/5"
                    sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, 90vw"
                    className="transition-transform duration-300 ease-in-out motion-safe:group-hover:-translate-y-1"
                  />
                )}
                <p className={cuerpo}>{paso.texto}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
