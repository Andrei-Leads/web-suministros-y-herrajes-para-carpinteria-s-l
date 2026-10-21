import { defineSiteConfig } from "@andrei-leads/core";

// Demo de Suministros y Herrajes para Carpintería S.L. (template tienda-1 «Almacén»).
// Textos: material/leads/suministros-y-herrajes-para-carpinteria-s-l/copy.md (variante SIN WhatsApp).
// Familias y subfamilias: PROPUESTA del copy, pendiente de validar con el cliente; se completan en lib/catalogo.ts (mismo slug).
// Fotos reales en public/fotos/ (004 fachada, 001 almacén, 006 mostrador). Las de /ejemplo/ son relleno o IA
// (llevan la etiqueta «Foto de ejemplo»): ver mapa-imagenes.json y scripts/importar-ia.py.
// Sin WhatsApp: no hay número confirmado. No poner `contacto.whatsapp` hasta tenerlo.

const familia = (slug: string, alt: string, altContexto: string) => [
  { src: `/ejemplo/familia-${slug}.jpg`, alt },
  { src: `/ejemplo/familia-${slug}-contexto.jpg`, alt: altContexto },
];

export default defineSiteConfig({
  negocio: {
    nombre: "Suministros y Herrajes para Carpintería",
    nombreLegal: "Suministros y Herrajes para Carpintería S.L.",
    nif: "B78181419",
    sector: "Herrajes y recambios para carpintería de aluminio y PVC",
    descripcionCorta:
      "Almacén familiar de herrajes y recambios para carpintería de aluminio y PVC en Vallecas (Madrid) desde 1986. Para profesionales y particulares.",
    anioFundacion: 1986,
    registroMercantil: "Inscrita en el Registro Mercantil de Madrid, tomo 2660, folio 150, sección 8, hoja M-46129",
    tipoSchema: ["Store"],
  },
  contacto: {
    telefono: "+34913805588",
    email: "suministrosyherrajes70@gmail.com",
    direccion: { calle: "Calle de Luis I, 60, nave 90", cp: "28031", ciudad: "Madrid", provincia: "Madrid" },
    horario: [
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "08:30", cierra: "13:30" },
      { dias: ["lunes", "martes", "miercoles", "jueves"], abre: "15:30", cierra: "18:00" },
      { dias: ["viernes"], abre: "08:30", cierra: "13:30" },
    ],
    coordenadas: { lat: 40.3752937, lng: -3.6482784 },
    urgencias24h: false,
    mensajeWhatsapp: "Hola, os escribo desde la web. Busco esta pieza (os mando foto y medidas):",
    fichaGoogle: "https://www.google.com/maps/place/?q=place_id:ChIJ5xZWK80lQg0Rgvu-7rMavO4",
  },
  zonas: ["Madrid", "Vallecas"],
  valoracion: { media: 4.3, total: 36 },
  imagenesHero: [
    {
      src: "/ejemplo/hero-bodegon-1.png",
      alt: "Bodegón de herrajes de aluminio y PVC en arco: cremona, manillas, pernios, carro de corredera y escuadras",
    },
    { src: "/ejemplo/hero-bodegon-2.png", alt: "Mano con un móvil fotografiando una manilla gastada, con recambios nuevos alrededor" },
  ],
  servicios: [
    {
      titulo: "Herrajes de aluminio",
      slug: "herrajes-aluminio",
      descripcion:
        "Herrajes para ventanas y puertas de aluminio en Madrid: cremonas, cierres, escuadras, compases y recambios para practicables y correderas.",
      contenido: [
        "Cremonas, escuadras, cierres, compases y accesorios para ventanas practicables, correderas y abatibles de aluminio. Es el material de cada día del carpintero, y también el recambio suelto para la ventana de casa.",
        "Las series de aluminio cambian y muchas piezas dejan de fabricarse. Tráenos la pieza vieja o mándanos una foto con las medidas: buscamos la misma o una equivalente que encaje en tu perfil.",
      ],
      incluye: ["Practicables", "Correderas", "Abatibles", "Puertas"],
      imagenes: familia(
        "herrajes-aluminio",
        "Cremona, bisagras de ventana y escuadras de aluminio sobre un banco de acero oscuro",
        "Cremona y manilla de una ventana practicable con marco de aluminio burdeos, entreabierta"
      ),
      mensajeWhatsapp: "Hola, busco un herraje para ventana o puerta de aluminio. Os mando foto y medidas:",
    },
    {
      titulo: "Herrajes de PVC",
      slug: "herrajes-pvc-oscilobatientes",
      descripcion:
        "Herrajes oscilobatientes y recambios para ventanas y puertas de PVC en Madrid: compases, puntos de cierre, bisagras y manillas.",
      contenido: [
        "Kits oscilobatientes, puntos de cierre, cerraderos, compases y bisagras para ventanas y balconeras de PVC. Entre las marcas con las que trabajamos está Winkhaus.",
        "En una oscilobatiente casi siempre falla una pieza concreta: el compás, la bisagra de abajo o un punto de cierre. Haz una foto al canto de la hoja, donde se ve el herraje, y dinos la marca si aparece grabada.",
      ],
      incluye: ["Oscilobatiente", "Cierres", "Balconeras y portones", "Manillas"],
      imagenes: familia(
        "herrajes-pvc-oscilobatientes",
        "Kit de herraje oscilobatiente para ventana de PVC con manilla blanca, cremona, compás y bisagra",
        "Ventana oscilobatiente de PVC blanco abierta en abatible, con la manilla hacia arriba y el compás"
      ),
      mensajeWhatsapp: "Hola, busco un recambio para ventana o puerta de PVC. Os mando foto y medidas:",
    },
    {
      titulo: "Cerraduras y cilindros",
      slug: "cerraduras-y-cilindros",
      descripcion:
        "Cerraduras de embutir y multipunto, cerraderos y bombines para puertas de aluminio y PVC. Dinos la entrada y el frente y la buscamos.",
      contenido: [
        "Cerraduras de embutir para perfil estrecho, cerraduras multipunto, cerraderos y cilindros. Para la puerta de la terraza, la del portal o la del trastero.",
        "Para dar con la cerradura correcta necesitamos la entrada (del canto al centro del cilindro), el frente y el tipo de cilindro. Mándanos una foto de la cerradura de lado y de frente.",
      ],
      incluye: ["De embutir", "Multipunto", "Cilindros", "Cerraderos"],
      imagenes: familia(
        "cerraduras-y-cilindros",
        "Cerradura de embutir de perfil estrecho, cilindro con llaves, cierre de gancho y cerradero",
        "Canto de una puerta de aluminio abierta con el frente de la cerradura de embutir y el cilindro"
      ),
      mensajeWhatsapp: "Hola, busco una cerradura para puerta de aluminio o PVC. Os mando foto y medidas:",
    },
    {
      titulo: "Bisagras y pernios",
      slug: "bisagras-y-pernios",
      descripcion:
        "Bisagras y pernios para ventanas y puertas de aluminio y PVC. Trae la vieja o mándanos foto con las medidas y buscamos una compatible.",
      contenido: [
        "Bisagras de ventana y de puerta, pernios y bisagras regulables para perfiles de aluminio y PVC. Si la hoja roza o se ha caído, muchas veces el problema está aquí.",
        "Hay cientos de bisagras parecidas y pocas que encajen. Con la bisagra vieja, la marca del perfil o una foto con las medidas entre taladros, buscamos la que te sirve o una compatible.",
      ],
      incluye: ["Ventana", "Puerta", "Pernios"],
      imagenes: familia(
        "bisagras-y-pernios",
        "Bisagras regulables de puerta, pernio negro y bisagra de ventana de aluminio",
        "Puerta de aluminio burdeos entreabierta con dos bisagras regulables de tres palas"
      ),
      mensajeWhatsapp: "Hola, busco una bisagra para ventana o puerta. Os mando foto y medidas:",
    },
    {
      titulo: "Manillas y cremonas",
      slug: "manillas-y-cremonas",
      descripcion:
        "Cremonas para ventana de aluminio, manillas oscilobatientes de PVC, manillas con llave, tiradores y uñeros para correderas en Madrid.",
      contenido: [
        "Cremonas para ventana de aluminio, manillas oscilobatientes de PVC, manillas con llave, tiradores y uñeros para correderas. Es la pieza que más se toca y la que antes se rompe.",
        "Para cambiar una manilla o una cremona importan la distancia entre tornillos, el largo del cuadradillo y el lado de apertura. Con una foto y esas medidas es mucho más fácil acertar a la primera.",
      ],
      incluye: ["Cremonas", "Manillas", "Tiradores"],
      imagenes: familia(
        "manillas-y-cremonas",
        "Fila de manillas de puerta y de ventana en plata, negro, blanco y burdeos, y un uñero de corredera",
        "Manilla de puerta de aluminio sobre placa estrecha en una puerta de aluminio grafito"
      ),
      mensajeWhatsapp: "Hola, busco una manilla o cremona. Os mando foto y la distancia entre tornillos:",
    },
    {
      titulo: "Ruedas y rodamientos",
      slug: "rodamientos-y-ruedas-corredera",
      descripcion:
        "Ruedas, carros y rodamientos para ventanas y puertas correderas de aluminio y PVC. Si la corredera pesa o se sale del carril, empieza aquí.",
      contenido: [
        "Ruedas simples y dobles, carros regulables y rodamientos para correderas de aluminio y PVC. Cuando la corredera pesa, se sale del carril o hace ruido, casi siempre es la rueda.",
        "Las ruedas se parecen mucho y cambian por milímetros. Lo más seguro es traer la vieja o mandarnos una foto con el ancho, el diámetro y el perfil donde va montada.",
      ],
      incluye: ["Ruedas", "Carros", "Guías y accesorios"],
      imagenes: familia(
        "rodamientos-y-ruedas-corredera",
        "Carros y ruedas de nailon para ventana y puerta corredera, rodamientos y guías",
        "Parte baja de una ventana corredera de aluminio con el carro rodando sobre el carril"
      ),
      mensajeWhatsapp: "Hola, busco una rueda para corredera. Os mando foto, ancho y diámetro:",
    },
    {
      titulo: "Juntas y felpudos",
      slug: "juntas-felpudos-gomas",
      descripcion:
        "Juntas, gomas de acristalar y felpudos para ventanas correderas de aluminio y PVC. Si entra aire o ruido, muchas veces basta con la goma.",
      contenido: [
        "Juntas de estanqueidad, gomas de acristalar y felpudos (cepillos) para correderas de aluminio y PVC. Si por la ventana entra aire, agua o ruido, muchas veces basta con cambiar la goma.",
        "Cada perfil lleva su goma. Corta un trozo de la vieja y tráelo, o mándanos una foto de cerca del canal donde va metida, con una regla al lado. Así comparamos y buscamos la equivalente.",
      ],
      incluye: ["Juntas", "Felpudos", "Accesorios"],
      imagenes: familia(
        "juntas-felpudos-gomas",
        "Rollos de junta de EPDM, felpudo de corredera, junta tubular y calzos de acristalar",
        "Esquina de una hoja de aluminio con la junta de acristalar y el felpudo de corredera"
      ),
      mensajeWhatsapp: "Hola, busco una goma o felpudo para ventana. Os mando foto con una regla al lado:",
    },
    {
      // PROPUESTA: solo si el cliente confirma que vende esta familia. No sale en la rejilla de inicio (solo 7).
      titulo: "Persiana y mosquitera",
      slug: "persiana-y-mosquitera",
      descripcion:
        "Recambios para persianas y mosquiteras: recogedores, cintas, poleas y piezas para mosquiteras enrollables y correderas. Pregúntanos con foto.",
      contenido: [
        "Recogedores, cintas, poleas y accesorios de persiana, y piezas para mosquiteras enrollables y correderas. Lo pequeño que hace que todo funcione.",
        "Persianas y mosquiteras tienen muchas medidas. Mándanos una foto de la pieza rota y otra del conjunto, con el ancho de la cinta si lo tienes a mano, y te decimos qué hay.",
      ],
      incluye: ["Persiana", "Mosquitera"],
      imagenes: [{ src: "/ejemplo/familia-persiana-y-mosquitera.jpg", alt: "Recambios de persiana y mosquitera" }],
      mensajeWhatsapp: "Hola, busco una pieza de persiana o mosquitera. Os mando foto:",
    },
  ],
  resenas: [
    {
      autor: "Roberto A.",
      fecha: "2025-03-20",
      puntuacion: 5,
      fuente: "google",
      texto:
        "Llegué buscando un cierre para un portón de PVC de hace 15 años, la marca es alemana y el fabricante ya no la tiene. Había pasado por muchos sitios sin éxito, pero aquí me atendió un empleado muy amable y competente que enseguida encontró un repuesto de las mismas medidas. El resto del personal también muy amable y deseoso de agradar.",
    },
    {
      autor: "Cristina N.",
      fecha: "2023-07-20",
      puntuacion: 5,
      fuente: "google",
      texto:
        "Llamé para preguntar por el mecanismo de cierre de una ventana, me atendieron muy amanlem, me pidieron foto x WhatsApp, me contestaron bastante rápido, y aunque ellos no lo tenían me indicaron donde podían conseguirlo, y efectivamente allí lo tenían.",
    },
    { autor: "Angel María F.", fecha: "2026-06-18", puntuacion: 5, fuente: "google", texto: "Grandes profesionales y gran surtido." },
  ],
  // Tarjetas de «Cómo trabajamos» (S5 del copy, variante sin WhatsApp): el template pinta `proceso` en esas 4 tarjetas.
  proceso: [
    {
      titulo: "Mándanos una foto",
      texto:
        "Haz una foto a la pieza y otra a la ventana o puerta entera. Añade las medidas y cualquier marca o número que se lea. Envíala por email y empezamos a buscar.",
    },
    {
      titulo: "Ven al mostrador",
      texto: "Trae la pieza vieja a la nave de Vallecas. La miramos contigo en el mostrador y buscamos la equivalente en el almacén.",
    },
    {
      titulo: "Para profesionales",
      texto:
        "Si eres carpintero o instalador de aluminio o PVC, somos tu almacén de herrajes en Madrid. Llámanos y cuéntanos qué necesitas para la obra.",
    },
    {
      titulo: "Si no la tenemos",
      texto: "No te vas con las manos vacías: te decimos dónde puede estar o te proponemos una alternativa con las mismas medidas.",
    },
  ],
  // tienda-1 no pinta `garantias`; se dejan por si se cambia de template.
  garantias: [
    "Empresa familiar desde 1986",
    "Herrajes para carpintería de aluminio y PVC",
    "Atendemos a profesionales y a particulares",
    "Consulta con foto de la pieza antes de venir",
    "Si no la tenemos, te decimos dónde buscarla",
  ],
  marcas: ["STAC", "Winkhaus"],
  empresa: {
    historia: [
      "Somos una empresa familiar de Madrid. Desde 1986 nos dedicamos a la venta al por mayor de herrajes y accesorios para carpintería de aluminio, y también de PVC, desde nuestra nave del Polígono Industrial de Vallecas.",
      "Somos un equipo de unas diez personas y conocemos el oficio de mostrador: mirar una pieza, medirla y saber por dónde buscarla.",
      "Nuestros clientes son carpinteros e instaladores de aluminio y PVC, y también particulares que necesitan cambiar una pieza en casa.",
    ],
    // [0] fachada (inicio S3, contacto, «Cómo llegar») · [1] almacén («Desde 1986») · [2] mostrador (historia) · [3] caja «Contacta» de /empresa.
    imagenes: [
      {
        src: "/fotos/004-fachada-del-almacen.jpg",
        alt: "Fachada del almacén de Suministros y Herrajes para Carpintería: cartel blanco con letras rojas sobre la puerta de cristal",
      },
      {
        src: "/fotos/001-interior-del-almacen.jpg",
        alt: "Interior del almacén: estanterías con cajas de herrajes, entreplanta y escalera burdeos",
      },
      {
        src: "/fotos/006-mostrador-del-almacen.jpg",
        alt: "Mostrador de atención del almacén, con frente burdeos y ventanilla de cristal",
      },
      { src: "/ejemplo/empresa-contacta.jpg", alt: "Apretón de manos sobre el mostrador entre un carpintero y el dependiente" },
    ],
  },
  preguntas: [
    {
      pregunta: "¿Vendéis a particulares o solo a profesionales?",
      respuesta:
        "A los dos. Somos un almacén mayorista para carpinteros e instaladores de aluminio y PVC, pero si necesitas una pieza para tu ventana o tu puerta, también te atendemos.",
    },
    {
      pregunta: "No sé cómo se llama la pieza. ¿Cómo os la pido?",
      respuesta:
        "Haz una foto de la pieza y otra del conjunto, anota las medidas y cualquier marca o número que se lea, y envíanoslo por email. También puedes traer la pieza vieja al mostrador.",
    },
    {
      pregunta: "¿Tenéis recambios para ventanas antiguas o descatalogadas?",
      respuesta:
        "Lo intentamos siempre. Muchas veces encontramos la misma pieza o una de medidas equivalentes, aunque el fabricante ya no la haga. Si no damos con ella, te lo decimos claro.",
    },
    {
      pregunta: "¿Y si no tenéis la pieza que busco?",
      respuesta: "Te decimos dónde puede estar o te proponemos una alternativa que encaje. No te vas sin una pista.",
    },
    {
      pregunta: "¿Trabajáis herrajes de aluminio y de PVC?",
      respuesta:
        "Sí. Nos dedicamos sobre todo a herrajes para carpintería de aluminio y también tenemos herrajes y recambios para ventanas y puertas de PVC.",
    },
    {
      pregunta: "¿Qué medidas tengo que mirar antes de ir?",
      respuesta:
        "Depende de la pieza. En manillas y cremonas, la distancia entre tornillos y el largo del cuadradillo. En ruedas, el ancho y el diámetro. En cerraduras, la entrada y el frente. En gomas, mejor trae un trozo.",
    },
    {
      pregunta: "¿Tenéis tienda online?",
      respuesta: "No. Te atendemos en el mostrador de la nave, por teléfono y por email.",
    },
    {
      pregunta: "¿Dónde estáis y qué horario tenéis?",
      respuesta:
        "En la Calle de Luis I, 60, nave 90, Polígono Industrial de Vallecas (28031 Madrid). De lunes a jueves de 8:30 a 13:30 y de 15:30 a 18:00, y los viernes de 8:30 a 13:30.",
    },
  ],
  seo: {
    titulo: "Herrajes para aluminio y PVC en Madrid · Desde 1986",
    descripcion:
      "Almacén de herrajes y recambios para ventanas y puertas de aluminio y PVC en Vallecas, Madrid. Mándanos una foto de la pieza y te ayudamos a encontrarla.",
    // Provisional, como en las demás demos: se corrige con la URL real tras el primer despliegue en Vercel.
    url: "https://web-suministros-y-herrajes-para-carpinteria-s-l.vercel.app",
  },
});
