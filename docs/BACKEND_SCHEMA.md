# Esquema do Backend — Box Curumim Gym

## Estado Atual

### Sem Backend
O projeto é **puramente frontend** (static site). Não há banco de dados, API routes, ou server-side data fetching. Todos os dados são constantes hardcoded nos componentes React.

```
Dados Estáticos (Hardcoded)
├── NAV_LINKS → Header.tsx
├── modalities → Hero.tsx
├── MODALIDADES → Modalidades.tsx
├── MANIFESTO_TEXT → Manifesto.tsx
├── DIFERENCIAIS → Metodologia.tsx
├── CARDS → Estrutura.tsx
├── DEPOIMENTOS → Comunidade.tsx
├── PERGUNTAS → FAQ.tsx
└── Contact Info → Contato.tsx
```

## Esquema Futuro Recomendado

Quando o projeto evoluir além de dados estáticos, esta é a estrutura de dados sugerida.

### Modelo de Dados

#### Modalidade
```typescript
interface Modalidade {
  id: string;           // slug: "musculacao" | "mmt" | "parkour"
  titulo: string;       // "Musculação"
  slug: string;         // URL-friendly identifier
  descricaoCurta: string; // Card summary (max 100 chars)
  descricaoLonga: string; // Página detalhada (markdown/rich text)
  icone: string;        // Icon identifier or SVG path
  imagemPrincipal: string; // URL/path da imagem hero da modalidade
  imagensGaleria: string[]; // URLs das fotos da galeria
  faixaEtaria: string;  // "Adultos" | "7+ anos" | "Todas as idades"
  beneficios: string[]; // Lista de benefícios
  ativo: boolean;       // Visível no site
  ordem: number;        // Ordenação na listagem
}
```

#### Profissional
```typescript
interface Profissional {
  id: string;
  nome: string;
  cargo: string;        // "Professor de Musculação" | "Coach MMT" | "Instrutor Parkour"
  bio: string;          // Mini biografia (max 300 chars)
  foto: string;         // URL/path da foto
  especialidades: string[]; // Tags de especialidade
  modalidades: string[]; // IDs das modalidades que leciona
  instagram?: string;   // Handle opcional
  ativo: boolean;
  ordem: number;
}
```

#### Depoimento
```typescript
interface Depoimento {
  id: string;
  nome: string;         // Nome real ou primeiro nome + inicial
  modalidadeId: string; // Referência à modalidade
  texto: string;        // Depoimento completo (max 500 chars)
  foto?: string;        // Foto opcional do aluno
  resultado?: string;   // Resultado mensurável opcional ("Perdi 15kg em 6 meses")
  autorizado: boolean;  // Autorização de uso de imagem/nome
  dataColeta: Date;     // Quando foi coletado
  ativo: boolean;
  ordem: number;
}
```

#### Plano
```typescript
interface Plano {
  id: string;
  nome: string;         // "Mensal" | "Trimestral" | "Anual" | "Family"
  preco: number;        // Valor em centavos ou decimal
  periodo: string;      // "mês" | "trimestre" | "ano"
  desconto?: number;    // Percentual de desconto vs mensal
  beneficios: string[]; // O que está incluído
  destaque: boolean;    // Badge "Mais Popular" / "Melhor Custo-Benefício"
  ctaTexto: string;     // Texto do botão ("Começar Agora" | "Falar com Consultor")
  ctaLink: string;      // URL destino (WhatsApp, formulário, checkout)
  ativo: boolean;
  ordem: number;
}
```

#### FAQ
```typescript
interface FAQ {
  id: string;
  pergunta: string;
  resposta: string;     // Pode conter markdown simples
  categoria: string;    // "geral" | "planos" | "modalidades" | "agendamento"
  ativo: boolean;
  ordem: number;
}
```

#### HorarioFuncionamento
```typescript
interface HorarioFuncionamento {
  diaSemana: number;    // 0=Domingo, 1=Segunda, ..., 6=Sábado
  abre: string;         // "06:00"
  fecha: string;        // "22:00"
  fechado: boolean;     // true se não abre neste dia
  observacao?: string;  // "Feriados: horário especial"
}
```

#### ConfiguracaoSite
```typescript
interface ConfiguracaoSite {
  whatsappNumero: string;     // "5518999999999"
  whatsappMensagem: string;   // Mensagem pré-preenchida
  instagramUrl: string;
  enderecoCompleto: string;
  enderecoMapaEmbed: string;  // Google Maps iframe src
  emailContato?: string;
  googleAnalyticsId?: string;
  metaPixelId?: string;
  avisoLegal?: string;        // Disclaimer rodapé
}
```

### Relacionamentos

```
Modalidade 1──N Profissional
Modalidade 1──N Depoimento
Plano N──N Modalidade (um plano pode dar acesso a múltiplas modalidades)
FAQ N──1 Categoria
```

### Opções de Armazenamento

#### Opção A: MDX Files (Recomendada para MVP)
```
content/
├── modalidades/
│   ├── musculacao.mdx
│   ├── mmt.mdx
│   └── parkour.mdx
├── profissionais/
│   ├── joao-silva.mdx
│   └── maria-santos.mdx
├── depoimentos/
│   ├── aluno-a.mdx
│   └── aluna-b.mdx
├── planos/
│   ├── mensal.mdx
│   ├── trimestral.mdx
│   └── anual.mdx
├── faq/
│   └── perguntas.mdx
└── config.json
```
- **Vantagens**: Zero infra, versionado no git, editável por devs, build-time rendering
- **Desvantagens**: Requer PR para atualizar, não não-devs editar
- **Quando usar**: Conteúdo muda raramente (< 1x/mês), equipe técnica gerencia

#### Opção B: Headless CMS (Sanity / Contentful)
- **Vantagens**: Interface visual para não-devs, preview em tempo real, image CDN, structured content
- **Desvantagens**: Custo adicional, dependência externa, complexidade de setup
- **Quando usar**: Conteúdo muda frequentemente (> 2x/mês), equipe não-técnica precisa editar

#### Opção C: Supabase / PostgreSQL
- **Vantagens**: Full backend, auth, realtime, relational queries
- **Desvantagens**: Overkill para site institucional, custo operacional
- **Quando usar**: Área de membros, app de agendamento próprio, dados dinâmicos complexos

### API Routes (Next.js App Router)

Se migrar para dados dinâmicos:

```
app/api/
├── modalidades/
│   └── route.ts        GET → listar todas
├── modalidades/[slug]/
│   └── route.ts        GET → detalhe por slug
├── contato/
│   └── route.ts        POST → enviar formulário (validar + forward email)
└── agendamento/
    └── route.ts        POST → criar agendamento (integração externa)
```

### Migração de Dados Estáticos → Dinâmicos

Passos para transição gradual:

1. Extrair constantes atuais para arquivos JSON/MDX separados
2. Criar funções `getModalidades()`, `getFAQ()`, etc. que leem desses arquivos
3. Componentes passam a chamar essas funções (server components)
4. Quando pronto, trocar fonte de arquivo para CMS/API sem mudar componentes
5. Adicionar cache/revalidation strategy conforme necessário

## Segurança (Quando Backend Existir)

- Validar todo input no server (zod schemas)
- Rate limiting em formulários e endpoints públicos
- Sanitizar conteúdo rich text/markdown antes de renderizar
- Environment variables para secrets (nunca commitar)
- CORS configurado corretamente se API for consumida externamente
- HTTPS obrigatório em produção