# ARCHITECTURE — App Flow & Navegação

## Arquitetura Atual

### Modelo: Single-Page Application (SPA) com Anchor Navigation

O site opera como uma única página (`/`) com 8 seções verticais navegáveis por âncoras hash. Não há rotas adicionais implementadas.

```
/ (Root)
├── #hero          → Apresentação + CTA principal
├── #manifesto     → Texto institucional com animação scrub
├── #modalidades   → Musculação, MMT, Parkour
├── #metodologia   → Diferenciais e abordagem
├── #estrutura     → Galeria stacked cards (pin desktop)
├── #comunidade    → Depoimentos
├── #faq           → Perguntas frequentes accordion
└── #contato       → CTA final + info + footer
```

## Fluxo de Navegação

### Desktop
```
[Logo] ←→ [Nav Links] ←→ [CTA Button]
   ↓           ↓              ↓
 #hero    #modalidades    #contato
          #estrutura
          #metodologia
          #comunidade
          #contato
```

- Header fixo com blur/sombra ao rolar (>24px)
- Active link highlighting via IntersectionObserver
- Smooth scroll nativo (`scroll-smooth` no html)
- `scroll-mt-20` nas seções para compensar header fixo

### Mobile
```
[Logo]                    [Hamburger]
                                ↓
                     [Fullscreen Menu Overlay]
                     ├── 01 INÍCIO
                     ├── 02 MODALIDADES
                     ├── 03 ESTRUTURA
                     ├── 04 METODOLOGIA
                     ├── 05 COMUNIDADE
                     ├── 06 CONTATO
                     ├── [CTA Button]
                     └── [Logo faded]
```

- Menu abre com animação escalonada (stagger 60ms por item)
- Fecha ao clicar em link, pressionar ESC, ou resize para desktop
- Body scroll travado quando menu aberto
- Backdrop blur + overlay escuro

## Component Hierarchy

```
RootLayout (layout.tsx)
├── <html lang="pt-BR">
├── <body>
│   ├── Header (client component)
│   │   ├── Logo (Link → /#hero)
│   │   ├── Desktop Nav (hidden < xl)
│   │   ├── Desktop CTA (hidden < xl)
│   │   ├── Mobile Menu Button (hidden >= xl)
│   │   └── Mobile Menu Overlay (portal-like, outside <header>)
│   └── Home Page (page.tsx)
│       ├── Hero (client)
│       │   ├── Background Image + Overlays
│       │   ├── Decorative Diagonals
│       │   ├── Content Column (subtitle, h1, keywords, CTAs)
│       │   ├── Modality Cards Column
│       │   └── Scroll Indicator
│       ├── Manifesto (client)
│       │   └── Word-by-word scrub reveal
│       ├── Modalidades (client)
│       │   ├── SectionHeading
│       │   └── 3× Modality Cards (image bg + icon + text)
│       ├── Metodologia (client)
│       │   ├── Parallax Image Column
│       │   ├── SectionHeading
│       │   └── 3× Diferencial Items
│       ├── Estrutura (client)
│       │   ├── Desktop: Sticky Content + Stacked Cards (pin)
│       │   └── Mobile/Tablet: Vertical Scroll Cards
│       ├── Comunidade (client)
│       │   ├── SectionHeading
│       │   └── 3× Testimonial Cards
│       ├── FAQ (client)
│       │   ├── SectionHeading
│       │   └── 5× Accordion Items
│       └── Contato (client)
│           ├── CTA Column (heading + WhatsApp button)
│           ├── Info Column (address, hours, social)
│           └── Footer
```

## Data Flow

### Static Data (Hardcoded)
Todos os dados são estáticos, definidos como constantes dentro dos componentes:

| Dado | Localização | Itens |
|------|-------------|-------|
| Nav Links | Header.tsx | 6 links |
| Modalidades (Hero) | Hero.tsx | 3 cards |
| Modalidades (Section) | Modalidades.tsx | 3 cards com imagens |
| Manifesto Text | Manifesto.tsx | 1 parágrafo |
| Diferenciais | Metodologia.tsx | 3 itens |
| Estrutura Images | Estrutura.tsx | 4 imagens |
| Depoimentos | Comunidade.tsx | 3 placeholders |
| FAQ | FAQ.tsx | 5 perguntas |
| Contact Info | Contato.tsx | Endereço, horários, social |

### State Management
- **React useState**: Menu open/close, active nav link, FAQ accordion, active structure card index
- **React useRef**: GSAP animation targets, DOM element references
- **IntersectionObserver**: Active section detection (Header)
- **No global state**: Sem Context, Redux, Zustand — desnecessário para SPA estática

### External Links
| Destino | Origem | Status |
|---------|--------|--------|
| WhatsApp | Contato.tsx, Hero.tsx | ⚠️ URL incompleta (`https://wa.me/`) |
| Instagram | Contato.tsx | ✅ `@boxcurumimgym` |
| Âncoras internas | Header, Hero | ✅ Funcionais |

## Arquitetura Futura (Recomendada)

### Fase 2: Rotas Adicionais
```
/                          → Landing page (atual)
/modalidades/musculacao    → Página detalhada Musculação
/modalidades/mmt           → Página detalhada MMT
/modalidades/parkour       → Página detalhada Parkour
/planos                    → Tabela de preços
/sobre                     → História + Equipe
/blog                      → Artigos educativos
/blog/[slug]               → Artigo individual
/contato                   → Formulário dedicado + Mapa
```

### Fase 3: Área de Membros
```
/login                     → Autenticação
/dashboard                 → Visão geral do aluno
/dashboard/treinos         → Prescrições de treino
/dashboard/resultados      → Histórico de medidas/cargas
/dashboard/agendamentos    → Gerenciar aulas
```

### Migração de Dados
Quando o conteúdo crescer ou precisar de atualização por não-devs:
- Migrar dados hardcoded → MDX files ou headless CMS (Sanity, Contentful)
- Manter componentes como estão, apenas trocar fonte de dados
- Gerar rotas dinamicamente via `[slug]/page.tsx`

## Integrações Futuras

| Serviço | Finalidade | Prioridade |
|---------|-----------|------------|
| WhatsApp Business API | Chatbot + agendamento automatizado | Alta |
| Google Calendar / Calendly | Agendamento de aulas experimentais | Alta |
| Google Maps Embed | Mapa interativo na seção contato | Alta |
| Google Analytics 4 | Tracking de conversão e comportamento | Alta |
| Formspree / EmailJS | Formulário de contato sem backend | Média |
| Sentry | Error monitoring | Média |
| Vercel Speed Insights | Core Web Vitals monitoring | Média |