import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/institution.js';

// Filtro em "pílulas" com indicador animado. `id` precisa ser único por página (layoutId).
export default function FilterChips({ id, value, onChange, counts, label }) {
  return (
    <div role="group" aria-label={label} className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      <div className="inline-flex gap-1 rounded-full border border-ink-200 bg-white p-1 dark:border-ink-800 dark:bg-ink-900">
        {CATEGORIES.map((cat) => {
          const active = value === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              aria-pressed={active}
              className={`relative min-h-[40px] whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors ${
                active ? 'text-white dark:text-ink-950' : 'text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white'
              }`}
            >
              {active && (
                <motion.span
                  layoutId={`chip-${id}`}
                  className="absolute inset-0 rounded-full bg-ink-900 dark:bg-white"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative">
                {cat.label}
                {counts && <span className="ml-1.5 text-xs opacity-60">{counts[cat.id] ?? 0}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
