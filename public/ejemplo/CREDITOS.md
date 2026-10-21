# Fotos de ejemplo · demo Suministros y Herrajes para Carpintería (template tienda-1)

Todo lo que hay en esta carpeta (`/ejemplo/`) lleva en la web la etiqueta «Foto de ejemplo». No son fotos del negocio.

- **Hoy son relleno gris** (rayado con el nombre del archivo y la proporción), generado con Pillow.
- **Origen previsto: generadas con IA (ChatGPT, OpenAI).** Hay dos juegos de prompts: el específico de esta demo (archivos `ia-*.png`) y el genérico del template tienda-1 (archivos `1.N.png`). Si hay imagen de los dos para un mismo hueco, se usa siempre la específica. Se importan con `python3 scripts/importar-ia.py` según `mapa-imagenes.json` (recorte a la proporción del hueco, sin EXIF). Al importar una, su archivo deja de ser relleno; la etiqueta se mantiene.
- Sin texto, logos ni marcas legibles, y sin caras reconocibles. Los logos de marcas nunca se generan con IA: la web pinta los nombres en texto.
- Las **fotos reales del negocio** no están aquí, sino en `/fotos/` (sin etiqueta): `004-fachada-del-almacen.jpg` (2:1), `001-interior-del-almacen.jpg` (16:9) y `006-mostrador-del-almacen.jpg` (6:5, provisional). Origen: fotos subidas por el propietario a su ficha de Google; recortadas y sin EXIF.

| Archivo | Prop. | Formato | Dónde se usa | Imagen de IA prevista (por orden de preferencia) |
|---|---|---|---|---|
| `hero-bodegon-1.png` | 10:7 | PNG transparente | Hero de inicio, diapositiva 1 (imagenesHero[0]) | ia-01-bodegon-hero.png > 1.1.png |
| `hero-bodegon-2.png` | 10:7 | PNG transparente | Hero de inicio, diapositiva 2 (imagenesHero[1]) | ia-02-movil-foto-pieza.png > 1.2.png |
| `proceso-1.jpg` | 6:5 | JPG | «Cómo trabajamos», tarjeta 1 «Mándanos una foto» (IMAGENES.proceso[0]) y caja «Cómo trabajamos» de /empresa | ia-02-movil-foto-pieza.png > 1.12.png |
| `tile-herrajes-aluminio.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de herrajes-aluminio) | ia-04-herrajes-aluminio.png > 1.3.png |
| `familia-herrajes-aluminio.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[0].imagenes[0]) | ia-04-herrajes-aluminio.png > 1.3.png [respaldo] |
| `familia-herrajes-aluminio-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/herrajes-aluminio (servicios[0].imagenes[1]) | ia-f01-00-contexto.png > ia-04-herrajes-aluminio.png [respaldo] > 1.3.png [respaldo] |
| `tile-herrajes-pvc-oscilobatientes.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de herrajes-pvc-oscilobatientes) | ia-05-herrajes-pvc.png > 1.4.png |
| `familia-herrajes-pvc-oscilobatientes.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[1].imagenes[0]) | ia-05-herrajes-pvc.png > 1.4.png [respaldo] |
| `familia-herrajes-pvc-oscilobatientes-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/herrajes-pvc-oscilobatientes (servicios[1].imagenes[1]) | ia-f02-00-contexto.png > ia-05-herrajes-pvc.png [respaldo] > 1.4.png [respaldo] |
| `tile-cerraduras-y-cilindros.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de cerraduras-y-cilindros) | ia-06-cerraduras.png > 1.5.png |
| `familia-cerraduras-y-cilindros.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[2].imagenes[0]) | ia-06-cerraduras.png > 1.5.png [respaldo] |
| `familia-cerraduras-y-cilindros-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/cerraduras-y-cilindros (servicios[2].imagenes[1]) | ia-f03-00-contexto.png > ia-06-cerraduras.png [respaldo] > 1.5.png [respaldo] |
| `tile-bisagras-y-pernios.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de bisagras-y-pernios) | ia-07-bisagras-pernios.png > 1.6.png |
| `familia-bisagras-y-pernios.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[3].imagenes[0]) | ia-07-bisagras-pernios.png > 1.6.png [respaldo] |
| `familia-bisagras-y-pernios-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/bisagras-y-pernios (servicios[3].imagenes[1]) | ia-f04-00-contexto.png > ia-07-bisagras-pernios.png [respaldo] > 1.6.png [respaldo] |
| `tile-manillas-y-cremonas.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de manillas-y-cremonas) | ia-08-manillas.png > 1.7.png |
| `familia-manillas-y-cremonas.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[4].imagenes[0]) | ia-08-manillas.png > 1.7.png [respaldo] |
| `familia-manillas-y-cremonas-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/manillas-y-cremonas (servicios[4].imagenes[1]) | ia-f05-00-contexto.png > ia-08-manillas.png [respaldo] > 1.7.png [respaldo] |
| `tile-rodamientos-y-ruedas-corredera.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de rodamientos-y-ruedas-corredera) | ia-09-ruedas-corredera.png > 1.8.png |
| `familia-rodamientos-y-ruedas-corredera.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[5].imagenes[0]) | ia-09-ruedas-corredera.png > 1.8.png [respaldo] |
| `familia-rodamientos-y-ruedas-corredera-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/rodamientos-y-ruedas-corredera (servicios[5].imagenes[1]) | ia-f06-00-contexto.png > ia-09-ruedas-corredera.png [respaldo] > 1.8.png [respaldo] |
| `tile-juntas-felpudos-gomas.jpg` | 4:3 | JPG oscura | Rejilla de familias de inicio y mosaico de la banda CTA (lib/catalogo.ts → tile de juntas-felpudos-gomas) | ia-10-juntas-felpudos.png > 1.9.png |
| `familia-juntas-felpudos-gomas.jpg` | 3:2 | JPG | Tarjeta de /servicios y familias destacadas (servicios[6].imagenes[0]) | ia-10-juntas-felpudos.png > 1.9.png [respaldo] |
| `familia-juntas-felpudos-gomas-contexto.jpg` | 3:2 | JPG | Foto central de /servicios/juntas-felpudos-gomas (servicios[6].imagenes[1]) | ia-f07-00-contexto.png > ia-10-juntas-felpudos.png [respaldo] > 1.9.png [respaldo] |
| `composicion.png` | 1:1 | PNG transparente | «Cómo trabajamos» de inicio y /contacto (IMAGENES.composicion). El disco blanco central debe quedar opaco | ia-12-composicion-circular.png > 1.11.png |
| `portada-productos.jpg` | 2.75:1 | JPG oscura | PageHero de /servicios (IMAGENES.portadas.productos). Franja central del 3:2 | ia-19-hero-productos.png > 1.16.png |
| `portada-empresa.jpg` | 2.7:1 | JPG oscura | PageHero de /empresa (IMAGENES.portadas.empresa). Franja central del 3:2 | ia-45-hero-sobre-nosotros.png > ia-19-hero-productos.png [respaldo] > 1.17.png |
| `portada-contacto.jpg` | 2.75:1 | JPG oscura | PageHero de /contacto (IMAGENES.portadas.contacto). Franja central del 3:2 | ia-54-hero-contacto.png > ia-19-hero-productos.png [respaldo] > 1.18.png |
| `sub-herrajes-aluminio-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/herrajes-aluminio (lib/catalogo.ts) | ia-f01-recortes.png (arriba-izquierda) |
| `sub-herrajes-aluminio-2.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 2 de /servicios/herrajes-aluminio (lib/catalogo.ts) | ia-f01-recortes.png (arriba-derecha) |
| `sub-herrajes-aluminio-3.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 3 de /servicios/herrajes-aluminio (lib/catalogo.ts) | ia-f01-recortes.png (abajo-derecha) |
| `sub-herrajes-pvc-oscilobatientes-4.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 4 de /servicios/herrajes-pvc-oscilobatientes (lib/catalogo.ts) | ia-f02-recortes.png (arriba-izquierda) |
| `sub-herrajes-pvc-oscilobatientes-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/herrajes-pvc-oscilobatientes (lib/catalogo.ts) | ia-f02-recortes.png (arriba-derecha) |
| `sub-herrajes-pvc-oscilobatientes-2.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 2 de /servicios/herrajes-pvc-oscilobatientes (lib/catalogo.ts) | ia-f02-recortes.png (abajo-derecha) |
| `sub-cerraduras-y-cilindros-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/cerraduras-y-cilindros (lib/catalogo.ts) | ia-f03-recortes.png (arriba-izquierda) |
| `sub-cerraduras-y-cilindros-3.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 3 de /servicios/cerraduras-y-cilindros (lib/catalogo.ts) | ia-f03-recortes.png (arriba-derecha) |
| `sub-cerraduras-y-cilindros-4.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 4 de /servicios/cerraduras-y-cilindros (lib/catalogo.ts) | ia-f03-recortes.png (abajo-derecha) |
| `sub-bisagras-y-pernios-2.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 2 de /servicios/bisagras-y-pernios (lib/catalogo.ts) | ia-f04-recortes.png (arriba-izquierda) |
| `sub-bisagras-y-pernios-3.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 3 de /servicios/bisagras-y-pernios (lib/catalogo.ts) | ia-f04-recortes.png (arriba-derecha) |
| `sub-bisagras-y-pernios-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/bisagras-y-pernios (lib/catalogo.ts) | ia-f04-recortes.png (abajo-izquierda) |
| `sub-manillas-y-cremonas-2.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 2 de /servicios/manillas-y-cremonas (lib/catalogo.ts) | ia-f05-recortes.png (arriba-izquierda) |
| `sub-manillas-y-cremonas-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/manillas-y-cremonas (lib/catalogo.ts) | ia-f05-recortes.png (arriba-derecha) |
| `sub-manillas-y-cremonas-3.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 3 de /servicios/manillas-y-cremonas (lib/catalogo.ts) | ia-f05-recortes.png (abajo-derecha) |
| `sub-rodamientos-y-ruedas-corredera-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/rodamientos-y-ruedas-corredera (lib/catalogo.ts) | ia-f06-recortes.png (arriba-izquierda) |
| `sub-rodamientos-y-ruedas-corredera-2.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 2 de /servicios/rodamientos-y-ruedas-corredera (lib/catalogo.ts) | ia-f06-recortes.png (arriba-derecha) |
| `sub-rodamientos-y-ruedas-corredera-3.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 3 de /servicios/rodamientos-y-ruedas-corredera (lib/catalogo.ts) | ia-f06-recortes.png (abajo-derecha) |
| `sub-juntas-felpudos-gomas-1.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 1 de /servicios/juntas-felpudos-gomas (lib/catalogo.ts) | ia-f07-recortes.png (arriba-izquierda) |
| `sub-juntas-felpudos-gomas-2.png` | 1:1 | PNG transparente | Tarjeta de subfamilia nº 2 de /servicios/juntas-felpudos-gomas (lib/catalogo.ts) | ia-f07-recortes.png (arriba-derecha) |
| `tile-ver-todo.jpg` | 4:3 | JPG oscura | Último tile «Ver todos los productos» de inicio y banda CTA (IMAGENES.verTodo) | ia-11-ver-todo-almacen.png > 1.10.png |
| `proceso-2.jpg` | 6:5 | JPG | «Cómo trabajamos», tarjeta 2 «Ven al mostrador» (IMAGENES.proceso[1]) | ia-14-mostrador-identificar.png > 1.13.png |
| `proceso-3.jpg` | 6:5 | JPG | «Cómo trabajamos», tarjeta 3 «Para profesionales» (IMAGENES.proceso[2]) | ia-15-instalando-ventana.png > 1.14.png |
| `proceso-4.jpg` | 6:5 | JPG | «Cómo trabajamos», tarjeta 4 «Si no la tenemos» (IMAGENES.proceso[3]) | ia-16-pedidos-preparados.png > 1.15.png |
| `empresa-contacta.jpg` | 16:10 | JPG | Caja «Contacta con nosotros» de /empresa (empresa.imagenes[3]) | ia-50-trato-profesional.png |
| `familia-persiana-y-mosquitera.jpg` | 3:2 | JPG | Tarjeta de /servicios y foto central de /servicios/persiana-y-mosquitera (servicios[7].imagenes[0]). Familia por confirmar: prompts-imagenes.md no la incluye | — (sin prompt: queda como relleno) |

Cuadrantes de las hojas 2×2 que no se usan y subfamilias sin recorte: ver `nota` en `mapa-imagenes.json`.
