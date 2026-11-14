"use client";

import Image from "next/image";
import { useRef } from "react";

/**
 * Captura ampliable. Usa <dialog> nativo: atrapa el foco, se cierra con Escape
 * y devuelve el foco al botón que la abrió.
 */
export function ZoomImage({
  src,
  alt,
  caption,
  width,
  height,
  zoomLabel,
  closeLabel,
  badge,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  zoomLabel: string;
  closeLabel: string;
  badge?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-black text-left"
        aria-label={`${zoomLabel}: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="h-auto w-full transition duration-300 group-hover:scale-[1.01]"
        />
        {badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-lime-400 ring-1 ring-lime-400/40">
            {badge}
          </span>
        ) : null}
        <span className="absolute bottom-3 right-3 rounded-full bg-black/80 px-3 py-1 text-xs text-white ring-1 ring-white/20">
          {zoomLabel} ↗
        </span>
      </button>
      <figcaption className="mt-3 text-sm leading-6 text-gray-400">{caption}</figcaption>
      <dialog
        ref={dialogRef}
        aria-label={alt}
        className="m-auto max-h-[92vh] w-[min(1400px,96vw)] rounded-2xl bg-black p-0 text-white backdrop:bg-black/85"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
          <p className="text-sm text-gray-300">{caption}</p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-full border border-white/20 px-3 py-1 text-sm hover:border-lime-400"
            autoFocus
          >
            {closeLabel}
          </button>
        </div>
        <div className="overflow-auto">
          <Image src={src} alt={alt} width={width} height={height} sizes="96vw" className="h-auto w-full" />
        </div>
      </dialog>
    </figure>
  );
}
