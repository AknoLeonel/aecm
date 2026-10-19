import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Mail, MessageCircle, Send } from 'lucide-react';
import { INSTITUTION, whatsappLink } from '../data/institution.js';

export const INTERESTS = [
  { value: 'voluntario', label: 'Quero ser voluntário(a)' },
  { value: 'inscricao', label: 'Inscrição em projeto ou torneio' },
  { value: 'apoio', label: 'Quero apoiar / doar' },
  { value: 'parceria', label: 'Parceria institucional' },
  { value: 'outros', label: 'Outros assuntos' },
];

// Opcional: defina VITE_FORM_ENDPOINT (ex.: Formspree) para receber as mensagens por POST.
// Sem endpoint, o formulário monta a mensagem e abre o WhatsApp ou o e-mail da associação.
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 3) errors.name = 'Informe seu nome (mínimo de 3 letras).';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Informe um e-mail válido, ex.: nome@email.com.';
  const digits = values.phone.replace(/\D/g, '');
  if (digits && (digits.length < 10 || digits.length > 11)) errors.phone = 'Telefone com DDD, ex.: (61) 99999-9999.';
  if (values.message.trim().length < 10) errors.message = 'Escreva uma mensagem com pelo menos 10 caracteres.';
  return errors;
}

function maskPhone(value) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function composeMessage(values) {
  const interest = INTERESTS.find((i) => i.value === values.interest)?.label ?? values.interest;
  return [
    'Olá, AECM! Mensagem enviada pelo site:',
    '',
    `Nome: ${values.name.trim()}`,
    `E-mail: ${values.email.trim()}`,
    values.phone ? `Telefone: ${values.phone}` : null,
    `Interesse: ${interest}`,
    '',
    values.message.trim(),
  ]
    .filter((line) => line !== null)
    .join('\n');
}

export default function ContactForm({ initialInterest = 'voluntario', initialMessage = '', autoFocus = false }) {
  const uid = useId();
  const fieldId = (name) => `${uid}-${name}`;
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    interest: initialInterest,
    message: initialMessage,
  });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const formRef = useRef(null);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const errors = validate(values);
  const showError = (name) => touched[name] && errors[name];

  const update = (name) => (e) => {
    const value = name === 'phone' ? maskPhone(e.target.value) : e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const blur = (name) => () => setTouched((prev) => ({ ...prev, [name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(errors).length) {
      const first = ['name', 'email', 'phone', 'message'].find((k) => errors[k]);
      formRef.current?.querySelector(`#${CSS.escape(fieldId(first))}`)?.focus();
      return;
    }

    const channel = e.nativeEvent.submitter?.value ?? 'whatsapp';
    const text = composeMessage(values);

    if (FORM_ENDPOINT) {
      setStatus({ state: 'sending', message: '' });
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, _subject: `Site AECM – ${values.interest}` }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus({ state: 'success', message: 'Mensagem enviada! Responderemos em breve pelo seu e-mail.' });
        setValues((prev) => ({ ...prev, name: '', email: '', phone: '', message: '' }));
        setTouched({});
      } catch {
        setStatus({
          state: 'error',
          message: `Não foi possível enviar agora. Tente pelo WhatsApp ${INSTITUTION.phone}.`,
        });
      }
      return;
    }

    if (channel === 'email') {
      const subject = encodeURIComponent(`Contato pelo site – ${values.name.trim()}`);
      window.location.href = `mailto:${INSTITUTION.emails[0]}?subject=${subject}&body=${encodeURIComponent(text)}`;
      setStatus({ state: 'success', message: 'Abrimos seu aplicativo de e-mail com a mensagem pronta. É só enviar!' });
    } else {
      window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
      setStatus({ state: 'success', message: 'Abrimos o WhatsApp com sua mensagem pronta. É só tocar em enviar!' });
    }
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus({ state: 'idle', message: '' }), 8000);
  };

  const errorProps = (name) => ({
    'aria-invalid': showError(name) ? 'true' : undefined,
    'aria-describedby': showError(name) ? `${fieldId(name)}-error` : undefined,
  });

  // Função (não componente) para não remontar a animação a cada tecla.
  const renderError = (name) => (
    <AnimatePresence>
      {showError(name) && (
        <motion.p
          id={`${fieldId(name)}-error`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {errors[name]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  const labelClass = 'mb-1.5 block text-sm font-semibold text-ink-800 dark:text-ink-100';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={fieldId('name')} className={labelClass}>
            Nome completo <span aria-hidden="true" className="text-brand-600">*</span>
          </label>
          <input
            id={fieldId('name')}
            type="text"
            autoComplete="name"
            required
            autoFocus={autoFocus}
            value={values.name}
            onChange={update('name')}
            onBlur={blur('name')}
            className={`field ${showError('name') ? 'field-error' : ''}`}
            {...errorProps('name')}
          />
          {renderError('name')}
        </div>

        <div>
          <label htmlFor={fieldId('email')} className={labelClass}>
            E-mail <span aria-hidden="true" className="text-brand-600">*</span>
          </label>
          <input
            id={fieldId('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="nome@email.com"
            value={values.email}
            onChange={update('email')}
            onBlur={blur('email')}
            className={`field ${showError('email') ? 'field-error' : ''}`}
            {...errorProps('email')}
          />
          {renderError('email')}
        </div>

        <div>
          <label htmlFor={fieldId('phone')} className={labelClass}>
            WhatsApp <span className="font-normal text-ink-500 dark:text-ink-400">(opcional)</span>
          </label>
          <input
            id={fieldId('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(61) 99999-9999"
            value={values.phone}
            onChange={update('phone')}
            onBlur={blur('phone')}
            className={`field ${showError('phone') ? 'field-error' : ''}`}
            {...errorProps('phone')}
          />
          {renderError('phone')}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={fieldId('interest')} className={labelClass}>
            Assunto
          </label>
          <select id={fieldId('interest')} value={values.interest} onChange={update('interest')} className="field">
            {INTERESTS.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={fieldId('message')} className={labelClass}>
            Mensagem <span aria-hidden="true" className="text-brand-600">*</span>
          </label>
          <textarea
            id={fieldId('message')}
            rows={4}
            required
            placeholder="Como podemos ajudar?"
            value={values.message}
            onChange={update('message')}
            onBlur={blur('message')}
            className={`field resize-y ${showError('message') ? 'field-error' : ''}`}
            {...errorProps('message')}
          />
          {renderError('message')}
        </div>
      </div>

      <p className="text-xs text-ink-500 dark:text-ink-400">
        <span aria-hidden="true">*</span> Campos obrigatórios. Seus dados são usados apenas para responder ao contato.
      </p>

      {FORM_ENDPOINT ? (
        <button type="submit" className="btn-primary w-full py-4" disabled={status.state === 'sending'}>
          {status.state === 'sending' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          {status.state === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
        </button>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="submit" name="channel" value="whatsapp" className="btn-primary py-4">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Enviar pelo WhatsApp
          </button>
          <button type="submit" name="channel" value="email" className="btn-ghost py-4">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Enviar por e-mail
          </button>
        </div>
      )}

      <div aria-live="polite" role="status">
        <AnimatePresence>
          {status.message && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-start gap-2 rounded-2xl border p-4 text-sm font-medium ${
                status.state === 'error'
                  ? 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300'
                  : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
              }`}
            >
              {status.state === 'error' ? (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              {status.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
