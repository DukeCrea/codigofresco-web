# Sistema de diseño de Código Fresco

Identidad aplicada en la rama `claude/identidad-pixel`. Los recursos oficiales
(logo, mascota, variante corporativa y brandbook) están en `docs/marca/` tal
como llegaron de Drive; la web usa sus versiones WebP de `public/marca/`.

## Tokens (`app/globals.css`)

| Token | Valor | Uso |
|---|---|---|
| `--cf-green` | `#99fb2f` | Verde manzana, medido sobre el logo original. Único verde del sitio. |
| `--cf-black` | `#050505` | Fondo. |
| `--cf-surface`, `--cf-surface-2` | `#0c0d0b`, `#121410` | Tarjetas y bandas. |
| `--cf-line`, `--cf-muted` | `#262922`, `#a4aa9c` | Bordes y texto secundario. |
| `--cf-pixel` | `10px` | Lado del píxel decorativo. |
| `--cf-ease`, `--cf-fast`, `--cf-slow` | — | Curva y duraciones de movimiento. |

`lime-400` de Tailwind está redefinido como `--cf-green`, así que todas las
páginas existentes adoptan el verde de la marca sin tocar sus clases.

## Tipografía

- Titulares: **Sora** (600, 700, 800), con la clase `font-display`. Se carga con
  `next/font` desde `app/fonts.ts` y se sirve desde el propio dominio.
- Cuerpo: fuente del sistema.
- Detalles de código: `font-mono`.

Para volver a la fuente del sistema en titulares basta con quitar
`var(--font-sora)` de `.font-display` y de `--font-display`.

## Clases de marca

| Clase | Qué hace |
|---|---|
| `cf-btn`, `cf-btn-ghost` | Botón principal (sombra dura que se desplaza) y secundario. |
| `cf-card` | Tarjeta con esquina de píxeles que se enciende al pasar el cursor o recibir foco. |
| `cf-eyebrow`, `cf-caret` | Etiqueta en monoespaciada (`// servicios`) y cursor de terminal. |
| `cf-dots` | Trama de puntos del brandbook. |
| `cf-px` | Píxel que parpadea a saltos. |
| `cf-reveal` | Desplazamiento al entrar en pantalla; solo CSS y nunca oculta contenido. |
| `cf-mascot` | Flotación suave de la mascota. |
| `cf-bubble`, `cf-burst`, `cf-chew` | Chicle que se infla, estallido de píxeles y mascada. |

Todo el movimiento se desactiva con `prefers-reduced-motion`.

## Componentes (`app/components/brand/`)

- `mascot.tsx` → `Mascot`: variantes `chicle`, `icono` y `corporativa`.
- `mascot-switch.tsx` → `MascotSwitch`: botón «Más corporativo / Más fresco» del hero.
- `pixels.tsx` → `Pixels`, `PixelArrow`, `MascotCue` (la mascota presenta cada sección) y `BrandLockup` (logotipo de cabecera).

## Componentes modificados

- `app/components/portfolio/home.tsx`: portada nueva (Hero, Servicios, Soluciones, Proyectos, Metodología, Contacto), en español e inglés.
- `app/components/portfolio/chrome.tsx`: cabecera con el logotipo y pie con mascota y lema.
- `app/lead-intake-section.tsx`: la mascota aparece en el estado de envío correcto.
- `app/(es)/layout.tsx`, `app/(en)/layout.tsx`, `app/(demo)/layout.tsx`: variable de la fuente.
- `app/(es)/page.tsx`, `app/(en)/en/page.tsx`, `app/components/portfolio/pages.tsx`: título y descripción de la portada.
- Iconos: `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`, `public/logo-codigofresco.png`.

## Reglas de uso de la mascota

- No se redibuja ni se recolorea.
- Variante del chicle: portada, cierre y estados interactivos.
- Variante corporativa: secciones dirigidas a empresas y presentaciones.
