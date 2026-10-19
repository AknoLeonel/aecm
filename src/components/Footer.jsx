import { ArrowUp, MessageCircle } from 'lucide-react';
import Logo from './Logo.jsx';
import { FULL_ADDRESS, INSTITUTION, NAV_LINKS, PILLARS, whatsappLink } from '../data/institution.js';

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white pt-16 dark:border-ink-800 dark:bg-ink-900/40">
      <div className="container-page grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <span className="font-display text-lg font-extrabold">AECM</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            {INSTITUTION.fullName}. Esporte, arte e cidadania no Guará II e em todo o DF.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {INSTITUTION.phone}
            <span className="sr-only">(WhatsApp, abre em nova aba)</span>
          </a>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">Navegação</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-ink-700 hover:text-brand-600 dark:text-ink-200 dark:hover:text-brand-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">Atividades (CNAE)</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-700 dark:text-ink-200">
            {PILLARS.map((p) => (
              <li key={p.id}>
                {p.title} <span className="font-mono text-xs text-ink-500 dark:text-ink-400">{p.cnae}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">Contato</h2>
          <address className="mt-4 space-y-2 text-sm not-italic text-ink-700 dark:text-ink-200">
            <p>{FULL_ADDRESS}</p>
            <p>
              <a href={INSTITUTION.phoneHref} className="hover:text-brand-600 dark:hover:text-brand-400">
                {INSTITUTION.phone}
              </a>
            </p>
            {INSTITUTION.emails.map((email) => (
              <p key={email}>
                <a href={`mailto:${email}`} className="break-all hover:text-brand-600 dark:hover:text-brand-400">
                  {email}
                </a>
              </p>
            ))}
          </address>
        </div>
      </div>

      <div className="border-t border-ink-200 dark:border-ink-800">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-center text-xs text-ink-500 sm:flex-row sm:text-left dark:text-ink-400">
          <p>
            © {new Date().getFullYear()} {INSTITUTION.fullName} · CNPJ {INSTITUTION.cnpj} · Presidente: {INSTITUTION.president}
          </p>
          <a href="#inicio" className="inline-flex items-center gap-1.5 font-semibold hover:text-ink-900 dark:hover:text-white">
            Voltar ao topo
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
