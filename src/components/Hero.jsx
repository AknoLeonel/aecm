import { motion } from 'framer-motion';
import { ArrowDown, MessageCircle, Trophy, Palette, HeartHandshake } from 'lucide-react';
import { whatsappLink, yearsActive } from '../data/institution.js';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const STATS = [
  { value: `${yearsActive()}+`, label: 'anos de atuação' },
  { value: '4', label: 'áreas de atuação' },
  { value: 'DF', label: '& Entorno' },
  { value: '100%', label: 'atividades gratuitas' },
];

const FLOATING = [
  { icon: Trophy, className: 'left-[6%] top-[18%] bg-brand-500 text-ink-950', delay: 0 },
  { icon: Palette, className: 'right-[8%] top-[12%] bg-violet-400 text-ink-950', delay: 0.8 },
  { icon: HeartHandshake, className: 'right-[14%] bottom-[22%] bg-emerald-400 text-ink-950', delay: 1.6 },
];

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-10 sm:pt-16 lg:pb-28">
      {/* Fundo: manchas de cor em movimento lento */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-[28rem] w-[28rem] animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-brand-400/25 blur-3xl dark:bg-brand-500/15" />
        <div className="absolute -right-24 top-40 h-[24rem] w-[24rem] animate-[pulse_10s_ease-in-out_infinite] rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-500/15" />
      </div>

      {FLOATING.map(({ icon: Icon, className, delay }) => (
        <motion.div
          key={className}
          aria-hidden="true"
          className={`absolute hidden h-14 w-14 place-items-center rounded-2xl shadow-xl lg:grid ${className}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={{
            opacity: { delay: 0.6 + delay * 0.2 },
            scale: { delay: 0.6 + delay * 0.2 },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay },
          }}
        >
          <Icon className="h-7 w-7" />
        </motion.div>
      ))}

      <div className="container-page">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 px-4 py-2 text-xs font-semibold text-ink-700 backdrop-blur sm:text-sm dark:border-ink-800 dark:bg-ink-900/70 dark:text-ink-200"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Associação sem fins lucrativos · Guará II, Brasília-DF
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fadeUp(0.1)}
            className="mt-8 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl dark:text-white"
          >
            Esporte e Cultura{' '}
            <span className="relative inline-block">
              <span className="animate-gradient bg-gradient-to-r from-brand-500 via-pink-500 to-violet-500 bg-[length:200%_auto] bg-clip-text text-transparent">
                em Movimento
              </span>
              <motion.svg
                aria-hidden="true"
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 h-3 w-full sm:-bottom-3"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 14 C 80 2, 220 2, 298 12"
                  fill="none"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="stroke-brand-500"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.7, ease: 'easeInOut' }}
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg dark:text-ink-300"
          >
            Campeonatos comunitários, oficinas de arte, espetáculos e defesa de direitos sociais.
            Conectamos jovens e famílias do DF a oportunidades reais — de graça e perto de casa.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a href="#pilares" className="btn-dark px-8 py-4 text-base">
              Nossos Projetos
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-8 py-4 text-base"
            >
              <MessageCircle className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              Falar no WhatsApp
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } } }}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="card flex flex-col-reverse items-center px-4 py-5"
              >
                <dt className="mt-1 text-xs font-medium text-ink-500 dark:text-ink-400">{stat.label}</dt>
                <dd className="font-display text-3xl font-extrabold text-ink-900 dark:text-white">{stat.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
