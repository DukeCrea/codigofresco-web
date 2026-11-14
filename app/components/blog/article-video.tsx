"use client";

import { useEffect, useRef, useState } from "react";

import type { BlogVideo } from "../../lib/blog";

/**
 * Video del artículo: en bucle, arranca en silencio (los navegadores no dejan
 * reproducir solo con sonido), con controles, un botón visible para pausar y,
 * si el video trae sonido, otro para activarlo. Si la persona pidió menos movimiento, no arranca solo: se ve
 * la portada y se reproduce cuando ella lo decide.
 */
export function ArticleVideo({ video, title }: { video: BlogVideo; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const horizontal = video.width > video.height;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      el.play().catch(() => setPlaying(false));
    }
  }, []);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
  }

  function toggleSound() {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (!el.muted && el.paused) el.play().catch(() => setPlaying(false));
  }

  return (
    <figure className={`mx-auto w-full ${horizontal ? "max-w-4xl" : "max-w-md"}`}>
      <div className="overflow-hidden rounded-2xl border border-lime-400/25 bg-[#0e100c] shadow-2xl shadow-black/60">
        <video
          ref={ref}
          className="block h-auto w-full"
          width={video.width}
          height={video.height}
          poster={video.poster}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label={`${title}: video de ${video.durationSeconds} segundos${video.sonido ? "" : ", sin sonido"}`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="rounded-full border border-lime-400/40 px-4 py-2 text-sm font-semibold text-lime-400 transition hover:border-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
        >
          {playing ? "Pausar video" : "Reproducir video"}
        </button>
        {video.sonido ? (
          <button
            type="button"
            onClick={toggleSound}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
          >
            {muted ? "Activar sonido" : "Silenciar"}
          </button>
        ) : null}
        {video.gif ? (
          <a
            href={video.gif}
            download
            className="text-sm text-gray-300 underline decoration-white/30 underline-offset-4 hover:text-white"
          >
            Descargar como GIF
          </a>
        ) : null}
      </div>
      <figcaption className="mt-4 text-sm leading-6 text-gray-400">{video.description}</figcaption>
    </figure>
  );
}
