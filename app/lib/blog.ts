/**
 * Blog de Código Fresco: artículos de Antonio Duque sobre las estrategias,
 * herramientas y soluciones que va creando.
 *
 * Para publicar uno nuevo basta con agregar una entrada a `blogPosts` y dejar
 * sus archivos en `public/blog/<slug>/`. El índice, la página del artículo,
 * los metadatos, el JSON-LD y el sitemap salen de aquí.
 *
 * Las guías con respuesta directa y preguntas frecuentes siguen en
 * `/recursos` (app/lib/content.ts): el blog es para contar lo que se está
 * construyendo, con la voz del autor.
 */

/** Un trozo del cuerpo del artículo. */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: Array<{ label?: string; text: string }> }
  | { type: "flow"; steps: string[] }
  | { type: "note"; text: string };

export type BlogVideo = {
  /** MP4 sin audio, servido desde /public. */
  src: string;
  /** Imagen que se ve antes de reproducir y cuando se pide menos movimiento. */
  poster: string;
  /** Alternativa descargable. */
  gif?: string;
  width: number;
  height: number;
  durationSeconds: number;
  /** Descripción de lo que muestra, para lectores de pantalla y buscadores. */
  description: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Título para el buscador y al compartir (sin la marca: la pone la plantilla). */
  metaTitle: string;
  description: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  tags: string[];
  /** Imagen horizontal de 1200 × 630 para LinkedIn y demás redes. */
  shareImage: { src: string; width: number; height: number; alt: string };
  /** Imagen de la tarjeta en el índice. */
  cover: { src: string; width: number; height: number; alt: string };
  video?: BlogVideo;
  /** Aviso que acompaña al video: qué es y qué no es. */
  disclaimer?: string;
  body: BlogBlock[];
  /** Cierre con llamada a conversar. */
  cta: { title: string; text: string };
};

const GESTACION = "/blog/la-gestacion-de-una-oportunidad";

export const blogPosts: BlogPost[] = [
  {
    slug: "la-gestacion-de-una-oportunidad",
    title: "La gestación de una oportunidad",
    metaTitle: "La gestación de una oportunidad: una metáfora visual para seguir leads",
    description:
      "Una metáfora visual del recorrido de los leads: chatform, CRM, seguimiento y remarketing dinámico conectados en un monitor para decidir qué mejorar.",
    excerpt:
      "Así llamo a una forma de visualizar los leads: el movimiento hacia una conversión, con pausas, retornos y distintos tiempos. Primeras visitas y remarketing dinámico en el mismo recorrido.",
    author: "Antonio Duque",
    publishedAt: "2026-11-14",
    updatedAt: "2026-11-14",
    readingTime: "5 min",
    tags: ["CRM", "Remarketing", "Automatización", "Dashboards", "ZoDesk"],
    shareImage: {
      src: `${GESTACION}/compartir.jpg`,
      width: 1200,
      height: 630,
      alt: "La gestación de una oportunidad. Una metáfora visual para marketing y ventas.",
    },
    cover: {
      src: `${GESTACION}/portada.jpg`,
      width: 1080,
      height: 1350,
      alt: "Portada de «La gestación de una oportunidad»: un monitor del recorrido con las etapas visita, responde, resultado, contacto, asignación, seguimiento, cita y conversión.",
    },
    video: {
      src: `${GESTACION}/gestacion-oportunidad.mp4`,
      poster: `${GESTACION}/portada.jpg`,
      gif: `${GESTACION}/gestacion-oportunidad.gif`,
      width: 1080,
      height: 1350,
      durationSeconds: 20,
      description:
        "Animación verde: formas abstractas que avanzan por las etapas de un monitor hacia la conversión. Las primeras visitas llevan una cola ondulante y los leads de remarketing dinámico, un doble halo y una estela luminosa. Ambos atraviesan el mismo proceso, con pausas y retornos.",
    },
    disclaimer:
      "Demo ilustrativa: no contiene cifras ni datos de clientes. El halo representa contexto previo, no una garantía de conversión.",
    body: [
      { type: "p", text: "Estoy creando una forma de visualizar los leads que llamo **la gestación de una oportunidad**." },
      {
        type: "p",
        text: "El origen del concepto es visual: el movimiento de los espermatozoides hacia un óvulo. Lo llevo a marketing como una metáfora del recorrido hacia una conversión: hay movimiento, pausas, retornos y distintos tiempos. No es una explicación biológica ni una equivalencia literal entre personas y células.",
      },
      { type: "h2", text: "Primera visita y remarketing: el mismo recorrido, distinto contexto" },
      {
        type: "p",
        text: "Algunas personas descubren la marca por primera vez. Otras llegan a través del remarketing dinámico después de una interacción anterior.",
      },
      { type: "p", text: "En la animación distingo ambos recorridos:" },
      {
        type: "list",
        items: [
          { label: "Primera visita", text: "una forma verde con cabeza y una cola que se mueve." },
          {
            label: "Remarketing dinámico",
            text: "la misma forma, con un doble halo y una estela más luminosa. Es mi manera de representar ese impulso y contexto previo.",
          },
          { label: "Pausas o salidas", text: "zonas ámbar donde el recorrido se detiene." },
          { label: "Conversión", text: "el punto de encuentro hacia el que se mueve todo el recorrido." },
        ],
      },
      {
        type: "p",
        text: "Los leads de remarketing recorren las mismas etapas y también pueden detenerse. El halo identifica su procedencia y contexto; el rendimiento de cada grupo se comprueba por separado con datos.",
      },
      { type: "h2", text: "Qué estoy conectando en ZoDesk" },
      {
        type: "p",
        text: "El recorrido de la demo está relacionado con el monitor y el chatform de financiamiento que estoy desarrollando:",
      },
      {
        type: "flow",
        steps: ["Visita", "Respuestas", "Resultado orientativo", "Contacto", "Asignación", "Seguimiento", "Cita", "Conversión"],
      },
      {
        type: "p",
        text: "Quiero poder observar dónde se encuentra cada oportunidad y qué le falta para avanzar. El resultado de la precalificación del chatform es orientativo; no representa una aprobación de crédito.",
      },
      {
        type: "note",
        text: "La animación utiliza recorridos ilustrativos. Sus puntos, velocidades y proporciones no son estadísticas de un cliente. El trayecto de retorno representa el modelo que quiero seguir, y no acredita por sí mismo una integración de audiencias o atribución completamente resuelta.",
      },
      { type: "h2", text: "Lo que me ha servido para revisar campañas" },
      {
        type: "p",
        text: "Me ha resultado útil cruzar la captación con lo que ocurre después: la calidad de la oportunidad, el contexto de la conversación y el seguimiento comercial disponible.",
      },
      { type: "p", text: "Las preguntas que llevo al monitor son:" },
      {
        type: "list",
        items: [
          { text: "¿Qué anuncio o fuente trae a esa persona y con qué expectativa llega?" },
          { text: "¿Dónde se detiene en el chatform?" },
          { text: "¿Cuál es su resultado y qué información llega al CRM?" },
          { text: "¿Quién la recibe y qué seguimiento puede verificarse?" },
          { text: "¿Es una primera visita o una interacción posterior atribuible a remarketing?" },
          { text: "¿Qué citas o ventas pueden relacionarse con ese recorrido?" },
        ],
      },
      {
        type: "p",
        text: "Esa lectura me ayuda a formular hipótesis sobre el mensaje, las preguntas, la siguiente acción y la atención del equipo. Para confirmar una mejora hay que registrar el cambio, revisar un período adecuado y considerar las limitaciones de medición.",
      },
      { type: "h2", text: "Así quiero construir mis próximos dashboards" },
      {
        type: "p",
        text: "Estoy llevando esta idea a los paneles de monitoreo y acción que creo: observar el movimiento, entender el contexto, decidir qué probar y medir de nuevo.",
      },
      {
        type: "p",
        text: "Mi trabajo combina marketing con creación de herramientas: el chatform, las conexiones con CRM, el reporting por correo y las piezas de ZoDesk que relacionan captación, seguimiento y operación.",
      },
      {
        type: "p",
        text: "La interfaz debe hacer visibles también sus límites: una fuente sin conectar, una etapa que comenzó a medirse recientemente o una conversión cuyo origen todavía no puede reconstruirse.",
      },
      { type: "h2", text: "¿Qué opinas?" },
      {
        type: "p",
        text: "¿Habías visto una metáfora así aplicada a un dashboard? ¿Te ayudaría a entender mejor el recorrido de tus oportunidades?",
      },
    ],
    cta: {
      title: "¿Quieres conectar campañas, CRM y seguimiento comercial?",
      text: "Si tu equipo necesita ver dónde se detienen sus oportunidades y qué hacer con ellas, conversemos sobre el proceso que quieren mejorar: marketing, CRM y automatización.",
    },
  },
];

/** Más recientes primero. */
export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** «14 de noviembre de 2026», sin depender de la zona horaria del servidor. */
export function fechaLarga(iso: string): string {
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  const [anio, mes, dia] = iso.split("-").map(Number);
  return `${dia} de ${meses[mes - 1]} de ${anio}`;
}
