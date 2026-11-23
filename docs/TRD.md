# TRD — Documento de Requisitos Técnicos

## Stack Tecnológica

### Frontend
| Tecnologia | Versão | Finalidade |
|-----------|--------|------------|
| Next.js | 16.4.6 | Framework React com SSR/SSG, App Router, Image Optimization |
| React | 19.3.0 | UI library |
| React DOM | 19.3.0 | Renderização no browser |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | 4.3.3 | Utility-first styling com `@theme` tokens |
| @tailwindcss/turbopack | 4.3.3 | Integração Tailwind + Turbopack dev server |
| GSAP | ^3.15.1 | Animações complexas (ScrollTrigger, timelines, scrub) |
| @gsap/react | ^2.1.2 | Hook `useGSAP` para integração segura com React |
| clsx | ^2.1.1 | Conditional class composition |

### Ferramentas de Desenvolvimento
| Tecnologia | Versão | Finalidade |
|-----------|--------|------------|
| ESLint | ^9 | Linting |
| eslint-config-next | 16.4.6 | Configuração ESLint otimizada para Next.js |
| @types/node | ^20 | Tipos Node.js |
| @types/react | ^19 | Tipos React |
| @types/react-dom | ^19 | Tipos React DOM |

### Infraestrutura
| Item | Status | Observação |
|------|--------|------------|
| Hosting | A definir | Recomendado: Vercel (deploy zero-config para Next.js) |
| CDN | Automático via host | Next.js Image Optimization + asset caching |
| Domínio | A configurar | boxcurumimgym.com.br ou similar |
| SSL | Automático via host | HTTPS obrigatório |
| Analytics | Não implementado | Recomendado: Google Analytics 4 ou Plausible |
| Monitoring | Não implementado | Recomendado: Sentry ou Vercel Analytics |

## Configuração do Projeto

### next.config.ts
```ts
cacheComponents: true       // Cache de componentes server-side
partialPrefetching: true    // Prefetch parcial de rotas (performance)
turbopack.rules             // Loader Tailwind via Turbopack para dev rápido
```

### Estrutura de Diretórios
```
src/
├── app/
│   ├── globals.css          # Design tokens + estilos base
│   ├── layout.tsx           # Root layout (Header, metadata, fonts)
│   └── page.tsx             # Página única (landing page)
├── components/
│   ├── layout/
│   │   └── Header.tsx       # Header fixo + menu mobile
│   ├── sections/
│   │   ├── Hero.tsx         # Hero section com animações cinematográficas
│   │   ├── Manifesto.tsx    # Texto manifesto com scrub reveal
│   │   ├── Modalidades.tsx  # Cards das 3 modalidades
│   │   ├── Metodologia.tsx  # Diferenciais + imagem parallax
│   │   ├── Estrutura.tsx    # Stacked cards com pin/scrub desktop
│   │   ├── Comunidade.tsx   # Depoimentos
│   │   ├── FAQ.tsx          # Accordion de perguntas frequentes
│   │   └── Contato.tsx      # CTA final + informações + footer
│   └── ui/
│       ├── Button.tsx        # Componente botão reutilizável
│       └── SectionHeading.tsx # Heading padronizado de seções
public/
└── assets/                   # Imagens estáticas
    ├── logoCurumim.webp
    ├── bannerHome.png
    ├── SecondaryBanner.png
    └── Fachada.png
```

## Dependências Críticas

### GSAP
- Plugin `ScrollTrigger` registrado em cada componente que o utiliza
- `useGSAP` hook gerencia lifecycle automaticamente com `scope`
- `gsap.matchMedia()` para responsive animations + reduced motion
- Cleanup automático via context revert

### Tailwind CSS v4
- Sintaxe `@theme` para design tokens (substitui `tailwind.config`)
- Import via `@import "tailwindcss"` (não mais `@tailwind base/components/utilities`)
- Turbopack integration para HMR instantâneo

### Next.js 16
- App Router (não Pages Router)
- Server Components por padrão
- `metadata` export para SEO
- `<Image />` component com otimização automática
- `suppressHydrationWarning` no body (compatibilidade com temas/client-side state)

## Requisitos de Build

### Comandos
```bash
npm run dev     # Dev server com Turbopack + HMR
npm run build   # Production build (verificar zero errors/warnings)
npm run start   # Serve production build localmente
npm run lint    # ESLint check
```

### Environment Variables
Atualmente nenhuma variável de ambiente configurada. Futuramente necessárias para:
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — Número do WhatsApp
- `NEXT_PUBLIC_GA_ID` — Google Analytics ID
- `NEXT_PUBLIC_MAPS_API_KEY` — Google Maps embed (se usado)
- `CONTACT_FORM_ENDPOINT` — API de formulário (se implementado)

## Compatibilidade

### Browsers Suportados
- Chrome/Edge (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Mobile Chrome/Safari (iOS 15+, Android 10+)

### Reduced Motion
- Todas as animações GSAP respeitam `prefers-reduced-motion: reduce`
- CSS global desabilita animações/transições quando preferido
- Conteúdo permanece acessível sem animações

### Performance Targets
| Métrica | Meta |
|---------|------|
| LCP (Largest Contentful Paint) | <2.5s |
| FID (First Input Delay) | <100ms |
| CLS (Cumulative Layout Shift) | <0.1 |
| First Contentful Paint | <1.8s |
| Time to Interactive | <3.5s |
| Bundle size (JS) | <200KB gzipped |

## Riscos Técnicos

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| GSAP bundle size | Alto (~30KB min+gz) | Tree-shaking via imports específicos; considerar CSS-only para animações simples futuras |
| Imagens PNG grandes | Alto (LCP/CLS) | Converter para WebP/AVIF; usar `priority` apenas no hero; definir `sizes` correto |
| ScrollTrigger conflicts | Médio | Sempre usar `scope` + cleanup; evitar múltiplos triggers na mesma seção |
| Hydration mismatch | Médio | `suppressHydrationWarning` no body; evitar state-dependent rendering no server |
| Single-page scaling | Médio | Planejar rota migration quando conteúdo crescer além de ~10 seções |

## Decisões Técnicas Registradas

1. **Single-page vs Multi-page**: Single-page escolhido para MVP pela simplicidade e foco em conversão. Migrar para rotas quando adicionar páginas de modalidades, blog ou área de membros.
2. **GSAP vs CSS Animations**: GSAP escolhido para scrub/parallax/timeline control. CSS transitions mantidas para micro-interações (hover/focus/toggle).
3. **Tailwind v4 @theme vs config file**: `@theme` em CSS nativo elimina necessidade de `tailwind.config.ts` e integra melhor com Turbopack.
4. **Sem backend próprio**: Site puramente frontend. Dados dinâmicos futuros via serviços externos (formulário → Formspree/email; agendamento → app externo).
5. **Imagens em /public vs CMS**: Assets locais para MVP. Considerar headless CMS (Sanity/Contentful) quando conteúdo precisar de atualização frequente por não-devs.