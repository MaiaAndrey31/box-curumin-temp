# MEMORY — Registro de Auditoria e Decisões

## Data da Auditoria
2025-11-18

## Contexto
Auditoria completa realizada antes de qualquer desenvolvimento adicional. Objetivo: documentar estado atual, identificar lacunas, e criar base de referência para futuras implementações.

## Estado do Projeto na Auditoria

### Stack Confirmada
- Next.js 16.4.6 (App Router, Turbopack)
- React 19.3.0
- Tailwind CSS 4.3.3 (@theme tokens)
- GSAP 3.15.1 + @gsap/react 2.1.2
- TypeScript 5.x
- Sem backend, sem banco de dados, sem CMS

### Estrutura de Arquivos
- 1 página (`page.tsx`) com 8 seções
- 1 layout (`layout.tsx`) com Header global
- 8 componentes de seção (todos client-side)
- 2 componentes UI reutilizáveis (Button, SectionHeading)
- 4 assets em `/public/assets/` (1 WebP, 3 PNG)

### Qualidade do Código
- ✅ TypeScript estrito, sem `any`
- ✅ Componentes bem documentados com comentários
- ✅ GSAP lifecycle correto (scope, cleanup, matchMedia)
- ✅ Acessibilidade: aria attributes, focus rings, reduced motion
- ✅ Responsive design com breakpoints consistentes
- ✅ Semantic HTML em todas as seções
- ⚠️ Alguns componentes grandes (>300 linhas): Hero.tsx (530), Estrutura.tsx (346), Header.tsx (313)
- ⚠️ Dados hardcoded espalhados (sem centralização)
- ⚠️ Imagens em PNG (não otimizadas)

### Problemas Identificados

#### Críticos (Bloqueiam Launch)
1. Link WhatsApp vazio (`https://wa.me/` sem número)
2. Endereço incompleto ("a confirmar")
3. Depoimentos fictícios (placeholder)
4. Copyright desatualizado (2024)

#### Importantes (Impactam Conversão)
5. Sem seção de preços/planos
6. Sem formulário de contato nativo
7. Sem mapa de localização
8. Sem seção de equipe/profissionais
9. Sem analytics/tracking

#### Técnicos (Performance/Manutenção)
10. Imagens PNG não otimizadas (impacto LCP)
11. Dados hardcoded em múltiplos arquivos (dificulta atualização)
12. Sem code splitting (tudo em uma página)
13. Sem error boundary ou loading states

## Decisões Documentadas

### Por que Single-Page?
Escolha deliberada para MVP. Academia local com foco em conversão direta. Landing page única reduz complexidade e tempo de desenvolvimento. Migrar para multi-page quando conteúdo crescer ou SEO exigir páginas dedicadas.

### Por que GSAP?
Animações de scrub/parallax/timeline não são viáveis com CSS puro. GSAP oferece controle preciso, cross-browser consistency, e integração segura com React via `@gsap/react`. Bundle size (~30KB gzipped) é trade-off aceitável para experiência premium.

### Por que Tailwind v4 @theme?
Elimina necessidade de `tailwind.config.ts`. Tokens definidos em CSS nativo integram melhor com Turbopack HMR. Mais próximo de CSS padrão, menos abstração.

### Por que sem backend?
Site institucional não precisa de backend para MVP. Dados estáticos são suficientes para launch. Backend adiciona complexidade, custo e manutenção desnecessários nesta fase. Integrar serviços externos (Formspree, Calendly) quando funcionalidade dinâmica for necessária.

## Próximos Passos Imediatos
Ver `TASKS.md` Fase 0 para lista detalhada. Resumo:
1. Completar dados reais (WhatsApp, endereço, depoimentos, horários)
2. Otimizar imagens (PNG → WebP)
3. Atualizar copyright
4. Configurar analytics
5. Deploy em staging para validação

## Decisão Técnica — Manifesto Horizontal (2025-11-18)

### Implementação Inicial (substituída)
Seção Manifesto originalmente construída com track horizontal de 300vw deslocado via GSAP scrub. Abordagem substituída em refinamento posterior.

---

## Refinamento Visual e Animação — Manifesto (2025-11-18)

### Correção Crítica de Comportamento (Refinamento Final)
Identificado e corrigido problema onde o container pai dos painéis não estava posicionado absolutamente no desktop, causando deslocamento lateral da seção inteira. A nova implementação garante que **apenas os painéis individuais** sejam movidos via GSAP, mantendo a seção fixa na viewport.

### Arquitetura Final da Animação
- **Container**: `<div className="absolute inset-0 z-10">` envolve todos os painéis. Nenhum elemento pai recebe translateX.
- **Painéis**: Todos com `position: absolute; inset: 0`. Transições individuais via `x: "-80%"` (saída) e `x: "80%"` → `"0%"` (entrada).
- **Timeline**: GSAP timeline única com `pin: true` + `scrub: 0.8`. Progresso dividido em `(total - 1)` segmentos iguais.
- **Palavras**: Stagger individual (`0.02s`) sincronizado à transição de cada painel, com deslocamento vertical sutil (`y: 18px`).
- **Mobile**: Vertical stacked sem pin, fade-in simples com stagger de palavras.

### Tipografia Refinada
- Headline: `clamp(2.2rem, 4.5vw, 4.2rem)` — reduzido para evitar dominância excessiva.
- Body: `clamp(0.85rem, 1.1vw, 1.05rem)` — hierarquia clara, cor `white/70`.
- Accent: `clamp(0.9rem, 1.4vw, 1.2rem)` — laranja vivo `#F36B21` com glow.
- Quebras de linha intencionais via `\n` no conteúdo para controle editorial.
- Max-width do bloco de texto: `max-w-[52rem]` para respirar.

### Cores e Iluminação Corrigidas
- Laranja principal: `#F36B21` (vivo, não marrom). Usado explicitamente em vez de token Tailwind para garantir consistência.
- Glow radial: Dois pontos de luz (`top-left` e `bottom-right`) com `blur-[100px]` e `blur-[120px]`, opacidade 6% e 4%.
- Gradiente diagonal sutil para profundidade cinematográfica.
- Linhas diagonais decorativas em laranja com opacidade 3%.
- Número gigante com `WebkitTextStroke` laranja sutil e `textShadow` duplo.
- Texto branco puro (`text-white`) sem opacidade reduzida.

### Conteúdo dos Painéis (estrutura separada)
- Headline com destaques em laranja (ex: "MELHOR VERSÃO.", "SUPERA.", "IMPARÁVEIS.")
- Body text separado em parágrafo menor, cinza claro.
- Accent phrase com linha decorativa laranja à esquerda.
- Label/eyebrow com linha laranja + texto uppercase tracking-wide.

### Arquivo Modificado
- `src/components/sections/Manifesto.tsx` — reescrito completamente com arquitetura corrigida

### Validação
- Build production: ✅ zero erros TypeScript, zero warnings
- Visual: pendente de validação manual em browser

## Notas para Futuras Sessões de IA
- Ler este documento + RULES.md antes de implementar qualquer feature
- Respeitar design tokens em `globals.css` — nunca hardcode cores
- Todo componente com animação deve respeitar `prefers-reduced-motion`
- Dados reais devem substituir placeholders antes de qualquer nova feature
- Considerar extração de dados para MDX/CMS quando conteúdo crescer
- Performance budget: manter LCP < 2.5s, bundle JS < 200KB gzipped
- Manifesto horizontal usa pin + scrub; cuidado ao adicionar novas animações na mesma região de scroll para evitar conflitos de ScrollTrigger