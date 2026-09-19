type LogoProps = {
  className?: string;
};

/**
 * Isotipo CodigoFresco: monograma "CF" sobre el cuadrado lima (#a3e635).
 *
 * Las letras van dibujadas como trazos y no como texto SVG a propósito: un
 * `<text>` depende de que la tipografía haya cargado, así que el logo se vería
 * distinto en el primer pintado, en un correo o en una captura. Con trazos
 * siempre sale idéntico.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="CodigoFresco"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="16" fill="#a3e635" />
      <g
        fill="none"
        stroke="#0b1207"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M30.4 25.6 A9 9 0 1 0 30.4 38.4" />
        <path d="M38 42 L38 22 L50 22 M38 31.5 L47 31.5" />
      </g>
    </svg>
  );
}
