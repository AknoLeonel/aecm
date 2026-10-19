import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, CalendarPlus, Clock, MapPin, CalendarX } from 'lucide-react';
import Reveal from './Reveal.jsx';
import FilterChips from './FilterChips.jsx';
import { EVENTS, PILLARS } from '../data/institution.js';

const parseDate = (iso, time = '00:00') => new Date(`${iso}T${time}:00`);

const CATEGORY_STYLE = Object.fromEntries(PILLARS.map((p) => [p.filter, p.chip]));
const CATEGORY_LABEL = { esporte: 'Esporte', cultura: 'Cultura', social: 'Social' };

function googleCalendarLink(evt) {
  const start = parseDate(evt.date, evt.time);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${evt.title} – AECM`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: evt.description,
    location: `${evt.location}, Brasília-DF`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export default function Agenda({ onSignup }) {
  const [filter, setFilter] = useState('todos');

  // Mostra só eventos de hoje em diante, em ordem cronológica.
  const upcoming = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return EVENTS.filter((e) => parseDate(e.date) >= today).sort((a, b) => parseDate(a.date) - parseDate(b.date));
  }, []);

  const counts = useMemo(() => {
    const result = { todos: upcoming.length };
    upcoming.forEach((e) => {
      result[e.category] = (result[e.category] ?? 0) + 1;
    });
    return result;
  }, [upcoming]);

  const visible = filter === 'todos' ? upcoming : upcoming.filter((e) => e.category === filter);

  return (
    <section id="agenda" aria-labelledby="agenda-title" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Agenda comunitária
            </p>
            <h2 id="agenda-title" className="h-section mt-4">
              Próximos eventos e campeonatos.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FilterChips id="agenda" label="Filtrar eventos por área" value={filter} onChange={setFilter} counts={counts} />
          </Reveal>
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'evento exibido' : 'eventos exibidos'}
        </p>

        <motion.ol layout className="mt-12 space-y-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((evt) => {
              const date = parseDate(evt.date, evt.time);
              const day = date.toLocaleDateString('pt-BR', { day: '2-digit' });
              const month = date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
              const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });
              const fullDate = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
              return (
                <motion.li
                  layout
                  key={evt.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}
                  className="group card flex flex-col gap-5 p-5 transition-colors hover:border-ink-400 sm:flex-row sm:items-center sm:p-6 dark:hover:border-ink-600"
                >
                  <time
                    dateTime={`${evt.date}T${evt.time}`}
                    className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-ink-900 text-white transition-colors group-hover:bg-brand-500 group-hover:text-ink-950 dark:bg-white dark:text-ink-900"
                  >
                    <span className="font-display text-3xl font-extrabold leading-none">{day}</span>
                    <span className="mt-1 text-xs font-bold uppercase tracking-wider">{month}</span>
                    <span className="sr-only">{fullDate}</span>
                  </time>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${CATEGORY_STYLE[evt.category]}`}>
                        {CATEGORY_LABEL[evt.category]}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">● {evt.status}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink-900 dark:text-white">{evt.title}</h3>
                    <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{evt.description}</p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-500 dark:text-ink-400">
                      <span className="flex items-center gap-1.5 capitalize">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        {weekday}, {evt.time.replace(':', 'h')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        {evt.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2 sm:flex-col">
                    <button type="button" onClick={() => onSignup(evt)} className="btn-primary flex-1">
                      Inscrever-se
                      <span className="sr-only"> em {evt.title}</span>
                    </button>
                    <a
                      href={googleCalendarLink(evt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost flex-1 px-4"
                    >
                      <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                      Salvar data
                      <span className="sr-only"> de {evt.title} no Google Agenda (abre em nova aba)</span>
                    </a>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ol>

        {visible.length === 0 && (
          <div className="card mt-12 flex flex-col items-center gap-3 p-10 text-center">
            <CalendarX className="h-10 w-10 text-ink-400" aria-hidden="true" />
            <p className="font-display text-lg font-bold">Nenhum evento agendado nesta área por enquanto.</p>
            <p className="text-sm text-ink-500 dark:text-ink-400">
              Fale com a gente para propor uma atividade ou receber novidades em primeira mão.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
