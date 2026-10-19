import { Trophy, Palette, HeartHandshake, Drama } from 'lucide-react';

// Fonte única dos dados institucionais. Atualize aqui e o site inteiro reflete a mudança.
export const INSTITUTION = {
  name: 'AECM',
  fullName: 'Associação Esporte e Cultura em Movimento',
  cnpj: '35.155.169/0001-03',
  cnpjDigits: '35155169000103',
  president: 'Pedro Terra de Farias',
  founded: '10/10/2019',
  foundedYear: 2019,
  phone: '(61) 99694-2323',
  phoneHref: 'tel:+5561996942323',
  whatsappNumber: '5561996942323',
  emails: ['contato.aecm@gmail.com', 'agenciaempatia@gmail.com'],
  street: 'QE 28 Bloco A, 26, Loja 26',
  district: 'Guará II',
  city: 'Brasília',
  state: 'DF',
  cep: '71060-612',
};

export const FULL_ADDRESS = `${INSTITUTION.street} – ${INSTITUTION.district}, ${INSTITUTION.city} – ${INSTITUTION.state}, ${INSTITUTION.cep}`;

export const MAPS_QUERY = encodeURIComponent(
  `${INSTITUTION.street}, ${INSTITUTION.district}, ${INSTITUTION.city} - ${INSTITUTION.state}, ${INSTITUTION.cep}`,
);

export const whatsappLink = (
  text = 'Olá! Gostaria de saber mais sobre os projetos da AECM.',
) => `https://wa.me/${INSTITUTION.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const yearsActive = () => new Date().getFullYear() - INSTITUTION.foundedYear;

// Os 4 pilares correspondem às atividades econômicas (CNAE) registradas no CNPJ.
export const PILLARS = [
  {
    id: 'esporte',
    filter: 'esporte',
    title: 'Esporte em Movimento',
    category: 'Esporte',
    cnae: '9319-1/01',
    icon: Trophy,
    accent: 'from-brand-400 to-brand-600',
    chip: 'text-brand-700 bg-brand-100 dark:text-brand-300 dark:bg-brand-500/15',
    description:
      'Campeonatos comunitários de futebol, futsal e basquete, corridas de rua e escolinhas esportivas para crianças e jovens do Guará e de todo o DF.',
    highlights: ['Futebol & Futsal', 'Basquete', 'Corridas'],
  },
  {
    id: 'arte',
    filter: 'cultura',
    title: 'Arte & Cultura',
    category: 'Cultura',
    cnae: '8592-9/99',
    icon: Palette,
    accent: 'from-violet-400 to-violet-600',
    chip: 'text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-500/15',
    description:
      'Oficinas gratuitas de pintura, artes visuais, teatro e dança, valorizando talentos locais e o acesso à cultura.',
    highlights: ['Pintura', 'Teatro', 'Dança'],
  },
  {
    id: 'espetaculos',
    filter: 'cultura',
    title: 'Eventos & Espetáculos',
    category: 'Cultura',
    cnae: '9001-9/99',
    icon: Drama,
    accent: 'from-fuchsia-400 to-pink-600',
    chip: 'text-pink-700 bg-pink-100 dark:text-pink-300 dark:bg-pink-500/15',
    description:
      'Produção de apresentações cênicas, festivais e espetáculos abertos à comunidade, levando arte para as ruas e praças do DF.',
    highlights: ['Festivais', 'Apresentações', 'Mostras'],
  },
  {
    id: 'direitos',
    filter: 'social',
    title: 'Defesa de Direitos',
    category: 'Social',
    cnae: '9430-8/00',
    icon: HeartHandshake,
    accent: 'from-emerald-400 to-teal-600',
    chip: 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15',
    description:
      'Ações comunitárias de cidadania, inclusão social e orientação sobre direitos, com atenção a jovens e famílias em situação de vulnerabilidade.',
    highlights: ['Cidadania', 'Inclusão', 'Assistência'],
  },
];

export const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'esporte', label: 'Esporte' },
  { id: 'cultura', label: 'Cultura' },
  { id: 'social', label: 'Social' },
];

// Agenda: datas em ISO (AAAA-MM-DD). Eventos com data passada saem da lista automaticamente.
export const EVENTS = [
  {
    id: 'futsal-2026',
    title: 'Campeonato Comunitário de Futsal',
    date: '2026-11-12',
    time: '08:00',
    location: 'Quadra coberta do Guará II',
    category: 'esporte',
    status: 'Inscrições abertas',
    description: 'Torneio por equipes nas categorias sub-15, sub-17 e livre. Inscrição gratuita.',
  },
  {
    id: 'pintura-urbana-2026',
    title: 'Oficina de Arte & Pintura Urbana',
    date: '2026-11-20',
    time: '14:00',
    location: 'Sede AECM – Guará II',
    category: 'cultura',
    status: 'Vagas limitadas',
    description: 'Técnicas de muralismo e grafite com materiais fornecidos pela associação.',
  },
  {
    id: 'corrida-2026',
    title: 'Corrida Rústica do Guará',
    date: '2026-11-29',
    time: '07:00',
    location: 'Parque do Guará',
    category: 'esporte',
    status: 'Inscrições abertas',
    description: 'Percursos de 3 km e 5 km para todas as idades, com kit para os participantes.',
  },
  {
    id: 'cidadania-2026',
    title: 'Encontro de Inclusão & Cidadania',
    date: '2026-12-05',
    time: '09:00',
    location: 'Auditório comunitário – Guará II',
    category: 'social',
    status: 'Aberto ao público',
    description: 'Rodas de conversa, emissão de documentos e orientação sobre direitos sociais.',
  },
  {
    id: 'espetaculo-natal-2026',
    title: 'Espetáculo de Fim de Ano',
    date: '2026-12-13',
    time: '19:00',
    location: 'Praça do Guará II',
    category: 'cultura',
    status: 'Entrada gratuita',
    description: 'Apresentação de teatro e dança com os alunos das oficinas culturais.',
  },
];

// Documentos de transparência. Preencha "file" com o caminho do PDF em /public/docs
// para habilitar o download; sem arquivo, o botão vira "Solicitar por e-mail".
export const DOCUMENTS = [
  { id: 'estatuto', title: 'Estatuto Social', description: 'Regras de funcionamento e finalidades da associação.', file: null },
  { id: 'ata', title: 'Ata de Eleição da Diretoria', description: 'Composição atual da diretoria.', file: null },
  { id: 'relatorio', title: 'Relatório de Atividades', description: 'Projetos realizados e público atendido.', file: null },
  { id: 'contas', title: 'Prestação de Contas', description: 'Demonstrativo financeiro anual.', file: null },
];

export const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#pilares', label: 'Pilares' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#transparencia', label: 'Transparência' },
  { href: '#contato', label: 'Contato' },
];
