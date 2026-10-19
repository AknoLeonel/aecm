import { BadgeCheck, Download, ExternalLink, FileText, Mail, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { DOCUMENTS, FULL_ADDRESS, INSTITUTION } from '../data/institution.js';

// Consulta pública oficial do CNPJ, para que qualquer pessoa confirme a situação cadastral.
const RECEITA_URL = 'https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/Cnpjreva_Solicitacao.asp';

export default function Transparency() {
  const facts = [
    { label: 'Razão social', value: INSTITUTION.fullName },
    { label: 'CNPJ', value: INSTITUTION.cnpj, mono: true },
    { label: 'Fundação', value: INSTITUTION.founded },
    { label: 'Natureza jurídica', value: 'Associação privada sem fins lucrativos' },
    { label: 'Sede', value: FULL_ADDRESS },
  ];

  return (
    <section
      id="transparencia"
      aria-labelledby="transparencia-title"
      className="border-y border-ink-200 bg-ink-900 py-20 text-white sm:py-28 dark:border-ink-800"
    >
      <div className="container-page grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow !text-brand-400">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Transparência
          </p>
          <h2 id="transparencia-title" className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Prestamos contas à comunidade.
          </h2>
          <p className="mt-4 max-w-lg text-ink-300">
            Todos os dados cadastrais da AECM são públicos e podem ser conferidos diretamente no site da Receita
            Federal.
          </p>

          <div className="mt-8 rounded-3xl border border-ink-700 bg-ink-800/60 p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-700 pb-5">
              <span className="flex items-center gap-2 font-display font-bold">
                <BadgeCheck className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                Cadastro Nacional (CNPJ)
              </span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                Situação: ATIVA
              </span>
            </div>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className={f.label === 'Sede' || f.label === 'Razão social' ? 'sm:col-span-2' : ''}>
                  <dt className="text-xs uppercase tracking-wider text-ink-400">{f.label}</dt>
                  <dd className={`mt-0.5 font-semibold text-ink-100 ${f.mono ? 'font-mono' : ''}`}>{f.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={RECEITA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-400 hover:text-brand-300"
            >
              Verificar na Receita Federal
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="font-display text-xl font-bold">Documentos institucionais</h3>
          <ul className="mt-6 space-y-3">
            {DOCUMENTS.map((doc) => {
              const mailto = `mailto:${INSTITUTION.emails[0]}?subject=${encodeURIComponent(
                `Solicitação de documento: ${doc.title}`,
              )}`;
              return (
                <li
                  key={doc.id}
                  className="group flex items-center gap-4 rounded-2xl border border-ink-700 bg-ink-800/40 p-4 transition-colors hover:border-ink-500"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink-700 text-brand-400">
                    <FileText className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{doc.title}</p>
                    <p className="text-sm text-ink-400">{doc.description}</p>
                  </div>
                  {doc.file ? (
                    <a
                      href={doc.file}
                      download
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-500 text-ink-950 transition-transform hover:scale-110"
                      aria-label={`Baixar ${doc.title} (PDF)`}
                    >
                      <Download className="h-5 w-5" aria-hidden="true" />
                    </a>
                  ) : (
                    <a
                      href={mailto}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-600 text-ink-200 transition-colors hover:border-brand-400 hover:text-brand-400"
                      aria-label={`Solicitar ${doc.title} por e-mail`}
                      title="Solicitar por e-mail"
                    >
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
