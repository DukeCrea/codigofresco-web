# Optimización SEO y GEO de Código Fresco

Fecha: 15 de noviembre de 2026. Base: `origin/main` en `5ff1a05`. Rama: `codex/seo-geo`. Worktree: `../codigofresco-seo-geo`.

La propuesta de consolidación de URLs está pendiente de decisión. No se han aplicado nuevas redirecciones, eliminaciones ni etiquetas `noindex`. Tampoco se ha fusionado con `principal` o `main` ni se ha desplegado a producción.

## Implementación P0–P2

| Punto | Resultado | Archivos principales |
| --- | --- | --- |
| P0 · 1 | Favicon con imágenes de 32 y 48 px, Apple de 180 px y manifest. Derivados determinísticamente del monograma existente; sin nueva identidad gráfica. | `app/favicon.ico`, `app/apple-icon.png`, `app/manifest.ts` |
| P0 · 2 | Logo PNG de 512 × 512 como `ImageObject`, con dimensiones, en ambos idiomas. | `public/logo-codigofresco.png`, `app/(es)/layout.tsx`, `app/(en)/layout.tsx` |
| P0 · 3 | Eliminada la constante global. Fechas editoriales cuando existen y respaldo por archivo fuente desde Git durante `prebuild`; el mismo resolvedor alimenta sitemap y `dateModified`. | `scripts/content-dates.mjs`, `app/lib/content-dates.ts`, `app/lib/generated/content-dates.json`, `app/sitemap.ts`, `package.json` |
| P0 · 4 | Autor Antonio mediante su `@id` canónico, publicación, modificación, imagen e idioma en los 24 artículos: 20 casos ES/EN, 3 guías y 1 entrada del blog. Firma visible personal en Recursos. | `app/components/portfolio/case-page.tsx`, `app/(es)/casos/[slug]/legacy.tsx`, `app/(en)/en/cases/[slug]/legacy.tsx`, `app/(es)/recursos/[slug]/page.tsx`, `app/(es)/blog/[slug]/page.tsx` |
| P1 · 5 | Foto real existente del Web Summit, ocupación, nombre alternativo solicitado, español nativo e inglés B1. URL principal de Person estable entre idiomas. | `app/lib/seo.ts`, `app/lib/about.ts`, `app/components/portfolio/pages.tsx` |
| P1 · 6 | Se conserva únicamente el Instagram de marca ya publicado. URL principal de Organization consistente en ambos idiomas; tipo `Organization`, evitando presentar el servicio remoto como negocio local. | `app/(es)/layout.tsx`, `app/(en)/layout.tsx` |
| P1 · 7 | ZoDesk como `SoftwareApplication`, categoría `BusinessApplication`, creador Antonio e ID estable `https://codigofresco.com/#zodesk`. Enlazado desde Person y el caso. Sin precios ni valoraciones. | `app/lib/entities.ts`, `app/lib/seo.ts`, `app/components/portfolio/case-page.tsx`, `app/components/portfolio/pages.tsx` |
| P1 · 8 | Redacción de oferta en primera persona. Se conserva la atribución colaborativa de los casos donde corresponde. Propuesta URL por URL abajo, sin ejecutarla. | `app/lib/site.ts`, `app/lib/industrias.ts`, `app/lib/content.ts`, páginas de servicios, soluciones, industrias y Venezuela |
| P1 · 9 | Propuesta de diferenciación editorial abajo; sin migración. | Este informe |
| P2 · 10 | Resúmenes autocontenidos en ocho casos ES/EN con producción y pendientes explícitos. Los dos casos antiguos por idioma reutilizan reto, solución y resultado sin inventar un estado de producción. | `app/lib/portfolio/cases-es.ts`, `cases-en.ts`, `types.ts`, `app/components/portfolio/case-article.tsx`, ambos `legacy.tsx` |
| P2 · 11 | `/llms-full.txt` se prerenderiza desde los datos del sitio: biografía, principios, datos rápidos, herramientas, FAQ, casos ES/EN, casos antiguos ES, 22 servicios, guías y blog. Incluye límites, estados y la variante para talleres. Enlace desde `llms.txt`. | `app/llms-full.txt/route.ts`, `app/lib/about.ts`, `public/llms.txt` |
| P2 · 12 | Cinco preguntas sobre quién es Antonio, qué hace y desde cuándo, herramientas, trabajo remoto y contacto. Texto visible y `FAQPage` salen del mismo arreglo ES/EN. | `app/lib/about.ts`, `app/components/portfolio/pages.tsx` |
| P2 · 13 | Veinte imágenes OG específicas ES/EN de 1200 × 630, incluidos casos antiguos, con título y marca en lima sobre oscuro. Twitter reutiliza la imagen resuelta por Next. | ambos `casos/[slug]/opengraph-image.tsx` / `cases/[slug]/opengraph-image.tsx`, `app/components/portfolio/case-og.tsx` |
| P2 · 14 | Introducciones orientadas a elegir qué leer y enlaces entre guías, blog y casos; no se añadió relleno para alcanzar un número de palabras. | `app/(es)/blog/page.tsx`, `app/(es)/recursos/page.tsx` |

Se añadió charset explícito a sitemap, robots y manifest en `next.config.ts`. Se actualizó el auditor para aceptar imágenes sociales específicas, y se añadió `scripts/verify-seo-geo.mjs` para repetir las verificaciones de esta entrega.

### Criterio de fechas

`publishedAt`, `updatedAt` y la revisión documentada del estado de los proyectos tienen significados distintos. Los resúmenes nuevos llevan modificación editorial del 15 de noviembre; no se presenta esa fecha como una nueva auditoría de los sistemas de los clientes. Las fechas originales de publicación se conservan. En contenido sin fecha editorial se usa el último commit que tocó su plantilla o sus datos fuente; un archivo compartido puede dar la misma fecha a varias páginas.

El snapshot de fechas se guarda para builds sin `.git`, habituales al desplegar desde archivos. En clones superficiales se conserva la publicación ya verificada y solo se avanza la modificación; si falta una fuente nueva, se exige generar el snapshot con historial completo. No se sustituye una fecha desconocida por la hora del build. Después de cambiar contenido y antes de entregar un archivo de fuentes sin Git, ejecutar `npm run build` en el repositorio completo y guardar el snapshot actualizado.

## Propuesta del punto 8: pendiente de aprobación

No hay acceso conectado a Search Console en esta sesión. Todas las métricas figuran como **sin datos**; ninguna fusión se justifica por tráfico supuesto. Las recomendaciones son editoriales, basadas en intención, solapamiento y casos publicados. Antes de ejecutarlas, exportar clics e impresiones por página y consulta de los últimos 90 días, y revisar backlinks y estacionalidad. Una página corta no implica por sí sola una penalización.

En la tabla, «mantener» significa mantener la URL y desarrollar su contenido en primera persona con evidencia propia; «fusionar» significa trasladar su contenido útil al destino y después aplicar una 301 directa. No recomiendo `noindex` como solución permanente para ofertas que sí deben poder encontrarse: concentrar páginas redundantes evita mantener dos destinos con la misma función. La finalidad es facilitar que el visitante y el buscador identifiquen la oferta y su autor. Como referencia, Google describe el riesgo de páginas sustancialmente similares que solo intermedian hacia el destino útil en sus [políticas sobre páginas puerta](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse); esto no demuestra una infracción de este sitio.

| URL | Tráfico / impresiones | Recomendación y destino | Porqué técnico y beneficio |
| --- | --- | --- | --- |
| `/soluciones/dev` | sin datos | Fusionar → `/servicios/desarrollo-de-software` | Reducir la repetición de oferta genérica y explicar la arquitectura y el alcance en un destino más concreto. |
| `/soluciones/automation` | sin datos | Fusionar → `/servicios/automatizacion-marketing-procesos-comerciales` | Reunir el método y sus casos en la oferta ya escrita desde la experiencia personal. |
| `/soluciones/marketing` | sin datos | Mantener y reescribir | Usarlo como guía de estrategia que conecta contenido, campañas y medición; diferenciarlo del servicio operativo de Ads. |
| `/servicios/implementacion-crm-seguimiento-comercial` | sin datos | Mantener y reescribir | Oferta con evidencia de Zoho y ZoDesk; será el destino central de CRM y seguimiento. |
| `/servicios/automatizacion-marketing-procesos-comerciales` | sin datos | Mantener y reescribir | Une catálogo, campañas, correo y alertas con casos verificables y límites explícitos. |
| `/servicios/integracion-ecommerce-erp` | sin datos | Mantener y reescribir | Intención específica y caso SAINT; documentar lectura, publicación y escritura por separado. |
| `/servicios/sistemas-concesionarios-talleres` | sin datos | Mantener y reescribir | Oferta sectorial respaldada por ZoDesk; explicar el estado de cada variante sin prometer módulos ausentes. |
| `/servicios/paginas-web-corporativas` | sin datos | Mantener y reescribir | Necesidad distinta de software interno, con BARETEC como evidencia y autonomía editorial como objetivo. |
| `/servicios/e-commerce` | sin datos | Mantener y reescribir | Destino de comercio electrónico; separar catálogo, cobro, logística e integraciones según cada caso. |
| `/servicios/desarrollo-wordpress` | sin datos | Mantener y reescribir | Existe experiencia demostrable en WordPress y WooCommerce; explicar decisiones técnicas propias. |
| `/servicios/desarrollo-shopify` | sin datos | Fusionar → `/servicios/e-commerce` | Shopify puede figurar como opción de plataforma; no hay aquí un caso propio que justifique una página casi paralela. |
| `/servicios/landing-pages` | sin datos | Mantener y reescribir | Intención de captación específica; explicar recorrido, medición y entrega al CRM con ejemplos. |
| `/servicios/desarrollo-de-software` | sin datos | Mantener y reescribir | Destino de sistemas a medida y del contenido útil del hub de desarrollo. |
| `/servicios/seo-y-geo` | sin datos | Mantener y reescribir | Usar el propio sitio como ejemplo técnico verificable; no prometer posiciones ni citas de IA. |
| `/servicios/gestion-control-ads` | sin datos | Mantener y reescribir | Consolidar gestión y diagnóstico de campañas con trazabilidad hasta el resultado comercial. |
| `/servicios/panel-monitor-administrativo-inteligente` | sin datos | Mantener y reescribir | Diferenciar indicadores, reglas y acciones; declarar qué paneles siguen en construcción. |
| `/servicios/chatbot-whatsapp-redes-sociales-ia` | sin datos | Fusionar → `/servicios/automatizacion-marketing-procesos-comerciales` | Presentar el chat como pieza de un flujo, aclarando que el asistente de WhatsApp documentado está apagado. |
| `/servicios/control-gestion-atencion-leads` | sin datos | Fusionar → `/servicios/implementacion-crm-seguimiento-comercial` | Etapas, responsables y recordatorios son parte de la misma necesidad de CRM. |
| `/servicios/respuestas-automatizadas-comentarios-redes-sociales` | sin datos | Fusionar → `/servicios/automatizacion-marketing-procesos-comerciales` | Es un canal del flujo de automatización; reunir límites de API e intervención humana en un solo destino. |
| `/servicios/evaluacion-contenido-empresa` | sin datos | Fusionar → `/servicios/evaluacion-redes-sociales-estrategia-digital-publicidad` | El diagnóstico de contenido comparte mensaje, formatos y conversión con la auditoría de estrategia. |
| `/servicios/creacion-edicion-videos` | sin datos | Mantener y reescribir | Entregable concreto, distinto de la auditoría; enlazar al caso de guiones con límites de resultados. |
| `/servicios/evaluacion-redes-sociales-estrategia-digital-publicidad` | sin datos | Mantener y reescribir | Conservar una oferta clara de diagnóstico y prioridades, separada de ejecutar campañas. |
| `/servicios/evaluacion-inversion-ads` | sin datos | Fusionar → `/servicios/gestion-control-ads` | El diagnóstico de gasto puede ser una fase del servicio de Ads sin repetir casi la misma oferta. |
| `/servicios/calculo-roi-publicitario` | sin datos | Mantener y reescribir | Intención específica de medición, apoyada en reportes; explicar margen, atribución y calidad de datos. |
| `/servicios/software-automatizado-publicaciones-redes-sociales` | sin datos | Fusionar → `/servicios/automatizacion-marketing-procesos-comerciales` | Integrar calendario, aprobaciones y publicación como capacidad, con su estado real y límites de canal. |
| `/industrias/concesionarios-de-autos` | sin datos | Fusionar → `/servicios/sistemas-concesionarios-talleres` | Ambas páginas resuelven procesos del concesionario; concentrar casos y módulos en la oferta sectorial. |
| `/industrias/tiendas-multi-pais` | sin datos | Fusionar → `/servicios/integracion-ecommerce-erp` | El valor diferencial documentado es integrar stock y precio por sede, conservando el contexto de Camsmark. |
| `/venezuela` | sin datos | Mantener y reescribir | Aportar contexto real de operación remota, SAINT, conectividad y monedas; evitar una mera copia geográfica de los servicios. |

Son 28 URLs españolas: 3 hubs, 22 servicios, 2 industrias y Venezuela. Si se aprueba una fusión, revisar también el equivalente inglés existente y actualizar hreflang, sitemap, enlaces internos y enlaces de casos; no dejar cadenas de redirección. El destino definitivo puede cambiar si los datos muestran que otra URL concentra consultas o enlaces relevantes.

## Propuesta del punto 9: diferenciar Blog y Recursos

Recomiendo **mantener ambas secciones diferenciadas**, pendiente de tu decisión. Recursos responde preguntas estables para elegir o evaluar una solución, con respuesta directa y FAQ. Blog narra el proceso de construcción de Antonio, sus hipótesis y límites, con demos y fechas. Tienen funciones e intenciones distintas; separarlas ayuda a encontrar tanto un criterio práctico como su contexto de autor.

No propongo una migración por tener hoy solo tres guías y un artículo. La cantidad no demuestra duplicidad ni justifica el costo de mover URLs. Si un futuro artículo cubre el mismo propósito que una guía, se decide entonces cuál conservar según contenido, consultas y enlaces, trasladando valor y aplicando una 301. La implementación actual solo mejora las introducciones y los enlaces cruzados solicitados en el punto 14.

## P3: acciones después de aprobar y desplegar

1. Revisar si `codigofresco.com` ya tiene propiedad en Google Search Console. Si no, crear propiedad de dominio y verificar mediante el registro DNS exacto que indique Google. Mantener la verificación existente si ya funciona. No asumir titularidad por la presencia de analítica. [Guía de verificación de Google](https://support.google.com/webmasters/answer/9008080).
2. Enviar `https://codigofresco.com/sitemap.xml` en Sitemaps y revisar que se procese. Inspeccionar Home ES/EN, Sobre mí y un caso; comprobar canonical elegido, indexabilidad y última lectura. Exportar rendimiento por página y consulta antes de aprobar fusiones. [Introducción a Search Console](https://support.google.com/webmasters/answer/10267942).
3. En Bing Webmaster Tools, revisar el sitio existente; si falta, añadirlo y completar la verificación o la importación que ofrezca Bing. Enviar el mismo sitemap y revisar los informes de rastreo. [Ayuda oficial de Bing](https://www.bing.com/webmasters/help/webmaster-support-24ab5ebf).
4. Una vez publicado y comprobado el build de producción, ejecutar `node scripts/indexnow.mjs` desde este repositorio. El script envía las URLs del sitemap publicado y espera HTTP 200 o 202. La aceptación no garantiza indexación. No se ejecutó durante esta tarea, porque avisaría de cambios que todavía no están en producción.
5. Repetir el smoke test contra producción: `AUDIT_BASE_URL=https://codigofresco.com node scripts/verify-seo-geo.mjs`. Probar también las nuevas imágenes con las herramientas de vista previa de las redes usadas.

### Perfiles externos: completar sin inventar URLs

| Perfil | Acción propuesta | Para qué |
| --- | --- | --- |
| LinkedIn personal | Completar nombre, actividad desde 2016, proyecto ZoDesk, enlace a `/nosotros` y casos públicos. Confirmar la URL exacta antes de añadirla a Person. | Relacionar experiencia, autor y sitio con una fuente profesional verificable. |
| GitHub personal | Usar la cuenta real, completar la bio y enlazar el portafolio. Fijar solo repositorios públicos que se puedan atribuir; no publicar código privado de clientes. | Dar evidencia técnica y coherencia al nombre y al creador de ZoDesk. |
| Instagram / canal DukeCrea | Confirmar la URL y si representa a Antonio o a la marca. Mantener nombre y enlace coherentes; añadir a la entidad que corresponda. | Evitar confundir el perfil personal con Código Fresco. |
| Perfil de marca existente | Mantener el Instagram ya publicado; añadir otros perfiles solo tras recibir URLs exactas de su propietario. | Reforzar la marca sin fabricar asociaciones. |
| Crunchbase | Valorar una ficha de Código Fresco o ZoDesk solo si corresponde a una entidad real y se pueden completar datos verificables. No inventar inversión, tamaño ni fecha de fundación. | Documentar la marca o producto, sin convertir el portafolio en una empresa ficticia. |
| Directorio profesional del sector | Elegir uno relevante para trabajo remoto, CRM o automatización que permita perfil sin oficina física. Publicar capacidades y enlace a casos, con la misma bio. | Obtener una referencia temática útil, sin crear fichas locales engañosas. |

Bio personal consistente sugerida:

> Soy Antonio Duque, estratega de marketing y creador de sistemas comerciales. Trabajo en marketing y procesos comerciales desde 2016 y soy el creador de ZoDesk. Conecto marketing, ventas y operación con CRM, automatización e integraciones. Trabajo en remoto; mi experiencia directa está en Panamá y Venezuela. Español nativo e inglés B1. Casos y contacto: https://codigofresco.com/nosotros

Bio de marca consistente sugerida:

> Código Fresco es la marca con la que Antonio Duque trabaja junto a Noe Rivas en proyectos digitales. Su portafolio documenta estrategia de marketing, CRM, automatización e integraciones, con el estado real de cada pieza. Trabajo remoto y casos públicos en https://codigofresco.com

No se creó ninguna cuenta ni se publicó ninguna bio.

## Pendientes y límites

- Faltan las URLs personales y las nuevas URLs de marca: el encargo contiene `[PEGAR URL]`. No se añadieron a `sameAs` ni se dedujeron de nombres de usuario.
- Se usó una foto real existente. No hace falta una nueva foto para esta entrega.
- No se añadió `Duke Crea` como alias de Person: no hay confirmación suficiente de ese nombre como alias público de Antonio en los datos de este portafolio. Sí se conserva `Antonio Duque`, solicitado expresamente.
- No se añadió `homeLocation`: mercados atendidos y Ayamonte como base prevista no acreditan el país de residencia actual.
- Sin acceso a Search Console/Bing no se puede confirmar desde esta sesión su verificación, rendimiento ni estado de indexación.
- El nodo SoftwareApplication cumple el modelo de schema.org sin inventar precio ni reseñas. Esto no garantiza un resultado enriquecido de software de Google, cuyo formato exige información adicional que aquí deliberadamente no se inventa. [Documentación de Google](https://developers.google.com/search/docs/appearance/structured-data/software-app).
- Se conserva SVG como ícono del navegador; se añade PNG para logo de entidad y compatibilidad. No se afirma que Google rechace universalmente SVG: su documentación de Organization exige un formato compatible con Google Images. [Documentación de Organization](https://developers.google.com/search/docs/appearance/structured-data/organization).
- La presencia de `llms-full.txt` y resúmenes claros facilita el acceso al contenido; no garantiza citas de motores generativos.

## Verificaciones

| Verificación | Resultado |
| --- | --- |
| `npm ci` en el worktree | Correcto, instalación reproducible desde el lockfile. Sin cambios de dependencias. |
| `npm run lint` | Correcto. |
| `npm run build` | Compilación, TypeScript y 105 páginas generadas correctamente. |
| `npm audit --audit-level=high` | Código de salida 0; cero altas o críticas. Siete moderadas en la cadena de herramientas ESLint/TypeScript (`minimatch`). No se aplicó `audit fix`. |
| `npm run start -- --hostname 127.0.0.1 --port 3106` | Build de producción local levantado y revisado. |
| `AUDIT_BASE_URL=http://127.0.0.1:3106 npm run audit:seo` | 88 URLs indexables sin fallos; legales y acceso al panel con `noindex`. |
| `node scripts/verify-seo-geo.mjs` | 88 páginas y 8 recursos con 200. 176 bloques JSON-LD analizados con `JSON.parse`; 24 artículos con autor, fechas e idioma; coincidencia de modificación con sitemap; sin propiedades prohibidas ni contradicciones de identidad comprobadas. |
| Imágenes | 20 OG ES/EN devuelven PNG de 1200 × 630; Twitter usa su correspondiente OG. Favicon incorpora 32 y 48 px; Apple 180 × 180; logo 512 × 512. |
| Enlaces y CTAs | 93 destinos internos con HTTP 200; 199 enlaces en pestaña nueva con `noopener noreferrer`. FAQ nativa abierta y texto comprobado en navegador. No se enviaron formularios ni mensajes. |
| UTF-8 | Charset primero en `head`, cabeceras textuales explícitas, fuentes sin BOM; sin mojibake en fuentes modificadas o HTML renderizado. Las imágenes usan su tipo binario, sin charset textual. |
| Navegador automatizado | 88 páginas a 390 × 900 y a 1440 × 900, un H1, `main`, imágenes con `alt` y sin desbordamiento horizontal. |
| Revisión visual | Capturas revisadas de páginas ES/EN, casos, Sobre mí, Blog, Recursos, CRM, soluciones, industria y Venezuela. Se conserva la tipografía existente, el tema oscuro y el único verde lima. |
| schema.org | Se envió el HTML local a `https://validator.schema.org/validate`: Home ES/EN, Sobre mí ES/EN, ZoDesk ES/EN, BARETEC ES, una guía y el artículo del blog. Nueve documentos con cero errores y cero advertencias. |
| Revisión React | Nuevos bloques siguen en Server Components; FAQ con `details` nativo, nombres accesibles, enlaces internos con `Link`; no se añadieron efectos, librerías, fuentes ni animaciones. |

Las evidencias locales quedan en `output/seo-geo/` (ignorado por Git): `verificacion.json`, `navegador.json`, `schema-validator.json` y HTML/JSON-LD de muestra. Los validadores y controles de viewport no sustituyen una auditoría completa de accesibilidad ni demuestran indexación de producción.

### Fallos detectados y corregidos

- Primer build: `Cannot find name 'PORTFOLIO_REVIEWED'` en `pages.tsx`; se restauró la importación porque la fecha de revisión visible sigue siendo necesaria.
- Primera comprobación de identidad: `https://codigofresco.com/#organization contradice url` en `/en`; se unificó su URL principal.
- La comprobación inicial de metadata detectó que Next añade sufijos a las rutas OG por los grupos de rutas. Se dejó la resolución a la convención `opengraph-image.tsx`, retirando el valor de imagen genérica de la metadata de casos. Se comprobaron las URLs finales servidas.
- El primer smoke encontró robots, sitemap y manifest sin charset explícito; se añadieron sus cabeceras UTF-8 y se repitió la verificación.

### Incidencia de aislamiento resuelta

Por un error inicial de directorio, `npm ci` se inició en la carpeta principal y fue interrumpido. No se modificaron sus archivos rastreados ni se mezcló su trabajo en esta rama, pero quedó incompleto su `node_modules`. Se restauró con `npm ci` usando su propio lockfile y se comprobó la carga de Next.js 16.2.9. Su estado Git conserva los mismos archivos de trabajo observados al inicio.

Esa restauración reportó **8 vulnerabilidades altas y 1 crítica**, además de 8 moderadas, en las dependencias de la carpeta principal. Es un árbol distinto del worktree SEO (Next.js 16.4.6, sin altas ni críticas). No se cambió su lockfile ni se intentaron arreglos sobre el trabajo ajeno. Esa rama requiere una revisión de dependencias separada por su responsable.

