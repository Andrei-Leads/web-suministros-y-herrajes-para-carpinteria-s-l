import Link from "next/link";
import type { SiteConfig } from "@andrei-leads/core";
import { ArrowRight } from "lucide-react";

import { LetraTramada, SeparadorDoble } from "@/components/Decorados";
import { buttonVariants } from "@/components/ui/button";
import { antetitulo, display } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  negocio: Pick<SiteConfig["negocio"], "nombre" | "sector" | "descripcionCorta">;
  historia: string[];
};

/**
 * S2 · «Sobre nosotros» (avance). 2/3: h2 display + lema de marca (`sector`) + separador doble,
 * con la letra tramada (inicial del nombre) detrás. 1/3: hasta 3 párrafos destacados de
 * `empresa.historia` (el 3.º atenuado); sin historia, la descripción corta.
 */
export function SobreNosotrosAvance({ negocio, historia }: Props) {
  const parrafos = historia.length > 0 ? historia.slice(0, 3) : [negocio.descripcionCorta];
  return (
    <section aria-labelledby="sobre-nosotros" className="relative overflow-hidden pt-[clamp(64px,10vw,140px)] pb-[clamp(56px,8vw,110px)]">
      <LetraTramada letra={negocio.nombre.charAt(0)} className="top-[35%] md:top-1/2" />
      <div className="contenedor relative z-10 grid gap-x-6 gap-y-10 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-5 lg:pt-[60px]">
          <h2 id="sobre-nosotros" className={display}>
            Sobre nosotros
          </h2>
          <p className={cn(antetitulo, "max-w-[18ch]")}>{negocio.sector}</p>
          <SeparadorDoble className="mt-4" />
        </div>
        <div className="flex flex-col gap-5">
          {parrafos.map((p, i) => (
            <p
              key={i}
              className={cn(
                "m-0 text-[18px] leading-[1.45] font-medium text-pretty md:text-xl md:leading-[1.4]",
                i === 2 ? "text-atenuado" : "text-tinta"
              )}
            >
              {p}
            </p>
          ))}
          <Link href="/empresa" className={cn(buttonVariants({ variant: "enlaceFlecha" }), "self-start")}>
            Conócenos
            <ArrowRight aria-hidden="true" strokeWidth={2} className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
