# Caso para Empact

Página: https://codigofresco.com/para/empact

Presentación de Antonio Duque para Javi y Xavi. El cliente final permanece anonimizado. La ruta usa el layout sin analítica del grupo `(demo)`, no se añade al sitemap y declara `noindex,nofollow`. Es una URL accesible con el enlace, no un recurso con autenticación.

## Fuente y corte

Consulta de solo lectura realizada el 25 de noviembre de 2026 sobre la base operativa del concesionario. La extracción ejecutó `SET SESSION TRANSACTION READ ONLY`, inició una transacción y terminó con rollback. No se ejecutaron comandos de sincronización, envíos ni cambios de campañas o CRM. Solo se extrajeron agregados.

Los datos publicitarios se cortan al 24 de noviembre. Los estados de conversiones offline son los observados el 25 para eventos comerciales con fecha anterior al 25. Esto no equivale a una instantánea del estado de envío al cierre del 24.

Evidencia interna, excluida de Git y de publicación: `output/empact/source-aggregates.json` y `output/empact/research.php`. Auditorías locales consultadas: medición, remarketing y reparación de contacto del 19–20 de noviembre. No se publican sus exportaciones, identificadores de cuentas, datos personales ni credenciales.

## Cifras publicadas

| Indicador | Valor | Fuente y criterio |
| --- | ---: | --- |
| Meta | USD 54.343,68 | ad_insights, level=campaign, 12 mar–24 nov |
| TikTok | USD 15.253,81 | misma tabla/nivel, datos desde 8 may |
| Google | USD 9.599,82 | misma tabla/nivel, datos desde 1 may |
| Total | USD 79.197,31 | suma de los importes sin redondeo a enteros |
| Campaña por coche | USD 3.315,43; 3.521 chats iniciados; 1.995 de ≥3 mensajes | selección por nombre de campaña, 20 sep–24 nov |
| Vídeo asalariados | USD 1.573,73; 1.362 conversaciones; USD 1,16/conversación | nombre de pieza, 12 mar–24 nov |
| Vídeo independientes | USD 1.574,99; 932 conversaciones; USD 1,69/conversación | nombre de pieza, 12 mar–24 nov |
| Imagen Picanto septiembre | USD 144,72; 159 conversaciones; USD 0,91/conversación | nombre de pieza, 13 sep–16 nov |
| Vídeo captación combinado | USD 8.216,84; 1.290 leads agregados, 1.262 leads web reportados | nombre de pieza, 30 jun–29 sep |
| Matching de catálogo | 9.203 / 9.206 = 99,9674 % | auditoría del 20 nov, API event_stats 12–18 nov |
| Ventas offline enviadas | Google 14, Meta 5, TikTok 11 | evento=venta, ocurrio_at<25 nov; estado=enviado y respuesta «ok» |

Las conversaciones son `onsite_conversion.messaging_user_depth_3_message_send`, reportadas por Meta. No son contactos únicos verificados en CRM. Los chats iniciados usan `onsite_conversion.messaging_conversation_started_7d`.

Los leads agregados usan `lead`; los leads web usan `offsite_conversion.fb_pixel_lead`. No se suman ambos. Los costes se calculan con el gasto exacto antes de redondear a dos decimales. La vista a nivel de anuncio no se suma a la vista a nivel de campaña.

El servicio de conversiones marca `enviado` al recibir una respuesta HTTP satisfactoria. Google usa `https://datamanager.googleapis.com/v1/events:ingest` y acciones secundarias. Los 14 registros de ventas a Google tenían respuesta «ok» sin el marcador de avisos; Meta y TikTok tenían «ok». Esto confirma el envío registrado, no la atribución, deduplicación o registro posterior de una conversión atribuida en interfaz.

## Correcciones frente al borrador

- USD 79.198 era la suma de los canales redondeados a dólares; se publica la suma precisa, USD 79.197,31. Hay además una diferencia de un centavo entre el agregado de anuncios Meta y el agregado de campañas; se mantiene un nivel uniforme para el total.
- El periodo 13 sep–24 nov no correspondía al agregado de campaña de 1.995 conversaciones. Ese total empieza el 20 sep. Al seleccionar TODAS las piezas cuyo nombre contiene la promoción desde el 13 sep, el agregado es distinto: USD 3.684,55, 3.946 chats iniciados, 2.243 de ≥3 mensajes. No se mezclan ambos conjuntos.
- «1.290 formularios» y «226 formularios» eran leads agregados Meta. Los leads web reportados respectivos son 1.262 y 221. No se presentan como solicitudes conciliadas individualmente con el CRM.
- El anuncio Toyota tenía 5 leads agregados y 19 conversaciones ≥3 mensajes; no se reduce a «5 resultados» sin definición.
- La deduplicación individual sigue pendiente en la auditoría disponible. La implementación con event_id no basta para darla por comprobada.
- La nota histórica del cliente describía Zoho como CRM; la auditoría reciente y el código operativo señalan ZoDesk. Se informó al usuario y no se editaron las notas de Claude.
- No se reprodujeron con suficiente evidencia los valores históricos de 3,3×, 99,4 %, 590 envíos legítimos mensuales, descenso de 71 % corregido en 24 h, 64 % de inventario vendido, ni el escenario TikTok USD 2.749/204 formularios/0 compras. Se excluyen de la página, sin declarar que sean falsos.
- No se presenta un modelo en U como conclusión general: se propone elegir el modelo por cuenta y evidencia.
- No se incluyen originales de anuncios con marcas o datos que identifiquen al cliente. El caso visual utiliza datos y diagramas propios, sin hacer pasar recreaciones por capturas originales.

## Alcance técnico

Cambios nuevos únicamente en `app/(demo)/para/empact/` y esta documentación. Server Components y detalles HTML nativos; sin nuevas dependencias, formularios, almacenamiento ni scripts de terceros. Metadatos dedicados y vista previa Open Graph. La navegación y contacto funcionan con enlaces estándar.

Verificación y publicación: se documentan al completar lint, build, audit, revisión visual y pruebas HTTP/browser.

## Verificación local completada

- `npm ci`: instalación reproducible correcta.
- `npm run lint`: correcto.
- `npm run build`: correcto, incluido TypeScript; ruta e imagen OG generadas estáticamente.
- `npm audit --audit-level=high`: cero vulnerabilidades.
- 18 grupos de comprobaciones Playwright aprobados: UTF-8, metadatos, cifras, anonimización, ausencia de scripts de medición, Open Graph, anclas, seis desplegables y teclado, metodología, responsive a 320/390/768/1440 px, exclusión del sitemap, robots y errores JavaScript.
- Smoke test HTTP 200 de Home y las 22 páginas de servicio.
- Revisión visual de la página Empact completa en escritorio y móvil; Home y servicio de CRM en ambos formatos: sin defectos introducidos por la nueva ruta.
- Correo actualizado guardado en `output/empact/correo-empact.txt`, 250 palabras incluido asunto; no se ha enviado.

Una primera consulta de investigación falló con `SQLSTATE[42000] ... near 'rows from ad_insights'`: `rows` era un alias reservado. Se corrigió a `row_count` y la extracción terminó correctamente. No se escribió en la base del cliente.

El conector Vercel devolvió `403: forbidden` para el equipo. La CLI autenticada confirmó el proyecto y sus dominios, permitiendo continuar en el mismo equipo sin cambiar permisos.
