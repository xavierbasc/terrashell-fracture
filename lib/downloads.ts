// Reads web/public/downloads/ at build time (this module only ever runs on
// the server / during `next build` static generation — output: 'export'
// prerenders the page once, so fs access here is safe and never ships to
// the client). Binaries are dropped in after the fact by whoever cuts the
// release; we never invent a file size for something we can't stat.
import fs from 'fs';
import path from 'path';

export interface DownloadEntry {
  id: string;
  platform: string;
  filename: string;
  requirement: string;
  /** Storefront the build is headed for, if any. */
  store: string | null;
  /** Live storefront link, when the listing is actually published. */
  storeUrl: string | null;
  /** Whether this platform is served straight off the site. */
  webDownload: boolean;
  /** Root-relative path — pass through lib/asset.ts `asset()` before rendering. */
  path: string;
  /** Human-readable size, or null if the file isn't present at build time. */
  sizeLabel: string | null;
  available: boolean;
}

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

// macOS, Windows, Android and iOS all have a storefront. Android es la única
// que *además* se descarga desde aquí —en Android sí se puede instalar un
// binario bajado, a diferencia de iOS—, y Linux no tiene tienda que esperar,
// así que se sirve aquí y en ningún otro sitio. `storeUrl` sólo se rellena
// cuando la ficha está publicada de verdad: prometer "próximamente" sobre algo
// que ya está a la venta manda a la gente a buscarlo a mano.
type CatalogEntry = Pick<DownloadEntry, 'id' | 'platform' | 'filename' | 'requirement' | 'store' | 'storeUrl' | 'webDownload'>;

const CATALOG: CatalogEntry[] = [
  // El orden es el de la rejilla, que tiene dos columnas: escritorio arriba
  // (Windows y macOS), móvil en la fila siguiente (iOS y Android) y Linux al
  // final, con el .deb antes que el tarball porque cubre a la mayoría.
  //
  // Windows va por la tienda y sólo por la tienda. Había dos tarjetas más —el
  // instalador NSIS y el MSIX suelto—, y las dos eran peores que ésta: el
  // instalador va sin firmar y SmartScreen lo marca como desconocido, y un
  // MSIX sin firmar Windows directamente no lo instala. Con la ficha
  // publicada, ofrecer al lado dos rutas con advertencias sólo servía para que
  // alguien eligiera la mala. Los dos ficheros salieron también de
  // `public/downloads/`: `filename` se conserva porque describe el
  // entregable, pero con `webDownload: false` no se sirve ni se enlaza —
  // viven en `dist/windows/` y `dist/store/`.
  { id: 'windows', platform: 'Windows', filename: 'TerraShellFracture-Windows-Setup.exe',  requirement: 'Windows 10/11 · 64-bit · signed by Microsoft',
    store: 'Microsoft Store', storeUrl: MS_STORE_URL, webDownload: false },
  { id: 'macos',   platform: 'macOS',   filename: 'TerraShellFracture-macOS.dmg',          requirement: 'macOS 11+ · Apple Silicon & Intel',
    store: 'Mac App Store', storeUrl: APPLE_STORE_URL, webDownload: false },
  { id: 'ios',     platform: 'iOS',     filename: 'TerraShellFracture-iOS.ipa',            requirement: 'iPhone & iPad · iOS 15+',
    store: 'App Store', storeUrl: APPLE_STORE_URL, webDownload: false },
  // El APK se sirve desde aquí además de anunciar Play: en Android sí se puede
  // instalar un binario descargado, a diferencia de iOS.
  { id: 'android', platform: 'Android', filename: 'TerraShellFracture-Android.apk',        requirement: 'Android 7.0+ · arm64 & armv7',
    store: 'Google Play', storeUrl: null, webDownload: true },
  { id: 'linux',   platform: 'Linux',   filename: 'TerraShellFracture-Linux-amd64.deb',    requirement: 'Debian/Ubuntu · x86-64 · .deb package',
    store: null, storeUrl: null, webDownload: true },
  { id: 'linuxtar',platform: 'Linux (portable)', filename: 'TerraShellFracture-Linux.tar.gz', requirement: 'Any distro · x86-64 · unpack and run',
    store: null, storeUrl: null, webDownload: true },
];

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`;
}

export function getDownloads(): DownloadEntry[] {
  const dir = path.join(process.cwd(), 'public', 'downloads');
  return CATALOG.map((entry) => {
    let sizeLabel: string | null = null;
    let available = false;
    // A store-bound platform never advertises a direct link even when the
    // artefact happens to sit in the folder — the store is the channel.
    if (entry.webDownload) {
      try {
        const stat = fs.statSync(path.join(dir, entry.filename));
        if (stat.isFile() && stat.size > 0) {
          available = true;
          sizeLabel = formatSize(stat.size);
        }
      } catch {
        available = false;
      }
    }
    return { ...entry, path: `/downloads/${entry.filename}`, sizeLabel, available };
  });
}
