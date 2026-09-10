// Fichas de tienda. Viven aparte de `downloads.ts` porque ese módulo lee el
// disco (`fs`) para medir los binarios y sólo puede correr en el servidor: la
// cabecera es un componente de cliente y necesita estas URLs, así que
// meterlas ahí arrastraría `fs` al bundle del navegador y el build rompería.

// Ficha única en App Store: el mismo identificador numérico sirve para iPhone,
// iPad y Mac porque la app es Universal Purchase (mismo bundle id en las dos
// plataformas), así que una compra cubre las tres.
export const APPLE_APP_ID = '6802318009';
// Sin segmento de país: Apple redirige a la tienda del visitante. La forma
// localizada (/es/) manda a todo el mundo a la ficha española.
export const APPLE_STORE_URL = `https://apps.apple.com/app/terrashell-fracture/id${APPLE_APP_ID}`;

// Microsoft Store. La ficha la alimenta el MSIX de `tools/make_msix.sh`
// (identidad JavierBsconesVelzquez.TerraShellFracture), que sube sin firmar
// porque lo firma Microsoft — y esa firma es lo que lo hace instalable de un
// clic, sin el aviso de SmartScreen que sí tiene el instalador suelto.
export const MS_STORE_URL =
  'https://apps.microsoft.com/store/detail/9N34XF2MBDLM?cid=DevShareMCLPCS';

// Google Play: la ficha todavía no existe. Se declara aquí en null a
// propósito, para que quien la publique tenga un solo sitio que tocar y la
// cabecera se encienda sola.
export const PLAY_STORE_URL: string | null = null;
