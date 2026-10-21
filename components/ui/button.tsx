import { cva } from "class-variance-authority";

/*
 * Variantes de botón del diseño «Almacén» (spec §3.3): planos, radio 0, sin borde,
 * texto blanco en 700-800. Hover (A14): el primario oscurece en 200 ms.
 * Se usan con <a>/<Link> y como className de BotonLlamada / BotonWhatsApp de core.
 * Área táctil ≥ 44 px.
 */
const base =
  "inline-flex items-center justify-center gap-2 no-underline select-none transition-[color,background-color,border-color] duration-200 ease-in-out";
const relleno = "bg-primario text-sobre-primario hover:bg-primario-oscuro";

export const buttonVariants = cva(base, {
  variants: {
    variant: {
      /** Botón de marca estándar («Ver más», «Más información»): 11 px 20 px, 700. */
      principal: `${relleno} min-h-11 px-5 py-[11px] text-[15px] font-bold`,
      /** CTA grande (hero, banda final, contacto): 800, ≥ 52 px. */
      principalGrande: `${relleno} min-h-13 px-6 py-3 text-base font-extrabold`,
      /** Sobre fondo oscuro o de marca: contorno blanco 2 px. */
      contornoClaro:
        "min-h-13 border-2 border-white px-6 py-3 text-base font-bold text-white tabular-nums hover:bg-white/10",
      /** Sobre fondo claro: contorno tinta 2 px. */
      contornoTinta:
        "min-h-13 border-2 border-tinta px-6 py-3 text-base font-bold text-tinta tabular-nums hover:bg-black/5",
      /** Dentro de la caja de marca (horario, sede): blanco con texto de marca. */
      blanco: "min-h-13 bg-white px-6 py-3 text-base font-extrabold text-primario hover:bg-primario-tinte",
      /** Cabecera (spec §4.1): WhatsApp o llamada, 10 px 20 px. */
      cabecera: `${relleno} min-h-11 flex-none px-5 py-2.5 text-[15px] font-bold whitespace-nowrap tabular-nums`,
      /** Barra móvil: WhatsApp de marca a la izquierda, Llamar en tinta a la derecha. */
      barraWhatsapp: `${relleno} min-h-12 flex-1 px-3 text-base font-bold`,
      barraLlamar: "min-h-12 flex-1 bg-tinta px-3 text-base font-bold text-white hover:bg-black",
      /** Texto con flecha. */
      enlaceFlecha:
        "min-h-11 justify-start font-bold text-tinta underline underline-offset-4 hover:text-primario",
    },
  },
  defaultVariants: {
    variant: "principal",
  },
});
