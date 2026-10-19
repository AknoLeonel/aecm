import { useCallback, useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Pillars from './components/Pillars.jsx';
import Agenda from './components/Agenda.jsx';
import Transparency from './components/Transparency.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Modal from './components/Modal.jsx';
import ContactForm from './components/ContactForm.jsx';
import { useTheme } from './hooks/useTheme.js';
import { whatsappLink } from './data/institution.js';

const CLOSED = { open: false, key: 0 };

export default function App() {
  const { isDark, toggle } = useTheme();
  const [modal, setModal] = useState(CLOSED);

  const openJoin = useCallback(() => {
    setModal((m) => ({
      open: true,
      key: m.key + 1,
      title: 'Faça parte do movimento',
      description: 'Seja voluntário(a), apoie um projeto ou proponha uma parceria.',
      interest: 'voluntario',
      message: '',
    }));
  }, []);

  const openSignup = useCallback((evt) => {
    setModal((m) => ({
      open: true,
      key: m.key + 1,
      title: 'Inscrição no evento',
      description: evt.title,
      interest: 'inscricao',
      message: `Quero me inscrever em: ${evt.title} (${evt.date.split('-').reverse().join('/')}).`,
    }));
  }, []);

  const closeModal = useCallback(() => setModal((m) => ({ ...m, open: false })), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-full bg-brand-500 px-4 py-2 font-bold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>

      <Header isDark={isDark} onToggleTheme={toggle} onOpenJoin={openJoin} />

      <main id="conteudo">
        <Hero />
        <About />
        <Pillars />
        <Agenda onSignup={openSignup} />
        <Transparency />
        <Contact />
      </main>

      <Footer />

      {/* Atalho flutuante para WhatsApp no celular */}
      <motion.a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a AECM no WhatsApp (abre em nova aba)"
        className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 md:hidden"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </motion.a>

      <Modal open={modal.open} onClose={closeModal} title={modal.title} description={modal.description}>
        <ContactForm key={modal.key} initialInterest={modal.interest} initialMessage={modal.message} autoFocus />
      </Modal>
    </MotionConfig>
  );
}
