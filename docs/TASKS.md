# TASKS — Plano de Implementação

## Fase 0: Correções Críticas (Antes do Launch)
> Tempo estimado: 2-4 horas

- [ ] **0.1** Completar link WhatsApp com número real em `Contato.tsx` e `Hero.tsx`
  - Arquivo: `src/components/sections/Contato.tsx:91`
  - De: `https://wa.me/`
  - Para: `https://wa.me/55XXXXXXXXXXX?text=MensagemPréDefinida`

- [ ] **0.2** Confirmar e atualizar endereço completo
  - Arquivo: `src/components/sections/Contato.tsx:110`
  - Remover nota "* Endereço completo a confirmar"

- [ ] **0.3** Substituir depoimentos placeholder por reais
  - Arquivo: `src/components/sections/Comunidade.tsx:12-31`
  - Obter autorização por escrito dos alunos
  - Incluir nome real (ou primeiro nome + inicial), modalidade, depoimento autêntico

- [ ] **0.4** Atualizar copyright para ano corrente
  - Arquivo: `src/components/sections/Contato.tsx:173`
  - De: `© 2024`
  - Para: `© 2025` (ou dinâmico via `new Date().getFullYear()`)

- [ ] **0.5** Validar horários de funcionamento
  - Arquivo: `src/components/sections/Contato.tsx:131-133`
  - Confirmar com a operação da academia

- [ ] **0.6** Converter imagens PNG para WebP
  - Arquivos: `public/assets/bannerHome.png`, `SecondaryBanner.png`, `Fachada.png`
  - Ferramenta: `sharp`, `squoosh.app`, ou `next/image` built-in optimization
  - Atualizar referências nos componentes

---

## Fase 1: Melhorias de Conversão
> Tempo estimado: 1-2 dias

- [ ] **1.1** Adicionar seção de Planos/Preços
  - Nova section entre Comunidade e FAQ
  - 3-4 cards com nome, preço, benefícios, CTA
  - Destaque visual no plano recomendado
  - CTA direciona para WhatsApp ou formulário

- [ ] **1.2** Implementar formulário de contato nativo
  - Fallback ao WhatsApp para quem prefere não sair do site
  - Campos: Nome, Telefone, Modalidade de interesse, Mensagem
  - Validação client-side + server-side
  - Integração: Formspree, EmailJS, ou API route Next.js → email
  - Loading state + feedback de sucesso/erro

- [ ] **1.3** Embed mapa do Google Maps
  - Na seção Contato, coluna direita
  - iframe responsivo com endereço confirmado
  - Lazy load para performance

- [ ] **1.4** Adicionar seção Equipe/Profissionais
  - Fotos reais dos professores/coaches
  - Nome, cargo, especialidades, mini bio
  - Humaniza a marca e gera confiança
  - Entre Metodologia e Estrutura

- [ ] **1.5** Implementar tracking de conversão
  - Google Analytics 4 setup
  - Event tracking nos CTAs (clique WhatsApp, clique Agendar)
  - Meta Pixel (se usar ads no Instagram/Facebook)
  - UTM parameters nos links externos

---

## Fase 1.5: Reconstrução da Seção Manifesto
> Tempo estimado: 4-6 horas | Status: REFORMULADO (validação visual pendente)

- [x] **1.5.1** Reconstruir Manifesto.tsx do zero com experiência horizontal
    - ✅ Código implementado: pin + scrub desktop/tablet, vertical mobile
    - ✅ Build production: zero erros TypeScript
    - ⏳ Validação visual em browser: pendente de confirmação manual
    - Arquivo: `src/components/sections/Manifesto.tsx`
    - Decisão técnica registrada em `docs/MEMORY.md`

- [x] **1.5.2** Refinamento visual e animação — pin fixo + transições internas
    - ✅ Nova abordagem: seção fixa na viewport, painéis empilhados com transição interna (saída esquerda / entrada direita)
    - ✅ Palavras animadas individualmente com stagger via GSAP scrub
    - ✅ Efeitos CSS cinematográficos: radial-gradient, blur, text-shadow, linhas decorativas com gradiente
    - ✅ Conteúdo aprovado mantido sem alterações (3 painéis com destaques em laranja)
    - ✅ Mobile: layout vertical stacked com fade-in e stagger de palavras
    - ✅ Build production: zero erros TypeScript, zero warnings
    - ⏳ Validação visual em browser: pendente de confirmação manual
    - Arquivo: `src/components/sections/Manifesto.tsx`
    - Decisão técnica registrada em `docs/MEMORY.md`

- [x] **1.5.3** Correção crítica de composição e comportamento
    - ✅ Corrigido container pai dos painéis: agora `absolute inset-0` garante que nenhum elemento pai seja deslocado horizontalmente
    - ✅ Tipografia refinada: headline `clamp(2.2rem,4.5vw,4.2rem)`, body separado com hierarquia clara, accent com glow
    - ✅ Laranja corrigido para `#F36B21` (vivo) em todos os elementos, substituindo token Tailwind para consistência
    - ✅ Estrutura de conteúdo separada: headline + body + accent como blocos distintos conforme referência visual
    - ✅ Quebras de linha intencionais via `\n` para controle editorial da composição
    - ✅ Iluminação CSS aprimorada: dois glows radiais + gradiente diagonal + linhas diagonais sutis
    - ✅ Número gigante com `WebkitTextStroke` e `textShadow` duplo para profundidade
    - ✅ Build production: zero erros TypeScript, zero warnings
    - ⏳ Validação visual em browser: pendente de confirmação manual
    - Arquivo: `src/components/sections/Manifesto.tsx`
    - Decisão técnica registrada em `docs/MEMORY.md`

---

## Fase 2: Expansão de Conteúdo & SEO
> Tempo estimado: 2-3 dias

- [ ] **2.1** Criar páginas individuais por modalidade
  - `/modalidades/musculacao`
  - `/modalidades/mmt`
  - `/modalidades/parkour`
  - Conteúdo expandido: descrição detalhada, benefícios, para quem é, horários, fotos específicas
  - Internal linking da landing page para as páginas dedicadas

- [ ] **2.2** Criar página Sobre/História
  - `/sobre`
  - História da academia, missão, valores
  - Fotos do espaço em diferentes momentos
  - Linha do tempo (fundação, expansões, marcos)

- [ ] **2.3** Expandir galeria da estrutura
  - Mais fotos reais do espaço (equipamentos, áreas específicas, vestiários, estacionamento)
  - Lightbox/modal para visualização ampliada
  - Categorias filtráveis (opcional)

- [ ] **2.4** Adicionar schema markup (JSON-LD)
  - LocalBusiness schema com endereço, horários, telefone
  - FAQPage schema para perguntas frequentes
  - Course schema para modalidades (opcional)
  - Melhora rich snippets no Google

- [ ] **2.5** Blog/Conteúdo educativo (opcional)
  - `/blog` listing page
  - `/blog/[slug]` article pages
  - Temas: dicas de treino, nutrição, benefícios do exercício, segurança no parkour infantil
  - SEO long-tail keywords

---

## Fase 3: Funcionalidades Avançadas
> Tempo estimado: 1-2 semanas

- [ ] **3.1** Integração com sistema de agendamento
  - Calendly, Acuity Scheduling, ou app próprio da academia
  - Embed widget ou redirect para plataforma externa
  - Reduz atrito vs WhatsApp-only

- [ ] **3.2** Área de membros (futuro)
  - `/login` autenticação
  - Dashboard com prescrições de treino, histórico, resultados
  - Agendamento de aulas
  - Notificações de mudanças de horário
  - Stack: NextAuth.js + Supabase/PostgreSQL

- [ ] **3.3** Vídeos das modalidades
  - Curtos (15-30s) loops ou clips
  - Autoplay muted no Hero (alternativa à imagem estática)
  - Seções dedicadas com vídeos explicativos
  - Hospedagem: YouTube embed ou Cloudflare Stream (evitar self-host)

- [ ] **3.4** Programa de indicação
  - Link único por aluno
  - Desconto para indicado e indicador
  - Tracking via cookies/UTM + backend simples

---

## Priorização Matriz

| Tarefa | Impacto | Esforço | Prioridade |
|--------|---------|---------|------------|
| 0.1 WhatsApp link |  Alto | Baixo | IMEDIATA |
| 0.2 Endereço | Alto | Baixo | IMEDIATA |
| 0.3 Depoimentos reais | Alto | Médio | IMEDIATA |
| 0.4 Copyright | Médio | Baixo | IMEDIATA |
| 0.5 Horários | Alto | Baixo | IMEDIATA |
| 0.6 WebP images | Médio | Médio | Alta |
| 1.1 Planos/Preços | Alto | Médio | Alta |
| 1.2 Formulário | Alto | Médio | Alta |
| 1.3 Mapa | Médio | Baixo | Alta |
| 1.4 Equipe | Médio | Médio | Média |
| 1.5 Analytics | Alto | Baixo | Alta |
| 2.1 Páginas modalidade | Médio | Alto | Média |
| 2.2 Sobre | Médio | Médio | Média |
| 2.3 Galeria expandida | Médio | Médio | Média |
| 2.4 Schema markup | Médio | Baixo | Média |
| 2.5 Blog | Baixo | Alto | Baixa |
| 3.1 Agendamento | Alto | Alto | Média |
| 3.2 Área membros | Médio | Alto | Baixa |
| 3.3 Vídeos | Médio | Médio | Baixa |
| 3.4 Indicação | Baixo | Médio | Baixa |

## Checklist de Launch

- [ ] Todos os itens da Fase 0 completos
- [ ] Build production sem erros/warnings (`npm run build`)
- [ ] Testado em mobile real (iOS Safari + Android Chrome)
- [ ] Links externos funcionam (WhatsApp, Instagram, mapa)
- [ ] Performance audit (Lighthouse > 90 em Performance, Accessibility, SEO)
- [ ] Analytics configurado e testado
- [ ] OG tags testadas (LinkedIn/Facebook debugger)
- [ ] Robots.txt e sitemap.xml configurados
- [ ] SSL certificado ativo
- [ ] Domínio apontado e DNS propagado
- [ ] Backup/version tag criada antes do deploy