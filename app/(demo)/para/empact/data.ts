export const channels = [
  { name: "Meta", spend: 54343.68, since: "12 mar" },
  { name: "TikTok", spend: 15253.81, since: "8 may" },
  { name: "Google", spend: 9599.82, since: "1 may" },
];
export const totalSpend = channels.reduce((sum, channel) => sum + channel.spend, 0);
export const money = (value: number) => new Intl.NumberFormat("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

export const creatives = [
  { name: "Financiación · asalariados", format: "Vídeo a WhatsApp · 54 s", media: "asalariados", video: true, spend: 1573.73, results: 1362, since: "12 mar – 24 nov 2026", type: "Conversaciones ≥3 mensajes" },
  { name: "Financiación · independientes", format: "Vídeo a WhatsApp · 1 min 08 s", media: "independientes", video: true, spend: 1574.99, results: 932, since: "12 mar – 24 nov 2026", type: "Conversaciones ≥3 mensajes" },
  { name: "Kia Picanto 2025 · septiembre", format: "Imagen por coche · 9:16", media: "picanto-vertical", video: false, spend: 144.72, results: 159, since: "13 sep – 16 nov 2026", type: "Conversaciones ≥3 mensajes" },
];

export const processes = [
  {
    title: "Auditar antes de invertir", label: "Medición", summary: "Acordar qué cuenta como resultado y comprobar que llega al CRM.",
    problem: "Evitar decisiones basadas en acciones solapadas, eventos sin intención comercial o solicitudes que no llegan al equipo.",
    inputs: "Datos de Meta, TikTok y Google; eventos de GA4; formularios; registros del CRM.",
    steps: ["Centralizar la información por plataforma, anuncio y día.", "Separar los niveles de campaña y anuncio para no sumar dos veces el gasto.", "Revisar la definición de lead y las acciones solapadas.", "Contrastar formularios y eventos con su recepción en el CRM.", "Corregir incidencias y documentar la base de comparación antes de cambiar la puja."],
    tools: "APIs publicitarias, GA4, SQL y CRM.",
    metric: "Leads verificables en el CRM. Un clic o una visita a una ficha no demuestran que haya una solicitud recibida.",
    cadence: "Al entrar en una cuenta. Propuesta: repetir tras cambios de formularios o medición.",
    result: "La auditoría del 20 de noviembre documentó eventos Purchase asociados a solicitudes, no solo a ventas. El código de extracción ya prioriza el lead agregado de Meta y evita sumar sus variantes solapadas.",
    proposal: "Integrar una auditoría de medición en la incorporación de cada cliente. Dejar definiciones y prioridades que el equipo pueda usar desde el primer día.",
  },
  {
    title: "Una plantilla por producto", label: "Creatividad", summary: "Convertir el inventario en piezas que se pueden producir, medir y renovar.",
    problem: "Producir anuncios consistentes sin perder el control sobre disponibilidad, condiciones y rendimiento de cada producto.",
    inputs: "Inventario, imágenes, modelo, año, abono y letra quincenal.",
    steps: ["Comprobar disponibilidad y condiciones comerciales.", "Aplicar la jerarquía: promesa, gancho, modelo, abono, letra y confianza.", "Preparar variantes para financiación, pago al contado y catálogo.", "Llevar cada pieza a WhatsApp y leer su rendimiento por separado.", "Retirar piezas caras o productos vendidos y dar entrada al nuevo inventario."],
    tools: "Plantillas gráficas, inventario, feeds, Meta Ads y base de datos propia.",
    metric: "Coste por conversación de al menos tres mensajes reportada por Meta. Es una señal de continuidad del chat, no una venta ni una cualificación comercial.",
    cadence: "Rotación mensual, con revisión de disponibilidad al publicar.",
    result: "La campaña de financiación por coche registró 1.995 conversaciones ≥3 mensajes con 3.315,43 USD: 1,66 USD por conversación, del 20 de septiembre al 24 de noviembre.",
    proposal: "Crear un sistema de plantillas para clientes con catálogo u ofertas recurrentes. Acordar una rutina de renovación basada en stock y resultados.",
  },
  {
    title: "Guiones guiados por datos", label: "Vídeo", summary: "Elegir qué grabar a partir del inventario y las señales de intención.",
    problem: "Evitar una producción de vídeos desconectada de los productos prioritarios y de las objeciones del comprador.",
    inputs: "Antigüedad en inventario, visitas a fichas, clics a WhatsApp, oferta y rendimiento de los anuncios.",
    steps: ["Priorizar coches con más días en el lote o muchas visitas y pocos clics a WhatsApp.", "Elegir el público y la objeción que abordará el vídeo.", "Mostrar el abono desde el primer segundo y explicar la oferta con claridad.", "Asignar una UTM a cada pieza.", "Proponer al menos tres creativos activos por campaña.", "Revisar los que superen tres veces el coste objetivo durante siete días, sin mezclar tipos de resultado."],
    tools: "Inventario, analítica web, UTMs, plataformas publicitarias y CRM.",
    metric: "Coste por conversación ≥3 mensajes para los vídeos a WhatsApp. En captación por formulario, contrastar el lead reportado con la recepción y el resultado comercial.",
    cadence: "Guiones cada quince días; revisión del criterio de coste sobre siete días.",
    result: "El vídeo para asalariados registró 1.362 conversaciones a 1,16 USD; el de independientes, 932 a 1,69 USD. Ambos se midieron del 12 de marzo al 24 de noviembre.",
    proposal: "Preparar una tanda quincenal de guiones por cuenta. Entregar a producción el público, el gancho, la oferta y el criterio con el que se evaluará cada pieza.",
  },
  {
    title: "Devolver el resultado comercial", label: "Servidor y CRM", summary: "Conectar los eventos y las ventas con las plataformas, y comprobar qué se envía.",
    problem: "Recuperar contexto cuando el recorrido pasa de la web a WhatsApp y al CRM.",
    inputs: "Eventos, referencias de campaña, identificadores de clic, consentimiento y estados comerciales.",
    steps: ["Definir los eventos y su valor según la etapa comercial.", "Compartir event_id entre navegador y servidor donde corresponda.", "Conservar la referencia de campaña y los identificadores de clic al pasar a WhatsApp.", "Vincular la conversación con el resultado del CRM.", "Enviar las conversiones mediante las integraciones de cada plataforma.", "Revisar respuestas, omisiones y errores; comprobar la deduplicación por separado."],
    tools: "Meta Conversions API, TikTok Events API, Google Data Manager API y CRM.",
    metric: "Registros enviados correctamente y vinculados al origen. La aceptación de un envío no prueba atribución publicitaria ni deduplicación.",
    cadence: "Envío según la cola del sistema. Propuesta: revisar incidencias semanalmente.",
    result: "Para ventas con fecha hasta el 24 de noviembre, la cola registra 14 envíos a Google, 5 a Meta y 11 a TikTok con respuesta correcta. Los destinos pueden solaparse; no se suman como ventas únicas.",
    proposal: "Empezar con una cuenta que tenga CRM y estados comerciales claros. Validar un recorrido completo y dejar un procedimiento de revisión que el equipo pueda mantener.",
  },
  {
    title: "Optimizar después del clic", label: "Conversión", summary: "Revisar el recorrido hasta que la solicitud queda guardada y recibida.",
    problem: "Detectar pérdidas dentro de páginas y formularios que el coste del tráfico no explica.",
    inputs: "Visitas, pasos del chat o formulario, errores, abandonos, solicitudes y recepción en CRM.",
    steps: ["Medir el recorrido desde la llegada hasta el envío de los datos.", "Localizar el paso con fricción y revisar los mensajes que el chat no entiende.", "Corregir la interacción o el orden de las preguntas.", "Ofrecer opciones compatibles con el abono disponible cuando la primera no encaja.", "Comprobar que la solicitud se guarda y llega al CRM antes de dar el flujo por bueno."],
    tools: "Analítica propia, páginas de destino, chat de financiación, registros y CRM.",
    metric: "Solicitudes guardadas y recibidas respecto a los inicios del recorrido. Mostrar un resultado en pantalla no equivale a captar un lead.",
    cadence: "Propuesta: revisión diaria tras cambios importantes y semanal cuando el recorrido esté estable.",
    result: "La revisión del 19–20 de noviembre acreditó una prueba de contacto guardada en la web y recibida en el CRM. También detectó un error de JavaScript y una respuesta JSON visible al usuario; la reparación quedó publicada y documentada.",
    proposal: "Revisar las cuentas donde llega tráfico pero faltan solicitudes. Corregir primero la fricción demostrada y medir el recorrido antes de aumentar el presupuesto.",
  },
  {
    title: "Decidir con el dato correcto", label: "Campañas y atribución", summary: "Separar lo que reporta la plataforma de lo que confirma el negocio.",
    problem: "Evitar escalar campañas por indicadores que mezclan conversaciones, solicitudes y ventas.",
    inputs: "Gasto, acciones de plataforma, formularios, conversaciones, recorridos y resultados del CRM.",
    steps: ["Cruzar inversión y resultados con un periodo y una definición comunes.", "Separar conversaciones, leads agregados, formularios web y ventas.", "Revisar cambios de medición antes de interpretar una variación del CPL.", "Examinar las señales disponibles sobre apertura y cierre de recorridos.", "Decidir qué mantener, rehacer o apagar y documentar los límites de atribución."],
    tools: "Meta, TikTok y Google Ads, SQL, analítica de clics y CRM.",
    metric: "Resultado comercial verificable cuando existe atribución suficiente; en su ausencia, mostrar el indicador disponible con su definición y límite.",
    cadence: "Propuesta: revisión mensual y análisis de recorridos sobre ventanas de tres meses.",
    result: "El vídeo de captación combinado registró 1.290 leads agregados de Meta, de los que 1.262 eran leads web reportados. El anuncio de Toyota registró 5 leads agregados y 19 conversaciones ≥3 mensajes: son indicadores distintos.",
    proposal: "Añadir una lectura comercial al informe de cada cuenta. Elegir el modelo de atribución según su evidencia, sin imponer el mismo reparto a todos los clientes.",
  },
];
