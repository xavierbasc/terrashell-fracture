'use client';
import { motion } from 'framer-motion';

// next/image does not prepend basePath on static export — prefix manually
const BP = process.env.NODE_ENV === 'production' ? '/terrashell-fracture' : '';

const shots = [
  {
    src: '/shots/menu.png',
    title: 'Main Menu',
    desc: 'Hand-crafted pixel-art title screen',
    accent: '#ff5f00',
    span: 'col-span-1 md:col-span-2',
  },
  {
    src: '/shots/gameplay.png',
    title: 'Battle',
    desc: 'Storm weather, trajectory guide, live HUD',
    accent: '#ffd040',
    span: 'col-span-1',
  },
  {
    src: '/shots/shop.png',
    title: 'Armory',
    desc: 'Wireframe 3D datalink + typewriter dossier',
    accent: '#40c8a0',
    span: 'col-span-1',
  },
  {
    src: '/shots/playersetup.png',
    title: 'Player Setup',
    desc: 'Up to 4 combatants — humans or AI',
    accent: '#1a90ff',
    span: 'col-span-1',
  },
  {
    src: '/shots/howtoplay.png',
    title: 'How To Play',
    desc: 'Keyboard, mouse and touch controls',
    accent: '#a040ff',
    span: 'col-span-1',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.68, 0, 1.2] } },
};

export default function Screenshots() {
  return (
    <section id="arena" className="relative py-28 px-6 bg-[#050508]">
      <div className="absolute inset-0 bg-grid-subtle bg-[length:40px_40px] opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block font-mono text-xs text-[#ffd040] border border-[#ffd040]/40 px-4 py-1.5 mb-4 tracking-widest">
            FIELD FOOTAGE
          </div>
          <h2 className="font-pixel text-2xl md:text-3xl text-white tracking-tight">
            In-Game Screenshots
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a2a]"
        >
          {shots.map((s) => (
            <motion.figure
              key={s.src}
              variants={item}
              whileHover={{ scale: 1.01 }}
              className={`relative group bg-[#0a0a12] overflow-hidden m-0 ${s.span}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={BP + s.src}
                  alt={s.title}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="w-full h-auto block"
                  style={{ imageRendering: 'pixelated' }}
                />
                {/* Hover glow ring */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 2px ${s.accent}80` }}
                />
              </div>

              <figcaption className="flex items-baseline justify-between px-4 py-3 border-t border-[#1a1a2a]">
                <span className="font-mono text-xs font-bold tracking-wide" style={{ color: s.accent }}>
                  {s.title}
                </span>
                <span className="font-sans text-xs text-[#606078]">{s.desc}</span>
              </figcaption>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ borderColor: s.accent }}
              />
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
