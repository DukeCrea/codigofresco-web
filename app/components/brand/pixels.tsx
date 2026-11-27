import type { Locale } from "../../lib/i18n/config";
import { Mascot } from "./mascot";

/**
 * Elementos gráficos del brandbook: píxeles, flecha de píxeles y `</>`.
 * Todo es decorativo y va oculto a los lectores de pantalla.
 */

type Px = { x: string; y: string; d?: string; s?: number };

/** Grupo de píxeles que parpadean a saltos. Las posiciones son relativas al contenedor. */
export function Pixels({ items, className = "" }: { items: Px[]; className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {items.map((p, i) => (
        <span
          key={i}
          className="cf-px"
          style={{
            left: p.x,
            top: p.y,
            ["--d" as string]: p.d ?? "0s",
            ...(p.s ? { width: p.s, height: p.s } : {}),
          }}
        />
      ))}
    </span>
  );
}

/** Flecha de píxeles del logotipo (la que cierra la palabra «Fresco»). */
export function PixelArrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 3 5" className={`cf-arrow inline-block h-[0.8em] w-[0.48em] ${className}`} fill="currentColor" shapeRendering="crispEdges">
      <rect x="0" y="0" width="1" height="1" />
      <rect x="1" y="1" width="1" height="1" />
      <rect x="2" y="2" width="1" height="1" />
      <rect x="1" y="3" width="1" height="1" />
      <rect x="0" y="4" width="1" height="1" />
    </svg>
  );
}

/**
 * Transición entre secciones: la mascota asoma y presenta lo que viene con un
 * comentario de código. Es el hilo narrativo de la portada.
 */
export function MascotCue({
  lang,
  step,
  children,
  variant = "icono",
}: {
  lang: Locale;
  step: string;
  children: React.ReactNode;
  variant?: "icono" | "corporativa";
}) {
  return (
    <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
      <span className="relative flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black">
        <Mascot
          variant={variant}
          lang={lang}
          decorative
          sizes="56px"
          className={variant === "corporativa" ? "mt-10 w-12" : "w-14"}
        />
      </span>
      <p className="cf-eyebrow min-w-0">
        <span className="text-gray-500">{`// ${step} · `}</span>
        {children}
      </p>
      <span aria-hidden="true" className="hidden h-px flex-1 bg-white/10 sm:block" />
      <span aria-hidden="true" className="relative hidden h-8 w-16 sm:block">
        <Pixels
          items={[
            { x: "0px", y: "12px" },
            { x: "14px", y: "0px", d: "0.5s" },
            { x: "28px", y: "12px", d: "1.1s" },
            { x: "42px", y: "22px", d: "1.7s" },
          ]}
        />
      </span>
    </div>
  );
}

/** Logotipo horizontal para la cabecera: mascota + nombre, como en el brandbook. */
export function BrandLockup({ lang }: { lang: Locale }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-xl bg-black">
        <Mascot variant="icono" lang={lang} decorative sizes="40px" className="w-10" />
      </span>
      <span className="font-display flex flex-col text-[17px] leading-[0.95] tracking-tight">
        <span className="text-white">Código</span>
        <span className="flex items-center gap-1 text-lime-400">
          Fresco
          <PixelArrow className="!h-[0.62em] !w-[0.37em]" />
        </span>
      </span>
    </span>
  );
}
