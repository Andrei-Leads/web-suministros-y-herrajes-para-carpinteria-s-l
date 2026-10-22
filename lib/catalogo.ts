import type { Imagen, Servicio } from "@andrei-leads/core";

/*
 * Catálogo LOCAL del template «Almacén» (tienda-1).
 *
 * Lo que el contrato de core no tiene y la spec necesita: la foto oscura de cada familia en la
 * rejilla de inicio, los lemas de la cabecera de familia (F1) y las subfamilias con sus referencias
 * (F2), más las imágenes propias del diseño (portadas de página, composición circular, «cómo
 * trabajamos»). Cada familia se enlaza con su servicio por `slug` (= `servicios[].slug` de
 * site.config.ts). Una familia sin entrada aquí sigue funcionando: usa sus datos de site.config y
 * las secciones que dependen de este archivo se ocultan.
 *
 * Este archivo NO importa `@/site.config`: es solo datos, y lo puede leer cualquier componente.
 * En la web de un cliente se rellena junto con site.config.ts.
 */

export type Subfamilia = {
  /** Título de la tarjeta (1-2 palabras): «Correderas», «Cremonas»… */
  titulo: string;
  /** Recorte de producto 1:1, PNG transparente (sobresale por encima de la tarjeta). Opcional. */
  imagen?: Imagen;
  /** 3-5 referencias de ejemplo (1-4 palabras cada una). */
  referencias: string[];
};

export type FamiliaCatalogo = {
  /** Slug del servicio de site.config.ts al que completa. */
  slug: string;
  /** Foto oscura 4:3 para la rejilla de inicio y el mosaico de la banda CTA. Sin ella, `imagenes[0]` del servicio. */
  tile?: Imagen;
  /** Lema de marca de la columna izquierda de la cabecera de familia (8-10 palabras). */
  lemaIzquierda?: string;
  /** Lema de marca de la columna derecha (4-5 palabras). */
  lemaDerecha?: string;
  /** Título de la sección de subfamilias (6-8 palabras). Sin él: «Nuestra gama de {familia}». */
  tituloGama?: string;
  /** Tarjetas de subfamilia (F2). Vacío: la sección no sale. */
  subfamilias: Subfamilia[];
};

/**
 * Subfamilia con recorte de IA en `/ejemplo/sub-{familia}-{n}.png` (ver mapa-imagenes.json). En esta demo los
 * recortes salen de piezas sueltas de las imágenes transparentes del template (1.1, 1.2 y 1.11); las subfamilias
 * sin una pieza que encaje van con `subSinFoto`. Si llegan las hojas ia-fNN-recortes.png, se vuelven a `sub`.
 */
const sub = (familia: string, n: number, titulo: string, alt: string, referencias: string[]): Subfamilia => ({
  titulo,
  imagen: { src: `/ejemplo/sub-${familia}-${n}.png`, alt },
  referencias,
});

/** Subfamilia sin recorte (la hoja de IA no trae una pieza que encaje): la tarjeta lleva el icono. */
const subSinFoto = (titulo: string, referencias: string[]): Subfamilia => ({ titulo, referencias });

const tile = (slug: string, alt: string): Imagen => ({ src: `/ejemplo/tile-${slug}.jpg`, alt });

// Familias y subfamilias: PROPUESTA del copy (§3.3), pendiente de validar con el cliente.
export const familias: FamiliaCatalogo[] = [
  {
    slug: "herrajes-aluminio",
    tile: tile("herrajes-aluminio", "Cremonas, escuadras de aluminio y tornillos sobre una chapa negra"),
    lemaIzquierda: "Lo que necesita una ventana de aluminio para funcionar",
    lemaDerecha: "¿Tu ventana ya tiene años?",
    tituloGama: "Herrajes de aluminio para cada tipo de apertura",
    subfamilias: [
      sub("herrajes-aluminio", 1, "Practicables", "Manilla de aluminio plateada para ventana practicable", ["Cremonas embutidas", "Cierres de presión", "Escuadras de unión", "Bisagras de ventana"]),
      subSinFoto("Correderas", ["Cierres de corredera", "Ruedas y carros", "Guías y topes", "Uñeros"]),
      subSinFoto("Abatibles", ["Compases", "Brazos de retención", "Cierres de golpe"]),
      subSinFoto("Puertas", ["Bisagras de puerta", "Cerraderos", "Tiradores", "Cierrapuertas"]),
    ],
  },
  {
    slug: "herrajes-pvc-oscilobatientes",
    tile: tile("herrajes-pvc-oscilobatientes", "Herraje oscilobatiente para ventana de PVC: cremona, compás y bisagra blanca"),
    lemaIzquierda: "Herrajes oscilobatientes y recambios para ventanas de PVC",
    lemaDerecha: "¿No cierra o se descuelga?",
    tituloGama: "Todo el herraje de una ventana de PVC",
    subfamilias: [
      subSinFoto("Oscilobatiente", ["Kits completos", "Compases", "Cremonas", "Bisagras inferiores"]),
      subSinFoto("Cierres", ["Puntos de cierre", "Cerraderos", "Bulones"]),
      subSinFoto("Balconeras y portones", ["Cierres de portón", "Cerraduras multipunto", "Bisagras de puerta"]),
      sub("herrajes-pvc-oscilobatientes", 4, "Manillas", "Manilla negra de ventana oscilobatiente con pulsador burdeos", ["Manillas oscilobatientes", "Manillas con llave", "Embellecedores"]),
    ],
  },
  {
    slug: "cerraduras-y-cilindros",
    tile: tile("cerraduras-y-cilindros", "Cerradura de embutir de perfil estrecho y tres cilindros con sus llaves"),
    lemaIzquierda: "Cerraduras y bombines para puertas de aluminio y PVC",
    lemaDerecha: "Mide antes de cambiarla",
    tituloGama: "Cierres para puertas de aluminio y PVC",
    subfamilias: [
      sub("cerraduras-y-cilindros", 1, "De embutir", "Cerradura de embutir de perfil estrecho con frente largo de acero", ["Perfil estrecho", "Con picaporte", "De gancho para corredera"]),
      subSinFoto("Multipunto", ["Tres puntos", "Cerraderos", "Bulones"]),
      sub("cerraduras-y-cilindros", 3, "Cilindros", "Cilindro de perfil europeo niquelado", ["Bombines de perfil europeo", "Varias medidas"]),
      subSinFoto("Cerraderos", ["Frentes", "Cerraderos regulables"]),
    ],
  },
  {
    slug: "bisagras-y-pernios",
    tile: tile("bisagras-y-pernios", "Fila de bisagras y pernios en plata, negro y bronce"),
    lemaIzquierda: "Bisagras para ventanas y puertas de aluminio y PVC",
    lemaDerecha: "Trae la vieja, buscamos pareja",
    tituloGama: "Bisagras y pernios para cada perfil",
    subfamilias: [
      sub("bisagras-y-pernios", 1, "Ventana", "Bisagra de dos hojas de acero para ventana", ["Bisagras de aluminio", "Bisagras de PVC", "Regulables"]),
      sub("bisagras-y-pernios", 2, "Puerta", "Bisagra de acero de pala larga para puerta", ["Bisagras de puerta", "Regulables en altura", "De tres palas"]),
      subSinFoto("Pernios", ["Pernios de puerta", "Pernios de ventana", "Tapas embellecedoras"]),
    ],
  },
  {
    slug: "manillas-y-cremonas",
    tile: tile("manillas-y-cremonas", "Fila de manillas de ventana en plata, negro, blanco, bronce y burdeos, y dos tiradores de corredera"),
    lemaIzquierda: "Manillas, cremonas y tiradores para ventanas y puertas",
    lemaDerecha: "Cuenta los tornillos y mide",
    tituloGama: "Manillas y cremonas para ventana y puerta",
    subfamilias: [
      sub("manillas-y-cremonas", 1, "Cremonas", "Manilla negra mate de ventana practicable", ["De aluminio", "De PVC", "Con llave"]),
      sub("manillas-y-cremonas", 2, "Manillas", "Manilla de puerta de aluminio sobre roseta cuadrada", ["Oscilobatientes", "Con llave", "De puerta", "Picaportes"]),
      subSinFoto("Tiradores", ["De puerta", "Uñeros de corredera", "Tiradores de cazoleta"]),
    ],
  },
  {
    slug: "rodamientos-y-ruedas-corredera",
    tile: tile("rodamientos-y-ruedas-corredera", "Carros y ruedas de nailon blanco y negro para ventana y puerta corredera"),
    lemaIzquierda: "Ruedas y rodamientos para ventanas y puertas correderas",
    lemaDerecha: "Saca la rueda y tráela",
    tituloGama: "Para que la corredera vuelva a correr",
    subfamilias: [
      sub("rodamientos-y-ruedas-corredera", 1, "Ruedas", "Carro de corredera con ruedas de nailon blanco", ["Simples", "Dobles", "Regulables"]),
      sub("rodamientos-y-ruedas-corredera", 2, "Carros", "Dos carros de rodillos para puerta corredera de aluminio", ["De ventana", "De balconera", "Regulables"]),
      subSinFoto("Guías y accesorios", ["Guías", "Topes", "Cierres de corredera"]),
    ],
  },
  {
    slug: "juntas-felpudos-gomas",
    tile: tile("juntas-felpudos-gomas", "Rollos de junta de EPDM y un felpudo de corredera"),
    lemaIzquierda: "Gomas, juntas y felpudos para que no entre aire",
    lemaDerecha: "Trae un trozo de muestra",
    tituloGama: "Gomas y felpudos para aluminio y PVC",
    subfamilias: [
      sub("juntas-felpudos-gomas", 1, "Juntas", "Rollo de junta de goma negra para acristalar", ["Gomas de acristalar", "Juntas de estanqueidad", "Juntas de puerta"]),
      subSinFoto("Felpudos", ["Felpudo de corredera", "Felpudo con aleta", "Varias alturas"]),
      subSinFoto("Accesorios", ["Tapas de desagüe", "Tapones de perfil"]),
    ],
  },
  {
    // Familia por confirmar con el cliente (copy §3.3, F-08). No sale en la rejilla de inicio (solo 7).
    slug: "persiana-y-mosquitera",
    lemaIzquierda: "Recambios para la persiana y la mosquitera de tu ventana",
    lemaDerecha: "¿Se ha roto el recogedor?",
    tituloGama: "Recambios para la persiana y la mosquitera",
    subfamilias: [
      subSinFoto("Persiana", ["Recogedores", "Cintas", "Poleas", "Topes"]),
      subSinFoto("Mosquitera", ["Enrollables", "Correderas", "Muelles y tapas"]),
    ],
  },
];

/** Entrada local de una familia, o `undefined` si no tiene. */
export function familiaCatalogo(slug: string): FamiliaCatalogo | undefined {
  return familias.find((f) => f.slug === slug);
}

/** Foto oscura de la familia para la rejilla de inicio y el mosaico CTA: `tile` o, si no hay, su primera foto. */
export function fotoTile(servicio: Pick<Servicio, "slug" | "imagenes">): Imagen | undefined {
  return familiaCatalogo(servicio.slug)?.tile ?? servicio.imagenes[0];
}

/** Imágenes propias del diseño, sin campo en el contrato. */
export const IMAGENES = {
  /** Último tile de la rejilla de inicio («Ver todo»): pasillo del almacén. 4:3. */
  verTodo: { src: "/ejemplo/tile-ver-todo.jpg", alt: "Pasillo entre estanterías metálicas llenas de cajas y cajetines de herrajes" },
  /** Composición circular de producto con un círculo blanco vacío en el centro (ahí va el nombre). 1:1, PNG transparente. */
  composicion: {
    src: "/ejemplo/composicion.png",
    alt: "Herrajes y herramientas en abanico alrededor de un círculo blanco",
  },
  /** Fotos de las tarjetas de «Cómo trabajamos», en el orden de los pasos. 6:5. */
  proceso: [
    { src: "/ejemplo/proceso-1.jpg", alt: "Mano con un móvil enviando por chat la foto de una rueda de corredera" },
    { src: "/ejemplo/proceso-2.jpg", alt: "Manos comparando una cremona vieja con su recambio sobre el mostrador" },
    { src: "/ejemplo/proceso-3.jpg", alt: "Instalador ajustando una ventana corredera de aluminio en una reforma" },
    { src: "/ejemplo/proceso-4.jpg", alt: "Cajas de pedido preparadas sobre un palé en el almacén" },
  ],
  /** Fotos de fondo de los PageHero (≈ 2,75:1, centro libre para el título). */
  portadas: {
    productos: { src: "/ejemplo/portada-productos.jpg", alt: "Herrajes de ventana oscilobatiente sobre una chapa oscura" },
    empresa: { src: "/ejemplo/portada-empresa.jpg", alt: "Herrajes y herramientas sobre una chapa burdeos oscura" },
    contacto: { src: "/ejemplo/portada-contacto.jpg", alt: "Carpintero de espaldas hablando por el móvil en un taller de aluminio" },
  },
} satisfies Record<string, Imagen | Imagen[] | Record<string, Imagen>>;
