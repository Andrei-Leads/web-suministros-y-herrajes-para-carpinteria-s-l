import type { Imagen } from "@andrei-leads/core";

import { LetraTramada, SeparadorDoble } from "@/components/Decorados";
import { Foto } from "@/components/Foto";
import { anioActual } from "@/lib/anio";
import { antetitulo, display } from "@/lib/estilos";

type Props = {
  anioFundacion?: number;
  ciudad: string;
  imagen?: Imagen;
};

/**
 * S7 · Bloque «Desde {año}» (spec §5.1: sustituye al bloque «grupo» del original). Columnas
 * 1/6 hueco | 1/3 texto | 1/2 foto 16:9 (`empresa.imagenes[1]`), con los años tramados detrás.
 * Sin `negocio.anioFundacion`, no sale.
 */
export async function Trayectoria({ anioFundacion, imagen }: Props) {
  if (!anioFundacion) return null;
  const anios = (await anioActual()) - anioFundacion;
  if (anios < 1) return null;

  return (
    <section aria-labelledby="titulo-trayectoria" className="relative overflow-hidden py-[clamp(48px,6vw,90px)]">
      <LetraTramada letra={String(anios)} className="text-[13rem] leading-none md:text-[22rem] lg:text-[28rem]" />
      <div className="contenedor relative z-10 grid items-center gap-x-6 gap-y-10 lg:grid-cols-[1fr_2fr_3fr]">
        <div className="flex flex-col gap-5 lg:col-start-2">
          <p className={antetitulo}>¡Desde {anioFundacion}!</p>
          <h2 id="titulo-trayectoria" className={`${display} uppercase`}>
            Toda una vida entre herrajes
          </h2>
          <p className="m-0 max-w-[40ch] text-[15px] leading-[1.5] font-bold text-tinta">
            Desde {anioFundacion} hemos visto pasar muchas ventanas. Conocemos piezas que ya no salen en los catálogos y sabemos
            por dónde empezar a buscar las que faltan.
          </p>
          <SeparadorDoble className="mt-2" />
        </div>
        {imagen && <Foto imagen={imagen} proporcion="16/9" sizes="(min-width: 1024px) 660px, 100vw" />}
      </div>
    </section>
  );
}
