# UI/UX Design — Box Curumim Gym

## Identidade Visual

### Conceito
Esportiva premium com estética dark cinematográfica. Transmite força, disciplina e evolução sem ser agressiva ou intimidante. Equilíbrio entre energia (laranja) e sofisticação (preto/grafite).

### Paleta de Cores

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-black` | `#0B0B0D` | Background principal, overlays |
| `--color-graphite` | `#27272A` | Backgrounds secundários (FAQ, cards), bordas sutis |
| `--color-white` | `#F4F4F2` | Texto primário, headings |
| `--color-orange` | `#F36B21` | Accent, CTAs, highlights, ícones ativos, links hover |
| `--color-orange-hover` | `#D95A15` | Estado hover de botões primários |
| `--color-gray-light` | `#A1A1AA` | Texto secundário, descrições, labels |
| `--color-gray-dark` | `#3F3F46` | Texto terciário, notas, disclaimer, footer |

#### Aplicação
- **Background**: Preto puro (`#0B0B0D`) como base; grafite para alternância de seções
- **Texto**: Branco off-white (`#F4F4F2`) para leitura confortável; nunca branco puro `#FFF`
- **Accent**: Laranja usado com moderação — CTAs, palavras-chave em títulos, ícones, indicadores ativos
- **Overlays**: Gradientes sobre imagens (bottom-to-top, left-to-right) para garantir legibilidade do texto
- **Borders**: `white/5` a `white/10` para sutileza; `orange/30` a `orange/50` para hover/focus

### Tipografia

| Função | Família | Pesos | Estilo | Uso |
|--------|---------|-------|--------|-----|
| Display | Oswald | 400, 500, 600, 700 | Uppercase + Italic | Headings, CTAs, labels, números decorativos |
| Body | Inter | 300, 400, 500, 600 | Normal | Parágrafos, descrições, FAQ answers, meta text |

#### Escala Tipográfica
| Elemento | Desktop | Mobile | Font |
|----------|---------|--------|------|
| H1 (Hero) | `clamp(3rem, 7.2vw, 7.5rem)` | Responsivo via clamp | Oswald bold italic |
| H2 (Section) | `4xl → 6xl` | `3xl → 4xl` | Oswald bold italic |
| H3 (Card title) | `2xl → 3xl` | `xl → 2xl` | Oswald bold italic |
| H4 (Sub-card) | `lg` | `base` | Oswald bold italic |
| Body large | `lg` | `base` | Inter regular |
| Body default | `base` | `sm` | Inter regular |
| Caption/Label | `xs → sm` | `xs` | Inter medium, uppercase tracking-wide |
| Micro label | `10px` | `10px` | Inter medium, uppercase tracking-[0.3em] |

#### Tracking & Leading
- Display: `letter-spacing: -0.02em` a `-0.045em` (tight); `line-height: 0.86` a `0.95`
- Body: `leading-relaxed` (1.625) para parágrafos; `leading-snug` (1.375) para captions
- Labels uppercase: `tracking-[0.16em]` a `tracking-[0.3em]`

## Componentes UI

### Button
| Variante | Background | Text | Border | Hover |
|----------|-----------|------|--------|-------|
| Primary | `orange` | `black` | none | `orange-hover` + glow shadow |
| Outline | transparent | `white` | `white/30` | border `orange`, text `orange` |
| Ghost | transparent | `white` | none | text `orange` |

| Tamanho | Padding | Text Size |
|---------|---------|-----------|
| sm | `px-4 py-2` | `sm` |
| md | `px-6 py-3` | `base` |
| lg | `px-8 py-4` | `lg` |

- Fonte: Oswald uppercase italic
- Focus ring: `outline-2 outline-offset-4 outline-orange`
- Disabled: `opacity-50 pointer-events-none`
- Ícone opcional à esquerda, shrink-0

### SectionHeading
- Barras diagonais decorativas (5× `w-1 h-6 bg-orange skew-x-[-20deg]`)
- Subtitle: gray-light, uppercase, tracking-widest
- Title: Oswald bold italic, highlight word em laranja
- Alinhamento: left (default) ou center

### Cards
- Border: `white/5` default → `orange/30` a `orange/50` no hover
- Background: `black/40` a `graphite/50` com backdrop-blur quando aplicável
- Rounded: `rounded-2xl` (containers), `rounded-xl` (inner elements)
- Hover effects: lift (`translateY(-4px)`), glow shadow, border color transition
- Imagens: overlay gradiente obrigatório para legibilidade

### Header
- Height: `h-20` (top) → `h-16` (scrolled)
- Background: `black/40 blur-sm` → `black/85 blur-md` ao rolar
- Logo: `h-10` → `h-9` ao rolar
- Nav links: Oswald sm uppercase italic, active = orange + underline animado
- CTA desktop: outline orange, rounded-full
- Mobile menu: fullscreen overlay `black/95 blur-xl`, stagger animation

## UX Patterns

### Navegação
- **Anchor scroll**: Smooth scroll nativo com `scroll-mt-20` para offset do header fixo
- **Active state**: IntersectionObserver detecta seção visível (-45%/-50% rootMargin)
- **Mobile menu**: Fullscreen, fecha com ESC/clique link/resize, body scroll lock
- **Logo click**: Sempre retorna ao `/#hero`

### Conversão
- **CTA primário**: "Agende sua Experiência" — aparece no Hero, Header desktop, Menu mobile, Contato
- **CTA secundário**: "Conheça Nossa Estrutura" — botão play visual no Hero
- **WhatsApp**: Botão destacado na seção Contato (único ponto de conversão externo)
- **Redução de atrito**: FAQ responde objeções comuns antes do CTA final

### Animações & Motion
| Seção | Técnica | Trigger | Reduced Motion |
|-------|---------|---------|----------------|
| Hero | Timeline: image scale+fade, subtitle slide, word-by-word title, CTA fade, cards stagger | On load | Skip all, show static |
| Manifesto | Word-by-word opacity scrub | Scroll (scrub: 1) | Show at full opacity |
| Modalidades | Stagger reveal + scale | ScrollTrigger top 70% | Fade in simple |
| Metodologia | Parallax image + stagger items | Scroll (scrub for parallax) | No parallax, fade items |
| Estrutura | Desktop: pin + stacked cards scrub; Mobile: vertical reveal | Scroll (scrub: 1) | Simple fade in |
| Comunidade | Stagger + rotateX subtle | ScrollTrigger top 70% | Fade in simple |
| FAQ | Section opacity fade only | ScrollTrigger top 80% | Instant show |
| Contato | Content slide up | ScrollTrigger top 70% | Fade in simple |
| Header | Entry: slide down + fade | On load | Instant show |

### Acessibilidade
- `prefers-reduced-motion`: Respeitado globalmente (CSS) e por componente (GSAP matchMedia)
- Focus visible: Ring laranja em todos os elementos interativos
- ARIA: `aria-label` em sections, `aria-expanded`/`aria-controls` em accordion/menu, `role="region"` em FAQ answers
- Contraste: Combinações testadas para WCAG AA (white on black/graphite, orange on black)
- Semântica: `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`, heading hierarchy H1→H2→H3→H4
- Imagens: Alt descritivo único; decorativas com `alt=""`
- Seleção de texto: `selection:bg-orange selection:text-black`

## Responsividade

### Breakpoints
| Breakpoint | Largura | Layout |
|------------|-------|--------|
| Mobile | < 768px | Single column, stacked cards, simplified animations |
| Tablet | 768px – 1023px | 2-3 columns grids, adapted scroll distances |
| Desktop | ≥ 1024px | Full layout, pin/scrub animations, side-by-side columns |
| XL | ≥ 1280px | Desktop nav visible, mobile menu hidden |

### Adaptações Mobile
- Hero: Cards de modalidade abaixo do conteúdo (não ao lado)
- Estrutura: Vertical scroll simples (sem pin/stacked)
- Tipografia: Escala reduzida via clamp/responsive classes
- Animações: Distâncias menores, sem parallax, durations mais curtas
- Spacing: `py-24` mobile → `py-32` desktop nas seções
- Container padding: `px-6` mobile → `px-12` md → `px-20` lg

## Assets

### Imagens Atuais
| Arquivo | Formato | Uso | Observação |
|---------|---------|-----|------------|
| logoCurumim.webp | WebP | Header, Footer, Mobile menu | ✅ Formato otimizado |
| bannerHome.png | PNG | Hero background, Modalidades (Musculação) | ⚠️ Converter para WebP |
| SecondaryBanner.png | PNG | Modalidades (MMT), Metodologia parallax, Estrutura | ⚠️ Converter para WebP |
| Fachada.png | PNG | Modalidades (Parkour), Estrutura (2×) | ⚠️ Converter para WebP |

### Recomendações
- Converter todos os PNGs para WebP ou AVIF (redução de 30-50% no peso)
- Adicionar fotos reais da equipe/profissionais
- Adicionar fotos reais dos alunos/treinos (com autorização)
- Considerar vídeo curto no Hero (autoplay muted loop) para versão futura
- Otimizar dimensões: servir tamanhos adequados via `sizes` attribute