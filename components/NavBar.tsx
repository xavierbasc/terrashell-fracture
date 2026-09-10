'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Apple, AppWindow, Smartphone } from 'lucide-react';
import { APPLE_STORE_URL, MS_STORE_URL, PLAY_STORE_URL } from '@/lib/stores';

// Atajos a las fichas, en la cabecera. Apple lleva **un** icono y no dos: iOS y
// macOS comparten ficha (Universal Purchase, mismo bundle id), así que dos
// enlaces al mismo sitio sólo harían dudar de si son distintos.
//
// Una tienda sin ficha publicada no se enlaza: se dibuja apagada y lo dice al
// pasar por encima. Enlazar a una búsqueda o a un "próximamente" manda a la
// gente a un sitio donde no está el juego. Cuando Play exista, basta con
// rellenar `PLAY_STORE_URL` en `lib/stores.ts` y este icono se enciende solo.
const stores = [
  { id: 'ms',    label: 'Microsoft Store', icon: AppWindow,  url: MS_STORE_URL },
  { id: 'apple', label: 'App Store · iPhone, iPad and Mac', icon: Apple, url: APPLE_STORE_URL },
  { id: 'play',  label: 'Google Play',     icon: Smartphone, url: PLAY_STORE_URL },
];

function StoreLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex items-center gap-1">
      {stores.map(({ id, label, icon: Icon, url }) =>
        url ? (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            title={label}
            aria-label={`TerraShell Fracture on the ${label}`}
            className="text-muted hover:text-amber-2 transition-colors duration-200 p-2 no-underline"
          >
            <Icon size={17} />
          </a>
        ) : (
          <span
            key={id}
            aria-disabled="true"
            title={`${label} — coming soon`}
            className="text-muted-2/50 p-2 cursor-not-allowed select-none"
          >
            <Icon size={17} />
          </span>
        )
      )}
    </div>
  );
}

const links = [
  { label: 'Gallery',   href: '#arena' },
  { label: 'Worlds',    href: '#scenarios' },
  { label: 'Arsenal',   href: '#arsenal' },
  { label: 'Offline',   href: '#offline' },
  { label: 'Share',     href: '#share' },
  { label: 'Controls',  href: '#controls' },
  { label: 'Tech',      href: '#specs' },
];

export default function NavBar() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/92 backdrop-blur-md border-b border-line'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="font-display text-sm leading-none flex items-center gap-1 no-underline uppercase">
          <span className="text-cream">Terra</span>
          <span className="text-amber-2 glow-amber">Shell</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs text-muted hover:text-amber-2 transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Fichas de tienda + CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <StoreLinks />
          <span className="w-px h-5 bg-line" aria-hidden="true" />
        </div>
        <a
          href="#download"
          className="hidden lg:flex items-center gap-2 cut-sm [--cut-w:1px] [--cut-edge:var(--amber-dim)] [--cut-fill:var(--bg)] hover:[--cut-edge:var(--amber)] font-mono text-xs text-amber-2 px-4 py-2 transition-all duration-200"
        >
          DOWNLOAD
        </a>

        {/* Móvil: los iconos también, delante de la hamburguesa. Es la única
            forma de llegar a una tienda sin abrir el menú, y en un teléfono es
            justo donde más sentido tiene. */}
        <div className="lg:hidden flex items-center gap-1">
          <StoreLinks />
          <button
            onClick={() => setOpen(o => !o)}
            className="text-amber-2 p-1"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-bg-2 border-b border-line overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {links.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-mono text-sm text-ink hover:text-amber-2 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#download"
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm text-amber-2 border border-amber/40 px-4 py-2 inline-block"
                >
                  DOWNLOAD
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
