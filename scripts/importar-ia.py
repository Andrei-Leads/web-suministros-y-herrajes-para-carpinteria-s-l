#!/usr/bin/env python3
"""
Importa las imágenes de IA de la demo a los huecos del template (public/ejemplo/).

Uso, desde la carpeta de la demo (web-suministros-y-herrajes-para-carpinteria-s-l/):

    python3 scripts/importar-ia.py                 # importa las que haya y lista las que faltan
    python3 scripts/importar-ia.py --listar        # solo dice qué haría, sin escribir nada
    python3 scripts/importar-ia.py --quitar-fondo  # además, quita el fondo blanco liso de los recortes
    python3 scripts/importar-ia.py --ia /otra/carpeta --ia-template /otra/mas

Qué hace:
- Lee mapa-imagenes.json (en la raíz de la demo): qué archivo de prompts-imagenes.md va a qué hueco,
  con qué proporción, tamaño y si es PNG transparente.
- Dos fuentes (mapa → «fuentes»):
    · «leads»: ia-*.png de material/leads/suministros-y-herrajes-para-carpinteria-s-l/ia/
      (prompts-imagenes.md, específicos del cliente);
    · «template»: 1.N.png de material/fotos-ejemplo/tienda-1/ (kit/docs/fotos-ejemplo/tienda-1/prompts-chatgpt.md).
  Si un hueco tiene imagen de las dos, gana la del lead. Orden: principal del lead > respaldo del
  lead > principal del template > respaldo del template.
- Toma las imágenes que existan; los huecos sin ninguna se quedan con el relleno gris y se listan
  al final, hueco por hueco. No falla si las carpetas están vacías o no existen.
- Recorta o encaja cada una en su hueco, la escala (nunca amplía) y la guarda SIN EXIF ni metadatos,
  con el nombre exacto del hueco, en public/ejemplo/. Las hojas 2×2 se trocean en 4 recortes.
- «foco» [x, y] (0–1) mueve la ventana de recorte de «cubrir» (por defecto, centrada).
- «pieza» [x0, y0, x1, y1] saca una sola pieza de un PNG transparente con varias (p. ej. un recorte
  de subfamilia de la composición): recorta la caja y deja solo la pieza más grande de dentro.
- Si un hueco tiene imagen principal y de respaldo («respaldo»: true), usa la principal si existe.
- Se puede relanzar las veces que haga falta: siempre parte de los originales de ia/ y sustituye
  los mismos archivos de destino.

Después de importar: `NODE_ENV=production pnpm build`, reiniciar `pnpm start` y recargar sin caché del
navegador. El script ya borra .next/cache/images (Next cachea las imágenes por URL, no por contenido).

Las imágenes de IA siguen en /ejemplo/, así que la web les pone la etiqueta «Foto de ejemplo».
Necesita Pillow (python3 del sistema; el venv del scraper no lo trae).
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import sys
import tempfile
from collections import deque
from pathlib import Path

try:
    from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps
except ImportError:  # pragma: no cover
    sys.exit("Falta Pillow: usa el python3 del sistema (python3 -c 'import PIL') o instala python3-pil.")

RAIZ = Path(__file__).resolve().parent.parent
CUADRANTES = {
    "arriba-izquierda": (0, 0),
    "arriba-derecha": (1, 0),
    "abajo-izquierda": (0, 1),
    "abajo-derecha": (1, 1),
}


def proporcion(texto: str) -> float:
    a, b = texto.split(":")
    return float(a) / float(b)


def color(hex_: str) -> tuple[int, int, int]:
    hex_ = hex_.lstrip("#")
    return tuple(int(hex_[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def abrir(ruta: Path) -> Image.Image:
    im = Image.open(ruta)
    im = ImageOps.exif_transpose(im)
    return im.convert("RGBA")


def tiene_alfa_real(im: Image.Image) -> bool:
    """¿Hay píxeles de verdad transparentes? (un PNG con canal alfa todo opaco no cuenta)."""
    minimo, _ = im.getchannel("A").getextrema()
    return minimo < 250


def quitar_fondo_blanco(im: Image.Image, umbral: int = 238) -> Image.Image:
    """Hace transparente el blanco liso conectado con los bordes (no toca blancos interiores)."""
    r, g, b = im.convert("RGB").split()
    # «Blanco» solo si los tres canales lo son (evita grises claros de las piezas).
    minimo = ImageChops.darker(ImageChops.darker(r, g), b)
    claro = minimo.point(lambda v: 255 if v >= umbral else 0)
    w, h = im.size
    paso = max(1, min(w, h) // 200)
    puntos = [(x, 0) for x in range(0, w, paso)] + [(x, h - 1) for x in range(0, w, paso)]
    puntos += [(0, y) for y in range(0, h, paso)] + [(w - 1, y) for y in range(0, h, paso)]
    for p in puntos:
        if claro.getpixel(p) == 255:
            ImageDraw.floodfill(claro, p, 128)
    fondo = Image.eval(claro, lambda v: 255 if v == 128 else 0).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1))
    alfa = Image.eval(fondo, lambda v: 255 - v)
    salida = im.copy()
    salida.putalpha(Image.composite(alfa, Image.new("L", im.size, 0), im.getchannel("A")))
    return salida


def recortar_a(im: Image.Image, prop: float, foco: tuple[float, float] = (0.5, 0.5)) -> Image.Image:
    """Recorte a la proporción pedida. `foco` (0–1) sitúa la ventana: (0.5, 0.5) = centrado
    (las portadas se quedan con la franja central); (0.5, 0) = franja de arriba."""
    w, h = im.size
    if w / h > prop:
        nw = round(h * prop)
        x = round((w - nw) * foco[0])
        return im.crop((x, 0, x + nw, h))
    nh = round(w / prop)
    y = round((h - nh) * foco[1])
    return im.crop((0, y, w, y + nh))


def reducir(im: Image.Image, maximo: tuple[int, int]) -> Image.Image:
    """Escala para caber en `maximo` sin ampliar nunca."""
    f = min(maximo[0] / im.width, maximo[1] / im.height, 1.0)
    if f >= 1.0:
        return im
    return im.resize((max(1, round(im.width * f)), max(1, round(im.height * f))), Image.LANCZOS)


def ajustar_al_contenido(im: Image.Image, margen: float = 0.06) -> Image.Image:
    """Recorta al objeto (alfa, o lo que no es blanco) con un margen, para las hojas de recortes."""
    if tiene_alfa_real(im):
        caja = im.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox()
    else:
        gris = im.convert("L").point(lambda v: 255 if v < 238 else 0)
        caja = gris.getbbox()
    if not caja:
        return im
    x0, y0, x1, y1 = caja
    m = round(max(x1 - x0, y1 - y0) * margen)
    return im.crop((max(0, x0 - m), max(0, y0 - m), min(im.width, x1 + m), min(im.height, y1 + m)))


def aislar_pieza(im: Image.Image, caja: list[int]) -> Image.Image:
    """Recorta `caja` (x0, y0, x1, y1, en píxeles del original) y deja solo la pieza más grande
    (alfa conectado): los trozos de las piezas vecinas que caen dentro de la caja se vuelven transparentes."""
    trozo_ = im.crop(tuple(caja))
    f = 2  # se etiqueta a media resolución (rápido y suficiente para separar piezas)
    sw, sh = max(1, trozo_.width // f), max(1, trozo_.height // f)
    a = trozo_.getchannel("A").resize((sw, sh), Image.BOX).load()
    visto = bytearray(sw * sh)
    mejor: list[tuple[int, int]] = []
    for y in range(sh):
        for x in range(sw):
            if a[x, y] <= 20 or visto[y * sw + x]:
                continue
            visto[y * sw + x] = 1
            cola, comp = deque([(x, y)]), []
            while cola:
                cx, cy = cola.popleft()
                comp.append((cx, cy))
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= nx < sw and 0 <= ny < sh and not visto[ny * sw + nx] and a[nx, ny] > 20:
                        visto[ny * sw + nx] = 1
                        cola.append((nx, ny))
            if len(comp) > len(mejor):
                mejor = comp
    mascara = Image.new("L", (sw, sh), 0)
    pm = mascara.load()
    for x, y in mejor:
        pm[x, y] = 255
    # Un poco más ancha para no comerse el borde suavizado de la pieza.
    mascara = mascara.filter(ImageFilter.MaxFilter(5)).resize(trozo_.size, Image.NEAREST)
    salida = trozo_.copy()
    salida.putalpha(ImageChops.multiply(trozo_.getchannel("A"), mascara))
    return salida


def encajar(im: Image.Image, tamano: tuple[int, int], fondo: tuple[int, int, int, int]) -> Image.Image:
    """La imagen entera dentro del lienzo `tamano`, centrada, sobre `fondo`. Si es más pequeña que
    el lienzo (y no basta con ampliarla un 25 %), se reduce el lienzo, no se amplía la imagen."""
    pieza = im.copy()
    pieza.thumbnail(tamano, Image.LANCZOS)  # escala hacia abajo; si es más pequeña, la deja
    if pieza.width < tamano[0] and pieza.height < tamano[1]:
        f = min(tamano[0] / pieza.width, tamano[1] / pieza.height)
        if f <= 1.25:  # ampliación mínima para llenar el hueco, nunca más de un 25 %
            pieza = pieza.resize((round(pieza.width * f), round(pieza.height * f)), Image.LANCZOS)
        else:  # lienzo con la misma proporción, ajustado a la pieza: así la pieza llena el hueco
            tamano = (round(tamano[0] / f), round(tamano[1] / f))
    lienzo = Image.new("RGBA", tamano, fondo)
    lienzo.alpha_composite(pieza, ((tamano[0] - pieza.width) // 2, (tamano[1] - pieza.height) // 2))
    return lienzo


def aplanar(im: Image.Image, fondo: tuple[int, int, int]) -> Image.Image:
    base = Image.new("RGBA", im.size, fondo + (255,))
    base.alpha_composite(im)
    return base.convert("RGB")


def guardar(im: Image.Image, destino: Path, formato: str, calidad: int) -> None:
    """Guarda en limpio (sin EXIF, ICC ni texto PNG) y de forma atómica."""
    limpia = Image.new(im.mode, im.size)
    limpia.paste(im)
    destino.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=destino.parent, suffix=destino.suffix)
    os.close(fd)
    try:
        if formato == "jpg":
            limpia.convert("RGB").save(tmp, "JPEG", quality=calidad, optimize=True, progressive=True)
        else:
            limpia.save(tmp, "PNG", optimize=True)
        os.replace(tmp, destino)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)


def procesar(im: Image.Image, hueco: dict, quitar_fondo: bool, avisos: list[str], nombre: str) -> Image.Image:
    tamano = tuple(hueco["tamano"])
    prop = proporcion(hueco["proporcion"])
    ajuste = hueco["ajuste"]
    alfa = tiene_alfa_real(im)
    fondo_jpg = color(hueco.get("fondo", "#f2f2f2"))

    if hueco["transparente"] and not alfa:
        if quitar_fondo and not hueco.get("conservar_blanco"):
            im = quitar_fondo_blanco(im)
            avisos.append(f"{nombre} → {hueco['destino']}: fondo blanco quitado automáticamente; revísalo.")
        else:
            avisos.append(
                f"{nombre} → {hueco['destino']}: NO TIENE TRANSPARENCIA REAL (saldrá con fondo). "
                "Pide a ChatGPT el PNG transparente o relanza con --quitar-fondo."
            )

    foco = tuple(hueco.get("foco", (0.5, 0.5)))
    if ajuste == "cubrir":
        salida = reducir(recortar_a(im, prop, foco), tamano)
    elif ajuste == "contener-fondo":
        if alfa:
            salida = encajar(im, tamano, fondo_jpg + (255,))
        else:  # sin alfa es una foto normal: recorte como las demás
            salida = reducir(recortar_a(im, prop, foco), tamano)
    else:  # contener (PNG transparente)
        salida = encajar(im, tamano, (0, 0, 0, 0))

    if hueco["formato"] == "jpg":
        return aplanar(salida.convert("RGBA"), fondo_jpg)
    return salida.convert("RGBA")


def trozo(hoja: Image.Image, cuadrante: str) -> Image.Image:
    cx, cy = CUADRANTES[cuadrante]
    w, h = hoja.size
    return hoja.crop((cx * w // 2, cy * h // 2, (cx + 1) * w // 2, (cy + 1) * h // 2))


def main() -> int:
    p = argparse.ArgumentParser(description="Importa las imágenes de IA a public/ejemplo/ según mapa-imagenes.json.")
    p.add_argument("--mapa", type=Path, default=RAIZ / "mapa-imagenes.json")
    p.add_argument("--ia", type=Path, help="carpeta de las ia-*.png del lead (por defecto, la del mapa)")
    p.add_argument("--ia-template", type=Path, help="carpeta de las 1.N.png del template (por defecto, la del mapa)")
    p.add_argument("--listar", action="store_true", help="no escribe nada: solo dice qué haría")
    p.add_argument("--quitar-fondo", action="store_true", help="quita el blanco liso de los recortes que no traen transparencia")
    args = p.parse_args()

    mapa = json.loads(args.mapa.read_text(encoding="utf-8"))
    destino_dir = (RAIZ / mapa["carpeta_destino"]).resolve()
    calidad = int(mapa.get("calidad_jpg", 82))
    orden = mapa.get("orden_fuentes", list(mapa["fuentes"]))
    forzadas = {"leads": args.ia, "template": args.ia_template}

    # Carpeta y archivos presentes de cada fuente. Si no existe, la fuente cuenta como vacía.
    carpetas: dict[str, Path] = {}
    existentes: dict[str, set[str]] = {}
    for fuente, datos in mapa["fuentes"].items():
        carpeta = (forzadas.get(fuente) or (RAIZ / datos["carpeta"])).resolve()
        carpetas[fuente] = carpeta
        existentes[fuente] = {f.name for f in carpeta.iterdir() if f.is_file()} if carpeta.is_dir() else set()
        print(f"Fuente {fuente:<9} {carpeta}" + (f"  ({len(existentes[fuente])} archivos)" if carpeta.is_dir() else "  (no existe: vacía)"))
    print(f"Destino          {destino_dir}\n")

    def hay(arch: dict) -> bool:
        return arch["archivo"] in existentes.get(arch.get("fuente", "leads"), set())

    # Candidatos de cada hueco, ordenados: principal del lead > respaldo del lead > principal del template > respaldo del template.
    candidatos: dict[str, list[tuple[tuple[int, int], dict, dict]]] = {}
    for arch in mapa["archivos"]:
        rango_fuente = orden.index(arch.get("fuente", "leads"))
        for hueco in arch["huecos"]:
            if hueco.get("destino"):
                rango = (rango_fuente, 1 if hueco.get("respaldo") else 0)
                candidatos.setdefault(hueco["destino"], []).append((rango, arch, hueco))
    elegido: dict[str, tuple[dict, dict]] = {}
    for destino, lista in candidatos.items():
        lista.sort(key=lambda c: c[0])
        hit = next(((a, h) for _, a, h in lista if hay(a)), None)
        if hit:
            elegido[destino] = hit

    hechos: list[str] = []
    avisos: list[str] = []
    errores: list[str] = []
    abiertas: dict[tuple[str, str], Image.Image] = {}

    for destino, (arch, hueco) in sorted(elegido.items()):
        nombre, fuente = arch["archivo"], arch.get("fuente", "leads")
        etiqueta = (
            f"{destino:<48} ← {nombre} ({fuente})"
            + (f" [{hueco['cuadrante']}]" if hueco.get("cuadrante") else "")
            + (" [respaldo]" if hueco.get("respaldo") else "")
        )
        if args.listar:
            hechos.append(etiqueta)
            continue
        try:
            clave = (fuente, nombre)
            if clave not in abiertas:
                abiertas[clave] = abrir(carpetas[fuente] / nombre)
            im = abiertas[clave]
            if arch.get("hoja_2x2"):
                im = ajustar_al_contenido(trozo(im, hueco["cuadrante"]))
            elif hueco.get("pieza"):
                im = ajustar_al_contenido(aislar_pieza(im, hueco["pieza"]))
            salida = procesar(im, hueco, args.quitar_fondo, avisos, nombre)
            guardar(salida, destino_dir / destino, hueco["formato"], calidad)
            hechos.append(f"{etiqueta}  {salida.width}×{salida.height}")
        except Exception as e:  # una imagen rota no para las demás
            errores.append(f"{destino} ← {nombre} ({fuente}): {e}")

    # Huecos sin ninguna imagen: siguen con el relleno gris. Se dice qué archivo lo llenaría de cada fuente.
    faltan = []
    for destino, lista in candidatos.items():
        if destino in elegido:
            continue
        prio = min(a["prioridad"] for _, a, h in lista if not h.get("respaldo")) if any(not h.get("respaldo") for _, a, h in lista) else 9
        opciones = []
        for _, a, h in lista:
            txt = f"{a['archivo']} ({a.get('fuente', 'leads')}" + (", respaldo" if h.get("respaldo") else "") + ")"
            if txt not in opciones:
                opciones.append(txt)
        faltan.append((prio, destino, opciones))
    sin_hueco = [a for a in mapa["archivos"] if not a["huecos"]]
    conocidos = {(a.get("fuente", "leads"), a["archivo"]) for a in mapa["archivos"]}
    sobran = sorted(f"{nombre} ({fuente})" for fuente, nombres in existentes.items() for nombre in nombres if (fuente, nombre) not in conocidos)

    print(("Se importarían" if args.listar else "Importadas") + f" ({len(hechos)}):")
    for h in hechos or ["(ninguna)"]:
        print("  " + h)
    print(f"\nHuecos sin imagen de IA ({len(faltan)} de {len(candidatos)}; siguen con el relleno gris):")
    for prio, destino, opciones in sorted(faltan, key=lambda f: (f[0], f[1])):
        print(f"  prioridad {prio if prio < 9 else '-'}  {destino:<48} ← " + " · ".join(opciones))
    if sin_hueco:
        print("\nSin hueco en esta demo (no se importan):")
        for a in sin_hueco:
            print(f"  {a['archivo']} ({a.get('fuente', 'leads')}): {a.get('sin_hueco', '')}")
    if sobran:
        print("\nArchivos que no están en el mapa (¿nombre mal escrito?):")
        for x in sobran:
            print("  " + x)
    for titulo, lista in (("Avisos", avisos), ("Errores", errores)):
        if lista:
            print(f"\n{titulo}:")
            for x in lista:
                print("  " + x)
    if hechos and not args.listar:
        # Next guarda las imágenes optimizadas por URL (no por contenido) y sobreviven al build: se borran.
        cache = RAIZ / ".next" / "cache" / "images"
        if cache.is_dir():
            shutil.rmtree(cache, ignore_errors=True)
            print("\nBorrada la caché de imágenes de Next (.next/cache/images).")
        print("\nAhora: NODE_ENV=production pnpm build, reinicia pnpm start y recarga sin caché del navegador.")
    return 1 if errores else 0


if __name__ == "__main__":
    sys.exit(main())
