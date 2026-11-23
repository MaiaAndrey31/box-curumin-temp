# PRD — Box Curumim Gym

## Visão Geral

O Box Curumim Gym é um site institucional para uma academia localizada em Adamantina - SP, focada em musculação, MMT (Mixed Modalities Training) e parkour infantil. O site atual funciona como uma landing page única com navegação por âncoras, projetada para converter visitantes em leads via WhatsApp e agendamento de aula experimental.

## Problema que Resolve

- **Presença digital**: A academia precisa de um ponto de contato online profissional que transmita credibilidade e diferenciação competitiva no mercado local.
- **Conversão de leads**: Canalizar interessados para WhatsApp/agendamento sem atrito, eliminando a dependência exclusiva de redes sociais.
- **Comunicação de valor**: Explicar claramente as três modalidades (Musculação, MMT, Parkour Infantil) e a metodologia diferenciada para públicos distintos (adultos, atletas, pais).
- **Informações operacionais**: Centralizar horários, localização e FAQ para reduzir perguntas repetitivas no atendimento direto.

## Usuário-Alvo

| Persona | Descrição | Necessidade Principal |
|---------|-----------|----------------------|
| Adulto iniciante | 25-45 anos, busca saúde/qualidade de vida, nunca treinou ou está retornando | Sentir-se acolhido, entender que não precisa de experiência prévia |
| Atleta/Intermediário | Já treina, busca performance e acompanhamento profissional | Ver estrutura, metodologia e diferenciais técnicos |
| Pai/Mãe | Busca atividade física segura e divertida para filhos (7+ anos) | Confiança na segurança, coordenação e ambiente adequado |
| Morador local | Adamantina e região, compara academias | Localização, horários, preço (ainda não exposto), prova social |

## Recursos Atuais (Estado do Site)

### Funcionalidades Implementadas
- Landing page single-page com 8 seções (Hero, Manifesto, Modalidades, Metodologia, Estrutura, Comunidade, FAQ, Contato)
- Header fixo com navegação por âncoras e indicador de seção ativa
- Menu mobile fullscreen com animações de entrada escalonadas
- Animações GSAP com ScrollTrigger (parallax, stagger reveals, scrub)
- Design responsivo com breakpoints mobile/tablet/desktop
- CTA principal "Agende sua Experiência" direcionando para seção de contato
- Link WhatsApp (placeholder — URL incompleta)
- Depoimentos placeholder (não reais)
- Endereço parcial ("Adamantina - SP" com nota "a confirmar")
- Footer com copyright 2024

### Lacunas Identificadas
- ❌ Sem sistema de agendamento real (apenas link WhatsApp genérico)
- ❌ Sem página de planos/preços
- ❌ Sem blog ou conteúdo educativo
- ❌ Sem área de membros/alunos
- ❌ Sem integração com app de agendamento mencionado no FAQ
- ❌ Depoimentos fictícios (placeholder)
- ❌ Endereço incompleto
- ❌ Link WhatsApp sem número (`https://wa.me/`)
- ❌ Sem formulário de contato (apenas redirecionamento externo)
- ❌ Sem mapa embedado
- ❌ Copyright desatualizado (2024)
- ❌ Sem páginas individuais por modalidade
- ❌ Sem galeria de fotos completa da estrutura
- ❌ Sem equipe/profissionais apresentados

## Recursos Planejados (Recomendados)

### Prioridade Alta
1. Completar link WhatsApp com número real
2. Substituir depoimentos por reais (com autorização)
3. Confirmar e exibir endereço completo com mapa
4. Adicionar seção de planos/preços
5. Criar formulário de contato nativo (fallback ao WhatsApp)
6. Atualizar copyright para ano corrente

### Prioridade Média
7. Páginas individuais por modalidade (SEO + profundidade)
8. Seção de equipe/profissionais com fotos e bios
9. Galeria expandida da estrutura
10. Integração com sistema de agendamento (se existente)

### Prioridade Baixa
11. Blog/conteúdo educativo sobre treino e saúde
12. Área de membros (resultados, prescrições)
13. Vídeos das aulas/modalidades
14. Programa de indicação/descontos

## Métricas de Sucesso

| Métrica | Meta | Como Medir |
|---------|------|------------|
| Taxa de conversão (CTA → WhatsApp) | >5% dos visitantes | UTM tracking + contagem de cliques |
| Tempo médio na página | >45s | Analytics |
| Taxa de rejeição | <60% | Analytics |
| Perguntas repetitivas no WhatsApp | Redução de 30% | Feedback da recepção |
| Agendamentos via site | >20/mês | Controle manual ou integração futura |

## Não-Objetivos (Escopo Excluído)

- E-commerce (venda de produtos/suplementos)
- Plataforma de treino online (app separado)
- Sistema de pagamento integrado
- Rede social interna
- App mobile nativo (neste momento)