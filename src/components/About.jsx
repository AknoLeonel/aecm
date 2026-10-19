import { Award, CheckCircle2, Users, MapPin } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { INSTITUTION } from '../data/institution.js';

const VALUES = [
  'Escolinhas e torneios de futebol, futsal, basquete e corridas comunitárias.',
  'Oficinas de pintura, teatro e dança, além da produção de espetáculos.',
  'Ações de cidadania, inclusão e orientação sobre direitos sociais.',
  'Parcerias com o poder público, empresas e outras organizações do DF.',
];

const TIMELINE = [
  { year: '2019', text: 'Fundação da AECM no Guará II, em 10 de outubro.' },
  { year: '2020+', text: 'Primeiros torneios comunitários e ações solidárias no DF.' },
  { year: 'Hoje', text: 'Esporte, arte, espetáculos e cidadania em um só movimento.' },
];

export default function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="py-20 sm:py-28">
      <div className="container-page grid items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">
            <Users className="h-4 w-4" aria-hidden="true" />
            Sobre a AECM
          </p>
          <h2 id="sobre-title" className="h-section mt-4">
            Inclusão e cidadania ativa desde {INSTITUTION.foundedYear}.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-600 sm:text-lg dark:text-ink-300">
            A <strong className="font-semibold text-ink-900 dark:text-white">{INSTITUTION.fullName}</strong> é
            uma instituição sem fins lucrativos sediada no Guará II, em Brasília. Nossa missão é usar o esporte,
            a arte e a cultura como ferramentas de transformação social, aproximando jovens, famílias e a
            comunidade de oportunidades de lazer, formação e garantia de direitos.
          </p>

          <ul className="mt-8 space-y-3">
            {VALUES.map((value) => (
              <li key={value} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
                <span className="text-ink-700 dark:text-ink-200">{value}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="space-y-4 lg:col-span-5">
          <Reveal delay={0.1} className="card relative overflow-hidden p-6 sm:p-8">
            <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-400/20 blur-2xl" />
            <div className="relative flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-500 font-display text-xl font-extrabold text-ink-950">
                {INSTITUTION.president
                  .split(' ')
                  .filter((_, i, arr) => i === 0 || i === arr.length - 1)
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Presidente</p>
                <p className="font-display text-xl font-bold text-ink-900 dark:text-white">{INSTITUTION.president}</p>
              </div>
              <Award className="ml-auto h-6 w-6 text-brand-500" aria-hidden="true" />
            </div>
            <p className="relative mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              À frente da associação, coordena projetos esportivos, culturais e sociais em parceria com
              voluntários e a comunidade do Guará.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="card p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-ink-900 dark:text-white">Nossa trajetória</h3>
            <ol className="mt-5 space-y-5 border-l-2 border-ink-200 pl-5 dark:border-ink-700">
              {TIMELINE.map((item) => (
                <li key={item.year} className="relative">
                  <span aria-hidden="true" className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-white dark:ring-ink-900" />
                  <p className="font-display text-sm font-extrabold text-brand-600 dark:text-brand-400">{item.year}</p>
                  <p className="text-sm text-ink-700 dark:text-ink-200">{item.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex items-center gap-2 text-xs text-ink-500 dark:text-ink-400">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Sede no {INSTITUTION.district}, {INSTITUTION.city}-{INSTITUTION.state}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
