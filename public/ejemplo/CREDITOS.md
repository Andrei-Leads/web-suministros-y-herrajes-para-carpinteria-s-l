# Fotos de ejemplo · demo Suministros y Herrajes para Carpintería (template tienda-1)

Todo lo que hay en esta carpeta (`/ejemplo/`) lleva en la web la etiqueta «Foto de ejemplo». No son fotos del negocio.

- **Origen: generadas con IA (ChatGPT, OpenAI)** con los prompts genéricos del template tienda-1 (`kit/docs/fotos-ejemplo/tienda-1/prompts-chatgpt.md`, archivos `1.N.png`). Importadas el 22/10/2026 con `python3 scripts/importar-ia.py` según `mapa-imagenes.json` (recorte a la proporción del hueco, sin EXIF).
- Las específicas del cliente (`ia-*.png`, `material/leads/…/prompts-imagenes.md`) **no se han generado**. Si llegan, el script las pone en lugar de las `1.N` sin tocar nada más (gana siempre la del cliente).
- **Recortes de subfamilia:** no hay hojas `ia-fNN-recortes.png`; salen de piezas sueltas de las imágenes transparentes 1.1, 1.2 y 1.11 (campo `pieza` del mapa). Las subfamilias sin una pieza que encaje usan `subSinFoto` en `lib/catalogo.ts` (icono, sin archivo). Si llegan las hojas, esas subfamilias vuelven a `sub`.
- **Foto central de cada familia** (`familia-*-contexto.jpg`): sin las `ia-fNN-00-contexto.png`, es la misma imagen que la de la tarjeta (`familia-*.jpg`).
- **Sin imagen:** `portada-productos.jpg` usa la segunda generación del prompt 1.4 (`1.4-b.png`) porque no hay 1.16; «Persiana y mosquitera» no tiene prompt, así que va sin foto (`imagenes: []`, icono).
- Sin texto, logos ni marcas legibles, y sin caras reconocibles (revisado imagen a imagen). Los logos de marcas nunca se generan con IA: la web pinta los nombres en texto.
- Las **fotos reales del negocio** no están aquí, sino en `/fotos/` (sin etiqueta): `004-fachada-del-almacen.jpg` (2:1), `001-interior-del-almacen.jpg` (16:9) y `006-mostrador-del-almacen.jpg` (6:5, provisional). Origen: fotos subidas por el propietario a su ficha de Google; recortadas y sin EXIF. Por eso 1.19, 1.20 y 1.21 no se usan.

## Originales

En Drive: `Suministros y Herrajes para Carpintería S L > ChatGPT` (nombres automáticos de ChatGPT). Para relanzar el script en local, cópialos a `material/fotos-ejemplo/tienda-1/` con estos nombres (1.16 y 1.20 no se generaron; la otra versión de 1.5, «Cilindros y llaves sobre cerradura industrial», se descartó por llevar texto en las llaves):

| Nombre para el script | Nombre en Drive |
|---|---|
| `1.1.png` | Herrajes metálicos para puertas y ventanas.png |
| `1.2.png` | Comparativa de Manillas_ Antes y Después.png |
| `1.3.png` | Herrajes metálicos sobre fondo oscuro.png |
| `1.4.png` | Herrajes metálicos y bisagra blanca.png |
| `1.4-b.png` | Herrajes metálicos sobre fondo oscuro 2.png |
| `1.5.png` | Cerraduras y llaves en penumbra.png |
| `1.6.png` | Herrajes industriales sobre fondo grafito.png |
| `1.7.png` | Herrajes modernos sobre fondo oscuro.png |
| `1.8.png` | Rodillos metálicos para puertas correderas.png |
| `1.9.png` | Composición de sellos de goma y cepillo.png |
| `1.10.png` | Pasillo industrial de almacén profundo.png |
| `1.11.png` | Corona radial de herramientas y herrajes metálicos.png |
| `1.12.png` | Chat de taller con pieza metálica.png |
| `1.13.png` | Comparación de pestillos antiguos y nuevos.png |
| `1.14.png` | Instalación de ventana en reforma.png |
| `1.15.png` | Palé de cajas en almacén industrial.png |
| `1.17.png` | Banco de trabajo de herrajes metálicos.png |
| `1.18.png` | Taller industrial con llamada y herramientas.png |
| `1.19.png` | Fachada industrial con almacén abierto.png |
| `1.21.png` | Demostración de herrajes en el almacén.png |

## Huecos

| Archivo | Prop. | Formato | Dónde se usa | Imagen de hoy | Prevista del cliente (si se genera) |
|---|---|---|---|---|---|
| `hero-bodegon-1.png` | 10:7 | PNG transparente | Hero de inicio, diapositiva 1 (imagenesHero[0]) | 1.1.png | ia-01-bodegon-hero.png |
| `hero-bodegon-2.png` | 10:7 | PNG transparente | Hero de inicio, diapositiva 2 (imagenesHero[1]) | 1.2.png | ia-02-movil-foto-pieza.png |
| `proceso-1.jpg` | 6:5 | JPG | «Cómo trabajamos», tarjeta 1 «Mándanos una foto» (IMAGENES.proceso[0]) y caja «Cómo trabajamos» de /empresa | 1.12.png | ia-02-movil-foto-pieza.png |
| `tile-herrajes-aluminio.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de herrajes-aluminio) | 1.3.png | ia-04-herrajes-aluminio.png |
| `familia-herrajes-aluminio.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[0].imagenes[0]) | 1.3.png | ia-04-herrajes-aluminio.png |
| `familia-herrajes-aluminio-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/herrajes-aluminio (servicios[0].imagenes[1]) mientras no exista ia-f01-00-contexto.png | 1.3.png | ia-04-herrajes-aluminio.png · ia-f01-00-contexto.png |
| `tile-herrajes-pvc-oscilobatientes.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de herrajes-pvc-oscilobatientes) | 1.4.png | ia-05-herrajes-pvc.png |
| `familia-herrajes-pvc-oscilobatientes.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[1].imagenes[0]) | 1.4.png | ia-05-herrajes-pvc.png |
| `familia-herrajes-pvc-oscilobatientes-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/herrajes-pvc-oscilobatientes (servicios[1].imagenes[1]) mientras no exista ia-f02-00-contexto.png | 1.4.png | ia-05-herrajes-pvc.png · ia-f02-00-contexto.png |
| `tile-cerraduras-y-cilindros.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de cerraduras-y-cilindros) | 1.5.png | ia-06-cerraduras.png |
| `familia-cerraduras-y-cilindros.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[2].imagenes[0]) | 1.5.png | ia-06-cerraduras.png |
| `familia-cerraduras-y-cilindros-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/cerraduras-y-cilindros (servicios[2].imagenes[1]) mientras no exista ia-f03-00-contexto.png | 1.5.png | ia-06-cerraduras.png · ia-f03-00-contexto.png |
| `tile-bisagras-y-pernios.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de bisagras-y-pernios) | 1.6.png | ia-07-bisagras-pernios.png |
| `familia-bisagras-y-pernios.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[3].imagenes[0]) | 1.6.png | ia-07-bisagras-pernios.png |
| `familia-bisagras-y-pernios-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/bisagras-y-pernios (servicios[3].imagenes[1]) mientras no exista ia-f04-00-contexto.png | 1.6.png | ia-07-bisagras-pernios.png · ia-f04-00-contexto.png |
| `tile-manillas-y-cremonas.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de manillas-y-cremonas) | 1.7.png | ia-08-manillas.png |
| `familia-manillas-y-cremonas.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[4].imagenes[0]) | 1.7.png | ia-08-manillas.png |
| `familia-manillas-y-cremonas-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/manillas-y-cremonas (servicios[4].imagenes[1]) mientras no exista ia-f05-00-contexto.png | 1.7.png | ia-08-manillas.png · ia-f05-00-contexto.png |
| `tile-rodamientos-y-ruedas-corredera.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de rodamientos-y-ruedas-corredera) | 1.8.png | ia-09-ruedas-corredera.png |
| `familia-rodamientos-y-ruedas-corredera.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[5].imagenes[0]) | 1.8.png | ia-09-ruedas-corredera.png |
| `familia-rodamientos-y-ruedas-corredera-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/rodamientos-y-ruedas-corredera (servicios[5].imagenes[1]) mientras no exista ia-f06-00-contexto.png | 1.8.png | ia-09-ruedas-corredera.png · ia-f06-00-contexto.png |
| `tile-juntas-felpudos-gomas.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de juntas-felpudos-gomas) | 1.9.png | ia-10-juntas-felpudos.png |
| `familia-juntas-felpudos-gomas.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[6].imagenes[0]) | 1.9.png | ia-10-juntas-felpudos.png |
| `familia-juntas-felpudos-gomas-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/juntas-felpudos-gomas (servicios[6].imagenes[1]) mientras no exista ia-f07-00-contexto.png | 1.9.png | ia-10-juntas-felpudos.png · ia-f07-00-contexto.png |
| `composicion.png` | 1:1 | PNG transparente | «Cómo trabajamos» de inicio y /contacto (IMAGENES.composicion). El disco blanco central debe quedar opaco | 1.11.png | ia-12-composicion-circular.png |
| `portada-productos.jpg` | 2.75:1 | JPG oscura | PageHero de /servicios (IMAGENES.portadas.productos). Franja central del 3:2 | 1.4-b.png | ia-19-hero-productos.png |
| `portada-empresa.jpg` | 2.7:1 | JPG oscura | PageHero de /empresa mientras no exista ia-45 | 1.17.png | ia-19-hero-productos.png · ia-45-hero-sobre-nosotros.png |
| `portada-contacto.jpg` | 2.75:1 | JPG oscura | PageHero de /contacto mientras no exista ia-54 | 1.18.png (franja de arriba) | ia-19-hero-productos.png · ia-54-hero-contacto.png |
| `sub-herrajes-aluminio-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/herrajes-aluminio (lib/catalogo.ts) | 1.11.png (pieza suelta) | ia-f01-recortes.png |
| `sub-herrajes-aluminio-2.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 2 de /servicios/herrajes-aluminio (lib/catalogo.ts) | — (sin archivo: icono con `subSinFoto`) | ia-f01-recortes.png |
| `sub-herrajes-aluminio-3.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 3 de /servicios/herrajes-aluminio (lib/catalogo.ts) | — (sin archivo: icono con `subSinFoto`) | ia-f01-recortes.png |
| `sub-herrajes-pvc-oscilobatientes-4.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 4 de /servicios/herrajes-pvc-oscilobatientes (lib/catalogo.ts) | 1.1.png (pieza suelta) | ia-f02-recortes.png |
| `sub-herrajes-pvc-oscilobatientes-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/herrajes-pvc-oscilobatientes (lib/catalogo.ts) | — (sin archivo: icono con `subSinFoto`) | ia-f02-recortes.png |
| `sub-herrajes-pvc-oscilobatientes-2.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 2 de /servicios/herrajes-pvc-oscilobatientes (lib/catalogo.ts) | — (sin archivo: icono con `subSinFoto`) | ia-f02-recortes.png |
| `sub-cerraduras-y-cilindros-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/cerraduras-y-cilindros (lib/catalogo.ts) | 1.11.png (pieza suelta) | ia-f03-recortes.png |
| `sub-cerraduras-y-cilindros-3.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 3 de /servicios/cerraduras-y-cilindros (lib/catalogo.ts) | 1.11.png (pieza suelta) | ia-f03-recortes.png |
| `sub-cerraduras-y-cilindros-4.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 4 de /servicios/cerraduras-y-cilindros (lib/catalogo.ts) | — (sin archivo: icono con `subSinFoto`) | ia-f03-recortes.png |
| `sub-bisagras-y-pernios-2.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 2 de /servicios/bisagras-y-pernios (lib/catalogo.ts) | 1.11.png (pieza suelta) | ia-f04-recortes.png |
| `sub-bisagras-y-pernios-3.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 3 de /servicios/bisagras-y-pernios (lib/catalogo.ts) | — (sin archivo: icono con `subSinFoto`) | ia-f04-recortes.png |
| `sub-bisagras-y-pernios-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/bisagras-y-pernios (lib/catalogo.ts) | 1.11.png (pieza suelta) | ia-f04-recortes.png |
| `sub-manillas-y-cremonas-2.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 2 de /servicios/manillas-y-cremonas (lib/catalogo.ts) | 1.2.png (pieza suelta) | ia-f05-recortes.png |
| `sub-manillas-y-cremonas-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/manillas-y-cremonas (lib/catalogo.ts) | 1.2.png (pieza suelta) | ia-f05-recortes.png |
| `sub-manillas-y-cremonas-3.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 3 de /servicios/manillas-y-cremonas (lib/catalogo.ts) | — (sin archivo: icono con `subSinFoto`) | ia-f05-recortes.png |
| `sub-rodamientos-y-ruedas-corredera-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/rodamientos-y-ruedas-corredera (lib/catalogo.ts) | 1.11.png (pieza suelta) | ia-f06-recortes.png |
| `sub-rodamientos-y-ruedas-corredera-2.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 2 de /servicios/rodamientos-y-ruedas-corredera (lib/catalogo.ts) | 1.1.png (pieza suelta) | ia-f06-recortes.png |
| `sub-rodamientos-y-ruedas-corredera-3.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 3 de /servicios/rodamientos-y-ruedas-corredera (lib/catalogo.ts) | — (sin archivo: icono con `subSinFoto`) | ia-f06-recortes.png |
| `sub-juntas-felpudos-gomas-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/juntas-felpudos-gomas (lib/catalogo.ts) | 1.11.png (pieza suelta) | ia-f07-recortes.png |
| `sub-juntas-felpudos-gomas-2.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 2 de /servicios/juntas-felpudos-gomas (lib/catalogo.ts) | — (sin archivo: icono con `subSinFoto`) | ia-f07-recortes.png |
| `tile-ver-todo.jpg` | 4:3 | JPG oscura | Último tile «Ver todos los productos» de inicio y banda CTA (IMAGENES.verTodo) | 1.10.png | ia-11-ver-todo-almacen.png |
| `proceso-2.jpg` | 6:5 | JPG | «Cómo trabajamos», tarjeta 2 «Ven al mostrador» (IMAGENES.proceso[1]) | 1.13.png | ia-14-mostrador-identificar.png |
| `proceso-3.jpg` | 6:5 | JPG | «Cómo trabajamos», tarjeta 3 «Para profesionales» (IMAGENES.proceso[2]) | 1.14.png | ia-15-instalando-ventana.png |
| `proceso-4.jpg` | 6:5 | JPG | «Cómo trabajamos», tarjeta 4 «Si no la tenemos» (IMAGENES.proceso[3]) | 1.15.png | ia-16-pedidos-preparados.png |
| `empresa-contacta.jpg` | 16:10 | JPG | Caja «Contacta con nosotros» de /empresa (empresa.imagenes[3]) | 1.18.png | ia-50-trato-profesional.png |

Cuadrantes de las hojas 2×2 que no se usan: ver `nota` en `mapa-imagenes.json`.
