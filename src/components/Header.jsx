import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X, HandHeart } from 'lucide-react';
import Logo from './Logo.jsx';
import { NAV_LINKS } from '../data/institution.js';

export default function Header({ isDark, onToggleTheme, onOpenJoin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fecha o menu com Esc ou ao passar para o layout desktop.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const media = window.matchMedia('(min-width: 768px)');
    const onResize = (e) => e.matches && setIsMenuOpen(false);
    document.addEventListener('keydown', onKey);
    media.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      media.removeEventListener('change', onResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled || isMenuOpen
          ? 'border-b border-ink-200/80 bg-ink-50/85 backdrop-blur-xl dark:border-ink-800/80 dark:bg-ink-950/85'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <a href="#inicio" className="group flex items-center gap-3 rounded-xl" aria-label="AECM – página inicial">
          <Logo className="h-10 w-10 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-extrabold tracking-tight">AECM</span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
              Esporte & Cultura
            </span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-2 text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="grid h-11 w-11 place-items-center rounded-full text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
            aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button type="button" onClick={onOpenJoin} className="btn-primary hidden md:inline-flex">
            <HandHeart className="h-4 w-4" aria-hidden="true" />
            Seja Voluntário
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink-200 text-ink-800 md:hidden dark:border-ink-700 dark:text-ink-100"
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="menu-mobile"
            aria-label="Navegação principal (celular)"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden md:hidden"
          >
            <ul className="container-page space-y-1 pb-6 pt-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-2xl px-4 py-3 font-display text-2xl font-bold text-ink-900 hover:bg-ink-100 dark:text-white dark:hover:bg-ink-800"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onOpenJoin();
                  }}
                  className="btn-primary w-full"
                >
                  <HandHeart className="h-4 w-4" aria-hidden="true" />
                  Seja Voluntário / Apoie
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
