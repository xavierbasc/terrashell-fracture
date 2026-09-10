// Marcas de plataforma que lucide no trae. Se dibujan aquí con el mismo
// lenguaje que el resto de iconos del sitio —lienzo 24×24, trazo de 2 y
// `currentColor`—, para que en una fila de tarjetas no se note cuál viene de
// la librería y cuál no.
//
// Por qué hacen falta: lucide tiene manzana, pero no robot de Android ni
// pingüino. Y una plataforma se reconoce por su marca: un teléfono genérico
// para Android y un terminal para Linux obligaban a leer el rótulo para saber
// de qué tarjeta se trata.

interface IconProps {
  size?: number;
  className?: string;
}

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className,
  'aria-hidden': true,
});

export function AndroidIcon({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...base(size, className)}>
      <path d="M7.5 4.2 9.3 7.1" />
      <path d="M16.5 4.2 14.7 7.1" />
      <path d="M5.5 11.2a6.5 6.5 0 0 1 13 0" />
      <circle cx="9.4" cy="9" r=".55" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="9" r=".55" fill="currentColor" stroke="none" />
      <path d="M5.5 11.2h13v6.6a1.6 1.6 0 0 1-1.6 1.6H7.1a1.6 1.6 0 0 1-1.6-1.6z" />
      <path d="M3.2 12.4v4.4" />
      <path d="M20.8 12.4v4.4" />
      <path d="M9.2 19.4v1.9" />
      <path d="M14.8 19.4v1.9" />
    </svg>
  );
}

export function TuxIcon({ size = 24, className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...base(size, className)}>
      {/* Silueta: cabeza y cuerpo de una pieza, que es como se lee un pingüino
          a 20 px — dos formas separadas se convierten en dos manchas. */}
      <path d="M12 2.6c-2.7 0-4.5 2.1-4.5 4.9 0 1.6-.5 2.6-1.1 3.6-.7 1.2-1.3 2.3-1.3 4 0 3 3 5.3 6.9 5.3s6.9-2.3 6.9-5.3c0-1.7-.6-2.8-1.3-4-.6-1-1.1-2-1.1-3.6 0-2.8-1.8-4.9-4.5-4.9z" />
      <path d="M12 9.6c-1.7 0-3 1.9-3 4.4s1.3 4.4 3 4.4 3-1.9 3-4.4-1.3-4.4-3-4.4z" />
      <circle cx="10.5" cy="6.4" r=".55" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="6.4" r=".55" fill="currentColor" stroke="none" />
      <path d="M11 7.9h2l-1 1.4z" />
      <path d="M9.3 19.8c-.9 1-2.2 1.6-3.3 1.6.2-1.4 1.4-2.5 2.7-2.8" />
      <path d="M14.7 19.8c.9 1 2.2 1.6 3.3 1.6-.2-1.4-1.4-2.5-2.7-2.8" />
    </svg>
  );
}
