"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { track } from "../../lib/analytics";

/**
 * Barra de etapas de la presentación y su medición.
 *
 * - La mascota camina por la línea según avanza la lectura.
 * - Cada lámina vista envía `presentacion_lamina` una sola vez, con el mercado
 *   y el origen del enlace (`?de=nombre`), para saber hasta dónde llega cada
 *   persona y qué enlace compartido funciona.
 * - Al llegar al cierre se envía `presentacion_fin`.
 */
export function DeckProgress({ etapas, mercado }: { etapas: readonly string[]; mercado: string }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const seen = useRef(new Set<string>());

  useEffect(() => {
    const origen = new URLSearchParams(window.location.search).get("de")?.slice(0, 40) || "directo";
    const started = Date.now();
    track("presentacion_inicio", { mercado, origen });

    const laminas = Array.from(document.querySelectorAll<HTMLElement>("[data-lamina]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const id = el.dataset.lamina || "";
          setStage(Number(el.dataset.etapa || 0));
          if (seen.current.has(id)) continue;
          seen.current.add(id);
          const segundos = Math.round((Date.now() - started) / 1000);
          track("presentacion_lamina", { lamina: id, orden: laminas.indexOf(el) + 1, mercado, origen, segundos });
          if (el.dataset.fin) track("presentacion_fin", { mercado, origen, segundos, laminas_vistas: seen.current.size });
        }
      },
      { threshold: 0.35 },
    );
    laminas.forEach((el) => observer.observe(el));

    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [mercado]);

  // Un paso cada 2 % de avance: alterna la inclinación para que parezca caminar.
  const paso = Math.floor(progress * 50) % 2;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/92 px-4 pb-2 pt-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <Link href="/" className="flex flex-none items-center gap-2" aria-label="Código Fresco, inicio">
          <Image src="/presentacion/chicle.webp" alt="" width={128} height={128} sizes="24px" className="h-6 w-6" />
          <span className="font-display hidden text-sm text-white sm:inline">
            Código <span className="text-lime-400">Fresco</span>
          </span>
        </Link>
        <div className="relative flex-1 pt-7">
          <Image
            src="/presentacion/caminante.webp"
            alt=""
            width={163}
            height={220}
            sizes="20px"
            aria-hidden="true"
            className="absolute top-0 h-7 w-auto -translate-x-1/2 transition-[left] duration-200 ease-linear"
            style={{ left: `${2 + progress * 96}%`, rotate: paso ? "5deg" : "-5deg" }}
          />
          <ol className="flex gap-1.5" aria-label="Etapas de la presentación">
            {etapas.map((nombre, i) => (
              <li
                key={nombre}
                aria-current={i === stage ? "step" : undefined}
                className={`flex-1 border-t-[3px] pt-1.5 text-[10px] font-bold uppercase tracking-wider ${
                  i <= stage ? "border-lime-400" : "border-white/15"
                } ${i === stage ? "text-white" : "text-gray-500"}`}
              >
                <span className={i === stage ? "" : "hidden md:inline"}>{nombre}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </header>
  );
}
