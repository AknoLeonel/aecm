import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
import Reveal from './Reveal.jsx';
import FilterChips from './FilterChips.jsx';
import { PILLARS, whatsappLink } from '../data/institution.js';

export default function Pillars() {
  const [filter, setFilter] = useState('todos');

  const counts = useMemo(() => {
    const result = { todos: PILLARS.length };
    PILLARS.forEach((p) => {
      result[p.filter] = (result[p.filter] ?? 0) + 1;
    });
    return result;
  }, []);

  const visible = filter === 'todos' ? PILLARS : PILLARS.filter((p) => p.filter === filter);

  return (
    <section
      id="pilares"
      aria-labelledby="pilares-title"
      className="border-y border-ink-200 bg-white py-20 sm:py-28 dark:border-ink-800 dark:bg-ink-900/40"
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">
              <Layers className="h-4 w-4" aria-hidden="true" />
              Nossos pilares
            </p>
            <h2 id="pilares-title" className="h-section mt-4">
              Quatro frentes, um só movimento.
            </h2>
            <p className="mt-4 text-ink-600 dark:text-ink-300">
              Cada pilar corresponde a uma atividade oficial registrada no CNPJ da associação.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <FilterChips id="pilares" label="Filtrar pilares por área" value={filter} onChange={setFilter} counts={counts} />
          </Reveal>
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'pilar exibido' : 'pilares exibidos'}
        </p>

        <motion.ul layout className="mt-12 grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.li
                  layout
                  key={pillar.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6 }}
                  className="group card relative flex flex-col overflow-hidden p-7 transition-shadow hover:shadow-2xl hover:shadow-ink-900/10 dark:hover:shadow-black/40"
                >
                  <div
                    aria-hidden="true"
                    className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${pillar.accent} opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-30`}
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <div
                      className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${pillar.accent} text-white shadow-lg transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110`}
                    >
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <span className="rounded-full border border-ink-200 px-2.5 py-1 font-mono text-[11px] text-ink-500 dark:border-ink-700 dark:text-ink-400">
                      CNAE {pillar.cnae}
                    </span>
                  </div>

                  <span className={`relative mt-6 w-fit rounded-full px-2.5 py-1 text-xs font-bold ${pillar.chip}`}>
                    {pillar.category}
                  </span>
                  <h3 className="relative mt-3 font-display text-2xl font-bold text-ink-900 dark:text-white">{pillar.title}</h3>
                  <p className="relative mt-3 flex-1 leading-relaxed text-ink-600 dark:text-ink-300">{pillar.description}</p>

                  <ul className="relative mt-5 flex flex-wrap gap-2" aria-label={`Destaques de ${pillar.title}`}>
                    {pillar.highlights.map((h) => (
                      <li key={h} className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-700 dark:bg-ink-800 dark:text-ink-200">
                        {h}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsappLink(`Olá! Quero participar do pilar "${pillar.title}" da AECM.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-6 flex items-center justify-between border-t border-ink-200 pt-5 text-sm font-bold text-ink-900 dark:border-ink-800 dark:text-white"
                  >
                    Quero participar
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-100 transition-all duration-300 group-hover:bg-brand-500 group-hover:text-ink-950 dark:bg-ink-800">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
                    </span>
                    <span className="sr-only">(WhatsApp, abre em nova aba)</span>
                  </a>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
