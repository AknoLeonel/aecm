import { useState } from 'react';
import { Mail, MapPin, MessageCircle, Navigation, Phone, Send } from 'lucide-react';
import Reveal from './Reveal.jsx';
import ContactForm from './ContactForm.jsx';
import { FULL_ADDRESS, INSTITUTION, MAPS_QUERY, whatsappLink } from '../data/institution.js';

export default function Contact() {
  // O mapa só carrega quando a pessoa pede: economiza dados móveis e evita cookies de terceiros.
  const [showMap, setShowMap] = useState(false);

  const channels = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: INSTITUTION.phone,
      href: whatsappLink(),
      external: true,
      accent: 'bg-emerald-500 text-white',
    },
    { icon: Phone, title: 'Telefone', value: INSTITUTION.phone, href: INSTITUTION.phoneHref, accent: 'bg-ink-900 text-white dark:bg-white dark:text-ink-900' },
    ...INSTITUTION.emails.map((email) => ({
      icon: Mail,
      title: 'E-mail',
      value: email,
      href: `mailto:${email}`,
      accent: 'bg-violet-500 text-white',
    })),
  ];

  return (
    <section id="contato" aria-labelledby="contato-title" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2">
        <Reveal className="space-y-8">
          <div>
            <p className="eyebrow">
              <Send className="h-4 w-4" aria-hidden="true" />
              Fale conosco
            </p>
            <h2 id="contato-title" className="h-section mt-4">
              Vamos jogar juntos?
            </h2>
            <p className="mt-4 text-ink-600 dark:text-ink-300">
              Dúvidas sobre oficinas, inscrições em campeonatos, parcerias ou voluntariado? Chame a gente.
            </p>
          </div>

          <address className="not-italic">
            <ul className="grid gap-3 sm:grid-cols-2">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.value + c.title}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="card group flex items-center gap-4 p-4 transition-colors hover:border-ink-400 dark:hover:border-ink-600"
                    >
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${c.accent} transition-transform group-hover:scale-110`}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">{c.title}</span>
                        <span className="block truncate font-semibold text-ink-900 dark:text-white">{c.value}</span>
                      </span>
                      {c.external && <span className="sr-only">(abre em nova aba)</span>}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="card mt-3 overflow-hidden">
              <div className="flex items-start gap-4 p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500 text-ink-950">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Sede</span>
                  <span className="block font-semibold text-ink-900 dark:text-white">{FULL_ADDRESS}</span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:underline dark:text-brand-400"
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                    Como chegar
                    <span className="sr-only">(Google Maps, abre em nova aba)</span>
                  </a>
                </div>
              </div>
              {showMap ? (
                <iframe
                  title={`Mapa da sede da AECM no ${INSTITUTION.district}`}
                  src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
                  className="h-64 w-full border-0 dark:opacity-90 dark:invert-[0.9] dark:hue-rotate-180"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowMap(true)}
                  className="group relative flex h-40 w-full items-center justify-center overflow-hidden border-t border-ink-200 bg-ink-100 dark:border-ink-800 dark:bg-ink-800/60"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 opacity-40 [background-image:linear-gradient(theme(colors.ink.300)_1px,transparent_1px),linear-gradient(90deg,theme(colors.ink.300)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-20"
                  />
                  <span className="btn-dark relative">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    Ver mapa
                  </span>
                </button>
              )}
            </div>
          </address>
        </Reveal>

        <Reveal delay={0.1} className="card p-6 sm:p-8">
          <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-white">Envie uma mensagem</h3>
          <p className="mb-6 mt-1 text-sm text-ink-600 dark:text-ink-300">Respondemos em até 2 dias úteis.</p>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
