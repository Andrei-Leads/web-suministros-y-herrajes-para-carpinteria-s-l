"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/** Panel lateral derecho (Dialog de Radix: Esc cierra, foco atrapado y devuelto). */
function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

/**
 * Panel de 250 px en #191919 sobre velo negro al 60 % (spec §4.2). Entra y sale en 300 ms
 * (Radix espera a la animación de cierre antes de desmontar). Con «menos movimiento», sin animación.
 */
function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content>) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay
        data-slot="sheet-overlay"
        className="fixed inset-0 z-40 bg-black/60 motion-safe:data-[state=closed]:animate-velo-sale motion-safe:data-[state=open]:animate-velo-entra"
      />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "foco-blanco fixed inset-y-0 right-0 z-50 flex h-full w-[250px] max-w-[86vw] flex-col overflow-y-auto bg-lateral pb-6 text-white motion-safe:data-[state=closed]:animate-panel-sale motion-safe:data-[state=open]:animate-panel-entra",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute top-3 right-3 inline-flex size-12 cursor-pointer items-center justify-center text-lateral-texto hover:text-white">
          <X aria-hidden="true" strokeWidth={1.25} className="size-[34px]" />
          <span className="sr-only">Cerrar menú</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={cn("m-0", className)} {...props} />;
}

export { Sheet, SheetTrigger, SheetContent, SheetTitle };
