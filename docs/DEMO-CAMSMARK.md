# Demo Freedom + Ads — Camsmark Latam

Ruta: `/demo/camsmark`. URL: `https://codigofresco.com/demo/camsmark`.
Publicación en producción autorizada por el propietario el 20 de noviembre de 2026.

## Alcance

- Demo para Ricardo / CAMSCOL SAS, con identidad de Código Fresco en el marco y Camsmark en las piezas.
- Seis publicaciones seleccionables en un teléfono, cuadrícula de perfil, Facebook, historia etiquetada, carrusel de seis láminas, Meta Ads, Google Ads, reporte ilustrativo.
- Explica descubrimiento en redes, exposición pagada en Meta e intención de búsqueda en Google. Distingue anuncios y SEO, sin promesas de resultados.
- Ajuste posterior solicitado por el propietario: la página se centra en mostrar qué hará el servicio. Se retiraron el precio mensual, el bloque comercial, el enlace de Stripe y el precio en la vista previa de WhatsApp. Se conservan los precios de los productos dentro de los ejemplos.
- Sin publicación, autenticación social, APIs publicitarias ni envío de mensajes. La ruta queda excluida de los componentes de medición.
- `noindex, nofollow`, canonical propio y vista previa de WhatsApp. No añadida al menú ni al sitemap.
- Enlace no listado: **no es una página protegida por contraseña**.

## Investigación pública (20 de noviembre de 2026)

Se consultó el [sitio de Champion Motors](https://championmotors.com.pa/) como referencia de presentación del inventario. La consulta inicial del buscador no permitía leer Instagram; después se pudo abrir el perfil y publicaciones individuales con navegador anónimo, sin iniciar sesión.

1. [Toyota Hilux 2016, publicación del 20 de noviembre](https://www.instagram.com/championmotorspanama/p/Df-Kr5Uo36O/): fotografía del vehículo, nombre/año, precio USD 25.599, datos técnicos, CTA a WhatsApp y hashtags de marca, categoría y país. No se tomaron esos datos técnicos como verificados: la publicación muestra un kilometraje que no se validó.
2. [Carrusel del 19 de noviembre](https://www.instagram.com/championmotorspanama/p/Df8G4qnI8bv/): selección de ocho autos con modelos, precios y CTA de consulta. El perfil identifica la publicación como carrusel; la vista pública permitió leer el copy y ver una imagen, no recorrer todas las láminas. Incluye Kia Rio, Toyota Corolla Cross, Suzuki S-Cross, Kia Picanto, Hyundai Accent, Toyota Hilux, Hyundai Creta y Mercedes Benz GLB200.
3. La historia activa del perfil pidió registro o inicio de sesión: no se inspeccionó su contenido. No se fabricaron capturas ni se afirmó haberla visto.
4. [Facebook público](https://www.facebook.com/championmotorspanama/) devolvió `You're Temporarily Blocked` en la lectura web. No se inició sesión ni se insistió mediante APIs.

La página entregada **no contiene el nombre, enlaces, logo ni fotografías de Champion Motors**. La comparación con vehículos es genérica. La referencia documenta el formato; el copy de Camsmark fue redactado específicamente para la demo, no copiado.

Para la explicación de búsqueda se consultó [Google Ads: anuncios y resultados de búsqueda](https://support.google.com/google-ads/answer/1722020?hl=es). Los anuncios pueden aparecer según la búsqueda, segmentación, pujas y otros factores; no equivalen al posicionamiento orgánico.

## Productos

Fuente: fichas públicas y JSON-LD de [Camsmark Panamá](https://camsmark.com/pa). Nombres originales, precios, enlaces y URL originales de imagen están en `app/(demo)/demo/camsmark/products.ts`. Se usan datos estáticos, sin conectar inventario en tiempo de ejecución.

| Producto | Precio USD |
| --- | ---: |
| Sirena electrónica TCZ-220, 110 V | 53.76 |
| Aislador EL-24, 24 kV | 35.80 |
| Aislador EL-15, 15 kV | 28.90 |
| Aislador EL-6M, 6 kV | 18.35 |
| Aislador SM-76, 600 V | 6.23 |
| Aislador SM-35, 600 V | 2.11 |

Se verificaron ocho fichas; se excluyó la caja TJ-AG-1212X10 por figurar sin existencias. Las seis seleccionadas tenían disponibilidad y foto al consultarlas. Si una imagen falla, se muestra un marcador con el modelo. Los precios corresponden a Panamá, no se extrapolan a Venezuela.

## Publicación y propuesta

La entrega parte de `origin/main` (`f75ce4e`), en un checkout aislado para conservar los cambios locales ajenos a la demo. Utiliza el stack actual de Código Fresco: Next.js 16.4.6, React 19 y Tailwind 4. El grupo de rutas `(demo)` tiene un layout raíz sin analítica ni scripts publicitarios y no modifica los layouts del sitio principal.

La propuesta original proporcionada por el propietario se incorpora en `/demo/camsmark/propuesta.pdf`, enlazada desde la demo. Se conserva su contenido de cinco páginas; únicamente se completa el marcador de pago de la última página y su botón con el enlace de Stripe autorizado. El archivo original de Downloads permanece intacto. La tarifa de USD 250/mes y la pauta aparte se explican en el PDF.

El PDF envía `X-Robots-Tag: noindex, nofollow, noarchive`. Ni la demo ni el PDF requieren autenticación: son enlaces no listados, no documentos protegidos por contraseña.

La auditoría del checkout actualizado detectó siete vulnerabilidades moderadas transitivas. `npm audit fix` actualizó únicamente el lockfile, sin cambios de dependencias directas ni `--force`; `npm ci` posterior informa cero vulnerabilidades.

## Verificación

La implementación inicial aprobó lint, compilación, 70 comprobaciones de interacciones, metadatos, enlaces, ausencia de medición y responsive a 320/390/768/1440 px. También se probaron teclado y deslizamiento táctil del carrusel, y el marcador de imagen al fallar su URL.

Para producción se repiten instalación reproducible, lint, compilación y auditoría sobre el checkout actualizado, además de revisar móvil y escritorio, el enlace al PDF, sus cinco páginas y el destino real del botón de Stripe. Las capturas y los registros de validación son artefactos locales y no se publican en el repositorio.
