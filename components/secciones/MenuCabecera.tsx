"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Minus, Plus } from "lucide-react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { ItemMenu } from "@/lib/navegacion";
import { menuTexto } from "@/lib/estilos";
import { cn } from "@/lib/utils";

/** "page" si es la ruta exacta, "true" si estamos dentro de la sección (p. ej. /servicios/x). */
function actual(pathname: string, href: string): "page" | "true" | undefined {
  if (pathname === href) return "page";
  if (href === "/") return undefined;
  return pathname.startsWith(href + "/") ? "true" : undefined;
}

/**
 * Menú de escritorio (desde 1240 px). A2: el activo y el hover pasan a la marca y muestran una
 * barra de 4 px pegada al borde inferior de la cabecera. A3: desplegable de familias en #F2F2F2,
 * visible con hover o con el foco dentro (teclado), 200 ms.
 */
export function NavEscritorio({ items }: { items: ItemMenu[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Principal" className="hidden h-full ancho:block">
      <ul className="m-0 flex h-full list-none p-0">
        {items.map((item) => (
          <li key={item.href} className="group/item relative flex h-full">
            <Link
              href={item.href}
              aria-current={actual(pathname, item.href)}
              className={cn(
                menuTexto,
                "relative flex h-full items-center px-5 text-nav no-underline transition-colors duration-200 hover:text-primario aria-[current]:text-primario",
                "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:origin-center after:scale-x-0 after:bg-primario after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100 aria-[current]:after:scale-x-100"
              )}
            >
              {item.texto}
            </Link>
            {item.hijos && item.hijos.length > 0 && (
              <ul className="invisible absolute top-full left-0 z-10 m-0 min-w-[260px] -translate-y-1 list-none bg-submenu p-0 py-2 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-in-out group-focus-within/item:visible group-focus-within/item:translate-y-0 group-focus-within/item:opacity-100 group-hover/item:visible group-hover/item:translate-y-0 group-hover/item:opacity-100">
                {item.hijos.map((h) => (
                  <li key={h.href}>
                    <Link
                      href={h.href}
                      aria-current={pathname === h.href ? "page" : undefined}
                      className="flex min-h-11 items-center px-5 text-[15px] font-medium text-[#5f5f5f] no-underline transition-colors duration-200 ease-in-out hover:bg-black/5 hover:text-[#2e2e2e] aria-[current]:text-primario"
                    >
                      {h.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

type Props = {
  items: ItemMenu[];
  /**
   * Botones de contacto del panel, ya renderizados por el servidor (Cabecera). Este archivo es
   * "use client": no importa valores de `@andrei-leads/core` ni de `@/site.config`.
   */
  acciones: ReactNode;
};

const enlaceLateral = cn(
  menuTexto,
  "flex min-h-12 flex-1 items-center py-[11px] pr-1 pl-5 text-lateral-texto no-underline hover:text-white aria-[current]:text-white"
);

/**
 * A4 · Menú lateral (por debajo de 1240 px): panel derecho de 250 px en #191919 que entra en
 * 300 ms sobre un velo negro al 60 %. Los submenús se abren con «+» / «−». Radix Dialog:
 * foco atrapado, Esc cierra y bloquea el scroll del body.
 */
export function MenuMovil({ items, acciones }: Props) {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [desplegado, setDesplegado] = useState<string | null>(null);
  const navegando = useRef(false);

  function navegar() {
    navegando.current = true;
    setAbierto(false);
  }

  return (
    <Sheet open={abierto} onOpenChange={setAbierto}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex size-12 flex-none cursor-pointer flex-col items-center justify-center gap-[5px] text-primario ancho:hidden"
        >
          <span aria-hidden="true" className="h-[3px] w-[26px] bg-current" />
          <span aria-hidden="true" className="h-[3px] w-[26px] bg-current" />
          <span aria-hidden="true" className="h-[3px] w-[26px] bg-current" />
          <span className="sr-only">Abrir menú</span>
        </button>
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        onCloseAutoFocus={(e) => {
          if (navegando.current) {
            e.preventDefault();
            navegando.current = false;
          }
        }}
      >
        <SheetTitle className="sr-only">Menú</SheetTitle>
        <nav aria-label="Menú móvil" className="mt-16">
          <ul className="m-0 list-none p-0">
            {items.map((item) => {
              const conHijos = item.hijos && item.hijos.length > 0;
              const abiertoSub = desplegado === item.href;
              const idSub = `submenu-${item.href.replace(/\W/g, "") || "inicio"}`;
              return (
                <li key={item.href} className="border-t border-white/[0.06]">
                  <div className="flex items-stretch">
                    <Link
                      href={item.href}
                      onClick={navegar}
                      aria-current={actual(pathname, item.href)}
                      className={enlaceLateral}
                    >
                      {item.texto}
                    </Link>
                    {conHijos && (
                      <button
                        type="button"
                        aria-expanded={abiertoSub}
                        aria-controls={idSub}
                        onClick={() => setDesplegado(abiertoSub ? null : item.href)}
                        className="flex w-12 flex-none cursor-pointer items-center justify-center text-lateral-texto hover:text-white"
                      >
                        {abiertoSub ? (
                          <Minus aria-hidden="true" strokeWidth={1.5} className="size-5" />
                        ) : (
                          <Plus aria-hidden="true" strokeWidth={1.5} className="size-5" />
                        )}
                        <span className="sr-only">{abiertoSub ? "Cerrar" : "Abrir"} {item.texto}</span>
                      </button>
                    )}
                  </div>
                  {conHijos && (
                    <ul id={idSub} hidden={!abiertoSub} className="m-0 list-none bg-black/30 p-0 pb-2">
                      {item.hijos!.map((h) => (
                        <li key={h.href}>
                          <Link
                            href={h.href}
                            onClick={navegar}
                            aria-current={pathname === h.href ? "page" : undefined}
                            className="flex min-h-11 items-center py-2 pr-3 pl-8 text-[15px] leading-tight text-lateral-texto no-underline hover:text-white aria-[current]:text-white"
                          >
                            {h.texto}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-6 flex flex-col gap-2 border-t border-white/[0.06] px-5 pt-6">{acciones}</div>
      </SheetContent>
    </Sheet>
  );
}
