"use client";

import { useEffect, useRef, useState } from "react";

import type { Locale } from "../../../lib/i18n/config";

/**
 * «Cómo avanzan los leads»: la visualización del monitor de leads de ZoDesk,
 * portada al portafolio. De izquierda a derecha, cada luz es un lead; en cada
 * puerta los que no pasan caen debajo, con su número y su porqué. Los que
 * llegan al final quedan girando en la meta. Datos FICTICIOS.
 * Con «reducir movimiento» las luces quedan quietas en su sitio.
 */

type Flow = { stages: number[] };

const stageNames: Record<Locale, string[]> = {
  es: ["Llegaron", "Los tocamos", "Contestaron", "Siguen en conversación", "Compraron"],
  en: ["Arrived", "Contacted", "Replied", "Still talking", "Bought"],
};

const wellNames: Record<Locale, string[]> = {
  es: ["nadie los tocó", "no contestaron o datos falsos", "se cerraron", "siguen sin comprar"],
  en: ["nobody contacted them", "no reply or fake data", "closed", "haven't bought yet"],
};

const channels: Array<{ id: string; label: Record<Locale, string>; flow: Flow }> = [
  { id: "todos", label: { es: "Todos los canales", en: "All channels" }, flow: { stages: [120, 84, 51, 23, 6] } },
  { id: "meta", label: { es: "Anuncios de Meta", en: "Meta ads" }, flow: { stages: [64, 52, 30, 14, 4] } },
  { id: "portal", label: { es: "Portal de clasificados", en: "Classifieds portal" }, flow: { stages: [38, 12, 9, 4, 1] } },
  { id: "web", label: { es: "Chat de la web", en: "Website chat" }, flow: { stages: [18, 15, 12, 5, 1] } },
];

const LIME: [number, number, number] = [163, 230, 53];
const rgba = (c: number[], a: number) => `rgba(${c.join(",")},${a})`;
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
const pct = (a: number, b: number) => (b ? Math.round((100 * a) / b) : 0);

function sprite(c: number[], f: number, white = false) {
  const k = document.createElement("canvas");
  k.width = k.height = 128;
  const x = k.getContext("2d")!;
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, `rgba(255,255,255,${f})`);
  g.addColorStop(0.1, `rgba(255,255,255,${f * (white ? 1 : 0.85)})`);
  g.addColorStop(0.22, rgba(c, f));
  g.addColorStop(0.44, rgba(c, f * 0.3));
  g.addColorStop(1, rgba(c, 0));
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 128);
  return k;
}

type Light = {
  L: number; est: "espera" | "viaje" | "cae" | "meta"; sale: number; x: number; y: number; vx: number; vy: number;
  tam: number; carril: number; vel: number; sem: number; para: number; tx: number; ty: number;
};

type Geo = { W: number; H: number; izq: number; paso: number; esc: number; banda: number; alto: number; pozo: number };

function geometry(W: number, H: number, n: number): Geo {
  const izq = W < 700 ? 46 : 90;
  return {
    W, H, izq,
    paso: (W - 2 * izq) / Math.max(1, n - 1),
    esc: Math.max(0.6, Math.min(1.05, W / 1300)),
    banda: H * 0.43,
    alto: 40,
    pozo: H * 0.7,
  };
}

export function LeadLights({ lang, compact = false }: { lang: Locale; compact?: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [channel, setChannel] = useState(0);
  const [geo, setGeo] = useState<Geo | null>(null);
  const stages = channels[channel].flow.stages;
  const names = stageNames[lang];
  const wells = wellNames[lang];

  useEffect(() => {
    const box = boxRef.current;
    const cv = canvasRef.current;
    if (!box || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const SP = { viaje: sprite(LIME, 1), quedo: sprite([150, 160, 140], 0.3), meta: sprite(LIME, 1, true) };
    const N = stages.length;
    let G = geometry(box.clientWidth, box.clientHeight, N);
    let lights: Light[] = [];
    let glow: number[] = [];
    let t = 0;
    let T = 0;
    let raf = 0;
    let visible = true;
    const gx = (i: number) => G.izq + i * G.paso;

    function size() {
      G = geometry(box!.clientWidth, box!.clientHeight, N);
      cv!.width = G.W * DPR;
      cv!.height = G.H * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      setGeo(G);
    }

    function reset() {
      lights = [];
      t = 0;
      glow = stages.map(() => 0);
      for (let i = 0; i < N; i++) {
        const count = stages[i] - (i + 1 < N ? stages[i + 1] : 0);
        for (let k = 0; k < count; k++) {
          const p: Light = {
            L: i, est: "espera", sale: Math.random() * 9, x: -20, y: 0, vx: 0, vy: 0, tam: 0,
            carril: gauss() * 0.9, vel: 0.85 + Math.random() * 0.4, sem: Math.random() * 100,
            para: gx(i) + G.paso * (0.12 + Math.random() * 0.2),
            tx: gx(i) + G.paso * 0.5 + gauss() * G.paso * 0.26,
            ty: G.pozo + gauss() * 16,
          };
          if (still) {
            if (i === N - 1) {
              p.est = "meta"; p.x = gx(i) + gauss() * 10; p.y = G.banda + gauss() * G.alto * 0.4; p.tam = 44;
            } else {
              p.est = "cae"; p.x = p.tx; p.y = p.ty; p.tam = 18;
            }
          }
          lights.push(p);
        }
      }
      ctx!.clearRect(0, 0, G.W, G.H);
    }

    function move(p: Light, dt: number) {
      if (still) return;
      if (p.est === "espera") {
        if (t < p.sale) return;
        p.est = "viaje"; p.x = gx(0) - 40; p.y = G.banda + p.carril * G.alto * 0.4; p.vx = 60 * G.esc;
      }
      if (p.est === "viaje") {
        const ty = G.banda + p.carril * G.alto * 0.45 + Math.sin(p.x * 0.02 + p.sem + T) * 4;
        p.vx += (120 * G.esc * p.vel - p.vx) * 1.8 * dt;
        p.vy += ((ty - p.y) * 6 - p.vy * 3) * dt;
        const before = p.x;
        p.x += p.vx * dt; p.y += p.vy * dt;
        for (let i = 0; i < N; i++) if (before < gx(i) && p.x >= gx(i)) glow[i] = Math.min(1.3, glow[i] + 0.18);
        if (p.L === N - 1 && p.x >= gx(N - 1) - 6) p.est = "meta";
        else if (p.L < N - 1 && p.x >= p.para) p.est = "cae";
        return;
      }
      let tx = p.tx, ty = p.ty, k = 3;
      if (p.est === "meta") {
        const w = T * 0.8 + p.sem;
        tx = gx(N - 1) + Math.cos(w) * 14; ty = G.banda + Math.sin(w) * G.alto * 0.6; k = 6;
      } else tx += Math.sin(T * 0.5 + p.sem) * 3;
      p.vx += ((tx - p.x) * k - p.vx * 2.6 + (Math.random() - 0.5) * 14) * dt;
      p.vy += ((ty - p.y) * k - p.vy * 2.6 + (Math.random() - 0.5) * 14) * dt;
      p.x += p.vx * dt; p.y += p.vy * dt;
    }

    function gates(dt: number) {
      const band = ctx!.createLinearGradient(0, G.banda - G.alto, 0, G.banda + G.alto);
      band.addColorStop(0, rgba(LIME, 0)); band.addColorStop(0.5, rgba(LIME, 0.05)); band.addColorStop(1, rgba(LIME, 0));
      ctx!.fillStyle = band;
      ctx!.fillRect(gx(0) - 40, G.banda - G.alto, gx(N - 1) - gx(0) + 80, G.alto * 2);
      for (let i = 0; i < N; i++) {
        glow[i] *= Math.exp(-dt * 2.6);
        const x = gx(i), y0 = G.banda - G.alto - 6, y1 = G.banda + G.alto + 6, b = 0.5 + glow[i] * 0.6;
        const lg = ctx!.createLinearGradient(0, y0, 0, y1);
        lg.addColorStop(0, rgba(LIME, 0)); lg.addColorStop(0.5, rgba([217, 249, 157], Math.min(1, b))); lg.addColorStop(1, rgba(LIME, 0));
        ctx!.save();
        ctx!.shadowColor = rgba(LIME, 0.9); ctx!.shadowBlur = 12 + glow[i] * 18; ctx!.strokeStyle = lg; ctx!.lineWidth = 2;
        ctx!.beginPath(); ctx!.moveTo(x, y0); ctx!.lineTo(x, y1); ctx!.stroke();
        ctx!.restore();
      }
    }

    let last = performance.now();
    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible || still) {
        T += dt; t += dt;
        if (t > 22 && !still) reset();
        lights.forEach((p) => move(p, dt));
        ctx!.globalCompositeOperation = still ? "copy" : "destination-out";
        ctx!.fillStyle = "rgba(0,0,0,.34)";
        ctx!.fillRect(0, 0, G.W, G.H);
        if (still) ctx!.clearRect(0, 0, G.W, G.H);
        ctx!.globalCompositeOperation = "source-over";
        gates(dt);
        ctx!.globalCompositeOperation = "lighter";
        for (const p of lights) {
          if (p.est === "espera") continue;
          const target = p.est === "viaje" ? 32 : p.est === "meta" ? 44 : 18;
          p.tam += (target - p.tam) * 0.08;
          const s = p.tam * G.esc;
          const spr = p.est === "viaje" ? SP.viaje : p.est === "meta" ? SP.meta : SP.quedo;
          ctx!.drawImage(spr, p.x - s / 2, p.y - s / 2, s, s);
        }
        ctx!.globalCompositeOperation = "source-over";
      }
      if (!still) raf = requestAnimationFrame(frame);
    }

    size();
    reset();
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; });
    io.observe(box);
    let rt: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      clearTimeout(rt);
      rt = setTimeout(() => { size(); reset(); if (still) requestAnimationFrame(frame); }, 150);
    });
    ro.observe(box);

    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); clearTimeout(rt); };
  }, [stages]);

  let worst = -1;
  let max = 0;
  for (let i = 1; i < stages.length; i++) {
    const lost = stages[i - 1] - stages[i];
    if (lost > max) { max = lost; worst = i; }
  }
  const gxL = (i: number) => (geo ? geo.izq + i * geo.paso : 0);

  const summary =
    lang === "en"
      ? `${channels[channel].label.en}: ${stages.map((v, i) => `${names[i]} ${v}`).join(", ")}.`
      : `${channels[channel].label.es}: ${stages.map((v, i) => `${names[i]} ${v}`).join(", ")}.`;

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0e100c] p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label={lang === "en" ? "Channel" : "Canal"} className="flex flex-wrap gap-2">
          {channels.map((c, i) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={channel === i}
              onClick={() => setChannel(i)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                channel === i ? "border-lime-400/60 bg-lime-400/10 text-lime-400" : "border-white/15 text-gray-300 hover:border-white/40"
              }`}
            >
              {c.label[lang]}
            </button>
          ))}
        </div>
        <p className="rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-0.5 text-xs font-semibold text-amber-200">
          {lang === "en" ? "Simulation · fictitious data" : "Simulación · datos ficticios"}
        </p>
      </div>

      <div
        ref={boxRef}
        className={`relative mt-4 overflow-hidden rounded-2xl border border-white/10 ${compact ? "h-[340px]" : "h-[400px]"}`}
        style={{ background: "radial-gradient(120% 90% at 50% 40%, #16200d 0%, #0a0c08 70%)" }}
      >
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        <p className="sr-only">{summary}</p>
        {geo ? (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {stages.map((v, i) => (
              <div key={`g${i}`} className="absolute top-3 w-[88px] -translate-x-1/2 text-center sm:w-[130px]" style={{ left: gxL(i) }}>
                <div className="text-xl font-bold tabular-nums text-white sm:text-2xl" style={{ textShadow: "0 0 22px rgba(163,230,53,.45)" }}>{v}</div>
                <div className="text-[11px] leading-tight text-gray-200 sm:text-xs">{names[i]}</div>
                {i ? (
                  <div className="mt-1 hidden rounded-full border border-white/15 px-2 text-[11px] text-gray-400 sm:inline-block">
                    {pct(v, stages[i - 1])}% {lang === "en" ? "pass" : "pasa"}
                  </div>
                ) : null}
              </div>
            ))}
            {stages.slice(1).map((v, j) => {
              const i = j + 1;
              const lost = stages[i - 1] - v;
              if (!lost) return null;
              return (
                <div
                  key={`w${i}`}
                  className="absolute w-[80px] -translate-x-1/2 text-center sm:w-[150px]"
                  style={{ left: gxL(i) - geo.paso * 0.5, top: geo.pozo + 26 }}
                >
                  <div className={`text-base font-bold tabular-nums sm:text-lg ${i === worst ? "text-amber-300" : "text-gray-300"}`}>{lost}</div>
                  <div className={`text-[10px] leading-tight sm:text-xs ${i === worst ? "text-amber-200" : "text-gray-500"}`}>{wells[j]}</div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-400">
        <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_10px_#a3e635]" aria-hidden="true" />{lang === "en" ? "Above: leads moving forward" : "Arriba: leads que avanzan"}</li>
        <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-gray-500" aria-hidden="true" />{lang === "en" ? "Below: where they stopped and why" : "Abajo: dónde se quedaron y por qué"}</li>
        <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-300" aria-hidden="true" />{lang === "en" ? "The biggest leak" : "La fuga más grande"}</li>
      </ul>
    </div>
  );
}
