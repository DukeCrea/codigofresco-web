import Image from "next/image";

import type { Locale } from "../../lib/i18n/config";

/**
 * Mascota original de Código Fresco. No se redibuja ni se recolorea: las tres
 * variantes son los archivos oficiales convertidos a WebP (docs/marca/).
 *
 * - `chicle`: la cabeza con el chicle, la de siempre. Portada y estados interactivos.
 * - `icono`: el mismo dibujo recortado, para tamaños pequeños.
 * - `corporativa`: de traje, para secciones dirigidas a clientes empresariales.
 */
export type MascotVariant = "chicle" | "icono" | "corporativa";

const sources: Record<MascotVariant, { src: string; width: number; height: number }> = {
  chicle: { src: "/marca/mascota.webp", width: 800, height: 800 },
  icono: { src: "/marca/mascota-icono.webp", width: 256, height: 256 },
  corporativa: { src: "/marca/mascota-corporativa.webp", width: 665, height: 900 },
};

const alts: Record<MascotVariant, Record<Locale, string>> = {
  chicle: {
    es: "Mascota de Código Fresco: un chico de gafas con símbolos de código que infla un chicle verde.",
    en: "Código Fresco mascot: a boy with code symbols on his glasses blowing a green bubble gum.",
  },
  icono: {
    es: "Mascota de Código Fresco",
    en: "Código Fresco mascot",
  },
  corporativa: {
    es: "Mascota de Código Fresco en su versión corporativa, de traje y corbata verde.",
    en: "Código Fresco mascot in its corporate version, wearing a suit and green tie.",
  },
};

export function Mascot({
  variant = "chicle",
  lang = "es",
  sizes,
  className = "",
  preload = false,
  decorative = false,
  animated = false,
}: {
  variant?: MascotVariant;
  lang?: Locale;
  sizes: string;
  className?: string;
  preload?: boolean;
  /** Cuando acompaña a un texto que ya dice lo mismo, se oculta a lectores de pantalla. */
  decorative?: boolean;
  /** Flotación suave y fundido con el fondo (solo la variante del chicle). */
  animated?: boolean;
}) {
  const source = sources[variant];
  return (
    <Image
      src={source.src}
      width={source.width}
      height={source.height}
      alt={decorative ? "" : alts[variant][lang]}
      aria-hidden={decorative || undefined}
      sizes={sizes}
      preload={preload}
      className={`${animated ? "cf-mascot " : ""}h-auto ${className}`}
    />
  );
}
