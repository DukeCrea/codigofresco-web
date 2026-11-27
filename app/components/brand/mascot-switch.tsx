"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { track } from "../../lib/analytics";

/**
 * Mascota interactiva del hero.
 *
 * «Más corporativo»: el chicle se infla, explota en píxeles y aparece la
 * variante de traje. «Más fresco»: la mascota corporativa masca, infla un
 * chicle, explota y vuelve la de siempre. Las dos ilustraciones son las
 * originales; lo único dibujado con CSS es el globo y los píxeles del estallido.
 */

type Mode = "fresco" | "corporativo";
type Phase = "idle" | "chew" | "inflate" | "pop";

export type MascotSwitchLabels = {
  toCorporate: string;
  toFresh: string;
  stickerFresh: string;
  stickerCorporate: string;
  altFresh: string;
  altCorporate: string;
  announceFresh: string;
  announceCorporate: string;
};

// Dónde nace el globo, en porcentaje del marco: el chicle de la mascota fresca
// y la boca de la corporativa.
const origin: Record<Mode, { x: string; y: string }> = {
  fresco: { x: "69%", y: "66%" },
  corporativo: { x: "53%", y: "37%" },
};

const CHEW = 750;
const INFLATE = 950;
const POP = 1500;

// Píxeles de la marca: salen en línea recta y se apagan.
const burst = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2 + 0.2;
  const reach = i % 2 ? 300 : 200;
  return {
    dx: `${Math.round(Math.cos(angle) * reach)}px`,
    dy: `${Math.round(Math.sin(angle) * reach)}px`,
    size: i % 2 ? 14 : 22,
    white: i % 4 === 0,
  };
});

// Trozos de chicle: salen disparados, se estiran y caen por su propio peso.
const gum = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2 + ((i * 37) % 10) * 0.03;
  const reach = 130 + ((i * 53) % 200);
  return {
    dx: `${Math.round(Math.cos(angle) * reach)}px`,
    dy: `${Math.round(Math.sin(angle) * reach * 0.8 - 40)}px`,
    fall: `${150 + ((i * 29) % 160)}px`,
    size: 16 + ((i * 17) % 34),
    delay: `${(i * 23) % 110}ms`,
    time: `${1150 + ((i * 41) % 350)}ms`,
  };
});

// Pegotes que se quedan un momento y escurren.
const splats = [
  { x: "-170px", y: "-120px", w: 70, h: 54, r: "58% 42% 55% 45% / 50% 60% 40% 50%", delay: "90ms" },
  { x: "150px", y: "-60px", w: 56, h: 46, r: "45% 55% 40% 60% / 55% 45% 55% 45%", delay: "140ms" },
  { x: "-90px", y: "110px", w: 48, h: 40, r: "60% 40% 50% 50% / 45% 55% 45% 55%", delay: "180ms" },
  { x: "190px", y: "90px", w: 64, h: 50, r: "50% 50% 60% 40% / 60% 40% 60% 40%", delay: "120ms" },
];

export function MascotSwitch({ labels }: { labels: MascotSwitchLabels }) {
  const [mode, setMode] = useState<Mode>("fresco");
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const busy = phase !== "idle";
  const next: Mode = mode === "fresco" ? "corporativo" : "fresco";

  function later(fn: () => void, ms: number) {
    timers.current.push(window.setTimeout(fn, ms));
  }

  function toggle() {
    if (busy) return;
    // Medición del botón: va a GA4, Clarity y Vercel por la capa común, y
    // queda en `dataLayer` con formato de evento por si se añade Tag Manager.
    track("mascota_cambio", { modo: next });
    const data = (window as Window & { dataLayer?: unknown[] }).dataLayer;
    data?.push({ event: "mascota_cambio", modo: next });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode(next);
      return;
    }
    const chew = mode === "corporativo" ? CHEW : 0;
    setPhase(chew ? "chew" : "inflate");
    if (chew) later(() => setPhase("inflate"), chew);
    later(() => {
      setPhase("pop");
      setMode(next);
    }, chew + INFLATE);
    later(() => setPhase("idle"), chew + INFLATE + POP);
  }

  // El globo y el estallido se dibujan desde el origen de la mascota que se va.
  const from: Mode = phase === "pop" ? (mode === "fresco" ? "corporativo" : "fresco") : mode;
  const at = origin[from];

  return (
    <div className="mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-none">
      <div className={`cf-mascot-wrap relative aspect-square w-full ${busy ? "" : "cf-idle"}`}>
        <Image
          src="/marca/mascota.webp"
          width={800}
          height={800}
          alt={mode === "fresco" ? labels.altFresh : ""}
          aria-hidden={mode !== "fresco" || undefined}
          preload
          sizes="(min-width: 1024px) 34rem, (min-width: 640px) 24rem, 19rem"
          className={`cf-mascot cf-swap absolute inset-0 h-full w-full ${mode === "fresco" ? "opacity-100" : "opacity-0"}`}
        />
        <Image
          src="/marca/mascota-corporativa.webp"
          width={665}
          height={900}
          alt={mode === "corporativo" ? labels.altCorporate : ""}
          aria-hidden={mode !== "corporativo" || undefined}
          sizes="(min-width: 1024px) 26rem, 15rem"
          className={`cf-swap absolute inset-0 mx-auto h-full w-auto ${mode === "corporativo" ? "opacity-100" : "opacity-0"} ${phase === "chew" ? "cf-chew" : ""}`}
        />

        {phase === "inflate" ? (
          <span aria-hidden="true" className="cf-bubble" style={{ left: at.x, top: at.y }} />
        ) : null}
        {phase === "pop" ? (
          <span aria-hidden="true" className="pointer-events-none absolute z-10" style={{ left: at.x, top: at.y }}>
            <span className="cf-pop-flash" />
            <span className="cf-pop-ring" />
            {burst.map((b, i) => (
              <span
                key={i}
                className="cf-burst"
                style={{
                  ["--dx" as string]: b.dx,
                  ["--dy" as string]: b.dy,
                  width: b.size,
                  height: b.size,
                  margin: -b.size / 2,
                  ...(b.white ? { background: "#fff" } : {}),
                }}
              />
            ))}
            {splats.map((b, i) => (
              <span
                key={`s${i}`}
                className="cf-splat"
                style={{ left: b.x, top: b.y, width: b.w, height: b.h, borderRadius: b.r, animationDelay: b.delay }}
              />
            ))}
            {gum.map((g, i) => (
              <span
                key={`g${i}`}
                className="cf-gum-x"
                style={{ ["--dx" as string]: g.dx, animationDuration: g.time, animationDelay: g.delay }}
              >
                <span
                  className="cf-gum-y"
                  style={{
                    ["--dy" as string]: g.dy,
                    ["--fall" as string]: g.fall,
                    width: g.size,
                    height: g.size,
                    margin: -g.size / 2,
                    animationDuration: g.time,
                    animationDelay: g.delay,
                  }}
                />
              </span>
            ))}
            <span className="cf-pop-word font-display">¡POP!</span>
          </span>
        ) : null}

        <p className="font-display absolute -bottom-1 right-0 -rotate-3 rounded-lg bg-lime-400 px-3 py-1.5 text-sm text-black sm:text-base">
          {mode === "fresco" ? labels.stickerFresh : labels.stickerCorporate}
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <button type="button" onClick={toggle} aria-pressed={mode === "corporativo"} disabled={busy} className="cf-btn-ghost font-mono text-sm disabled:opacity-60">
          <span aria-hidden="true" className="text-lime-400">{mode === "fresco" ? "</>" : "●"}</span>
          {mode === "fresco" ? labels.toCorporate : labels.toFresh}
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {mode === "fresco" ? labels.announceFresh : labels.announceCorporate}
      </p>
    </div>
  );
}
