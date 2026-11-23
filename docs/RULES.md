# RULES — Livro de Regras do Projeto

## Regras de Código

### Geral
- Todo componente visual deve ser `"use client"` apenas quando usar hooks React, GSAP ou APIs do browser
- Componentes puramente estáticos (sem estado/efeitos) devem ser Server Components
- Usar TypeScript estrito — sem `any` salvo justificativa documentada
- Nomear componentes em PascalCase, arquivos em PascalCase
- Um componente = um arquivo (exceto sub-componentes tightly coupled)
- Extrair dados estáticos (modalidades, FAQs, depoimentos) em constantes no topo do arquivo ou em arquivos separados quando reutilizados

### Estilização
- Tailwind CSS v4 exclusivamente — sem CSS modules ou styled-components
- Design tokens definidos em `globals.css` via `@theme` — nunca hardcode cores/valores fora dos tokens
- Classes utilitárias inline; extrair para classe customizada apenas quando repetir 3+ vezes
- Mobile-first: escrever estilos base para mobile, adicionar breakpoints progressivamente
- Respeitar `prefers-reduced-motion`: toda animação GSAP deve usar `gsap.matchMedia()` com condição `reduceMotion`
- Foco acessível obrigatório: todo elemento interativo deve ter `focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange`

### Animações
- GSAP + `@gsap/react` (`useGSAP`) para todas as animações complexas
- Registrar plugins (`ScrollTrigger`) no topo do arquivo do componente, fora do render
- Sempre usar `{ scope: ref }` no `useGSAP` para cleanup automático
- Sempre retornar `() => ctx.revert()` ou `() => mm.revert()` no cleanup
- CSS transitions apenas para microinterações simples (hover, focus, toggle)
- Nunca animar propriedades que causam layout thrashing (width, height, top, left) — usar transform/opacity
- `will-change-transform` apenas em elementos animados com GSAP scrub/parallax

### Acessibilidade
- HTML semântico: `<section>` com `aria-label`, `<nav>` com `aria-label`, headings hierárquicos
- Imagens: `alt` descritivo e único; imagens decorativas com `alt=""`
- Botões e links: texto visível ou `aria-label` descritivo
- Contraste WCAG AA mínimo em todas as combinações de cor
- Menu mobile: `aria-expanded`, `aria-controls`, `aria-hidden`, trava de scroll, fecha com ESC
- FAQ: `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`

### Performance
- Imagens: sempre usar `<Image />` do Next.js com `fill` ou dimensões explícitas + `sizes`
- Hero image: `priority={true}`; demais imagens: lazy loading padrão
- Evitar re-renders desnecessários: `useCallback` para callbacks passados a GSAP `onUpdate`
- Code splitting automático via rotas Next.js (futuro)
- Bundle: monitorar tamanho ao adicionar novas dependências

## Regras de Conteúdo

### Tom de Voz
- Direto, motivacional, sem exageros
- Segunda pessoa ("você", "seu objetivo")
- Linguagem acessível mas profissional
- Evitar jargão fitness sem explicação
- Português brasileiro, ortografia vigente

### Dados Reais vs Placeholder
- Todo dado placeholder deve estar marcado com comentário `// Placeholder` ou nota visual
- Depoimentos: substituir por reais com autorização antes do launch
- Endereço: confirmar antes do launch
- Link WhatsApp: inserir número real antes do launch
- Horários: validar com a operação antes do launch
- Fotos: usar fotos reais do espaço/equipe; evitar stock photos genéricas

### SEO
- Metadata por página via `metadata` export do Next.js
- Title: máximo 60 caracteres, incluir cidade
- Description: máximo 155 caracteres, incluir keywords principais
- Open Graph completo para compartilhamento social
- Keywords relevantes: academia Adamantina, musculação, MMT, parkour infantil, treino personalizado
- Headings hierárquicos: um H1 por página, H2 para seções, H3 para subsections

## Regras de Git

- Commits em português, imperativo ("adiciona", "corrige", "remove")
- Convencional: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `chore:`
- Branch naming: `feat/nome-da-feature`, `fix/nome-do-fix`
- PR deve referenciar issue/tarefa correspondente
- Não commitar `.env`, credentials, dados pessoais
- Attribution line obrigatória nos commits (ver AGENTS.md)

## Regras de Deploy

- Preview deploy em toda branch/PR
- Production deploy apenas após aprovação de PR
- Verificar build (`next build`) sem erros/warnings antes de merge
- Testar em mobile real antes de release
- Validar links externos (WhatsApp, Instagram, mapas) em cada deploy

## Regras de Design

- Cores: usar exclusivamente tokens definidos em `@theme`
- Tipografia display (Oswald): títulos, CTAs, labels — sempre uppercase + italic
- Tipografia body (Inter): parágrafos, descrições, textos longos
- Espaçamento consistente: usar escala Tailwind ou tokens customizados (`--spacing-*`)
- Bordas arredondadas: `rounded-xl` para cards, `rounded-2xl` para containers maiores, `rounded-full` para avatares/ícones circulares
- Ícones: SVG inline, stroke-based, tamanho consistente (20px default, 24px para CTAs, 28-32px para cards)