import type { Pregunta } from "@andrei-leads/core";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SeparadorDoble } from "@/components/Decorados";
import { antetitulo } from "@/lib/estilos";
import { cn } from "@/lib/utils";

type Props = {
  preguntas: Pregunta[];
  titulo?: string;
  className?: string;
};

/** Preguntas frecuentes: acordeón (respuestas en el HTML sin JavaScript). Vacías: nada. */
export function Preguntas({ preguntas, titulo = "Preguntas frecuentes", className }: Props) {
  if (preguntas.length === 0) return null;
  return (
    <section aria-labelledby="titulo-preguntas" className={cn("pt-[clamp(48px,6vw,90px)] pb-[clamp(48px,6vw,90px)]", className)}>
      <div className="contenedor grid gap-x-6 gap-y-8 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-5">
          <h2 id="titulo-preguntas" className={antetitulo}>
            {titulo}
          </h2>
          <SeparadorDoble />
        </div>
        <Accordion type="single" collapsible className="border-t border-linea">
          {preguntas.map((p, i) => (
            <AccordionItem key={p.pregunta} value={`p-${i}`}>
              <AccordionTrigger>{p.pregunta}</AccordionTrigger>
              <AccordionContent>{p.respuesta}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
