# AECM – Associação Esporte e Cultura em Movimento

Site institucional da AECM (aecm.com.br): React 19 + Vite, Tailwind CSS, Framer Motion e Lucide.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/ para publicar (Vercel, Netlify, Hostinger etc.)
```

## Onde editar o conteúdo

Tudo fica em `src/data/institution.js`:

- `INSTITUTION` – CNPJ, endereço, telefone, e-mails, presidente.
- `PILLARS` – os 4 pilares (um por CNAE).
- `EVENTS` – agenda. Use datas `AAAA-MM-DD`; eventos passados somem sozinhos.
- `DOCUMENTS` – transparência. Coloque o PDF em `public/docs/` e preencha `file: '/docs/arquivo.pdf'`
  para liberar o download. Sem arquivo, o botão vira "Solicitar por e-mail".

O JSON-LD (Schema.org `NGO`) e as meta tags de SEO estão em `index.html`.

## Formulário de contato

Sem configuração, o formulário valida os campos e abre o WhatsApp ou o e-mail da associação com a
mensagem já escrita. Para receber as mensagens direto na caixa de entrada, crie um formulário no
[Formspree](https://formspree.io) (ou similar) e defina:

```bash
# .env
VITE_FORM_ENDPOINT=https://formspree.io/f/SEU_ID
```

## Acessibilidade

Link "Pular para o conteúdo", foco visível, labels associados, erros anunciados por leitor de tela,
modal com foco preso e Esc, `aria-expanded` no menu, alvos de toque ≥ 44px e animações reduzidas
quando o sistema pede (`prefers-reduced-motion`).
