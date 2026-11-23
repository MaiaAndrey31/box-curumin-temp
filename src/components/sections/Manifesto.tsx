"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// DADOS DOS PAINÉIS — Conteúdo aprovado, sem alterações.
// Estrutura separada em headline + body + accent conforme referência visual.
// `headlineHighlights` e `accentHighlights` definem palavras em laranja.
// ============================================
const PANEIS = [
  {
    id: "01",
    label: "NOSSO MANIFESTO",
    headline: "NO BOX CURUMIM,\nCADA REPETIÇÃO É UM\nPASSO EM DIREÇÃO À SUA\nMELHOR VERSÃO.",
    headlineHighlights: ["MELHOR VERSÃO."],
    body: "Não treinamos apenas corpos — construímos\ndisciplina, resiliência e confiança.",
    accent: "AQUI, O MOVIMENTO TRANSFORMA.",
  },
  {
    id: "02",
    label: "DISCIPLINA DIÁRIA",
    headline: "A FORÇA NÃO VEM\nDO QUE VOCÊ PODE FAZER.\nVEM DO QUE VOCÊ\nSUPERA.",
    headlineHighlights: ["SUPERA."],
    body: "Cada dia é uma nova oportunidade de ir além\ndo limite que você aceitou ontem.",
    accent: "SUPERE-SE. TODO. SANTO. DIA.",
  },
  {
    id: "03",
    label: "COMUNIDADE BOX CURUMIM",
    headline: "SOZINHOS SOMOS\nFORTES.\nJUNTOS SOMOS\nIMPARÁVEIS.",
    headlineHighlights: ["IMPARÁVEIS."],
    body: "No Box Curumim, ninguém treina sozinho.\nA comunidade é o combustível da evolução.",
    accent: "VENHA FAZER PARTE.",
  },
] as const;

// ============================================
// HELPER: renderiza texto com palavras destacadas em laranja.
// Cada palavra/parte é envolta em <span> para animação individual via GSAP.
// Preserva quebras de linha (\n) como <br />.
// ============================================
function ManifestoText({
  texto,
  highlights,
  className,
  highlightClass = "text-orange",
}: {
  texto: string;
  highlights: readonly string[];
  className?: string;
  highlightClass?: string;
}) {
  const sorted = [...highlights].sort((a, b) => b.length - a.length);
  const escaped = sorted.map((h) =>
    h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");

  // Split por linhas primeiro para preservar \n
  const lines = texto.split("\n");

  return (
    <p className={className}>
      {lines.map((line, lineIdx) => {
        const parts = line.split(pattern);
        return (
          <span key={lineIdx}>
            {parts.map((part, i) => {
              const isHighlight = sorted.some(
                (h) => h.toLowerCase() === part.toLowerCase()
              );
              return (
                <span
                  key={`${lineIdx}-${i}`}
                  data-manifesto-word
                  className={`inline-block ${
                    isHighlight
                      ? `${highlightClass} drop-shadow-[0_0_12px_rgba(243,107,33,0.5)]`
                      : "text-white"
                  }`}
                >
                  {part}
                </span>
              );
            })}
            {lineIdx < lines.length - 1 && <br />}
          </span>
        );
      })}
    </p>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const progressFillRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // ============================================
        // DESKTOP (>= 768px): pin fixo + transições internas entre painéis
        // A seção fica pinada. Cada painel sai pela esquerda enquanto
        // o próximo entra pela direita, controlado pelo scrub do scroll.
        // Os painéis são position:absolute dentro de um container relativo,
        // NENHUM elemento pai é deslocado horizontalmente.
        // ============================================
        mm.add("(min-width: 768px)", () => {
          if (!sectionRef.current) return;

          const total = PANEIS.length;

          // Estado inicial: painel 0 visível, demais invisíveis e deslocados
          panelsRef.current.forEach((panel, i) => {
            if (!panel) return;
            if (i === 0) {
              gsap.set(panel, { x: 0, opacity: 1, zIndex: 2 });
            } else {
              gsap.set(panel, { x: "80%", opacity: 0, zIndex: 1 });
            }
          });

          // Animação de entrada das palavras do primeiro painel
          const firstWords = panelsRef.current[0]?.querySelectorAll(
            "[data-manifesto-word]"
          );
          if (firstWords && firstWords.length > 0) {
            gsap.fromTo(
              firstWords,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.025,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Timeline principal controlada por scrub
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * (total - 1)}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const rawIndex = self.progress * (total - 1);
                const activeIndex = Math.round(rawIndex);
                dotsRef.current.forEach((dot, i) => {
                  if (dot)
                    dot.dataset.active = i === activeIndex ? "true" : "false";
                });
                if (progressFillRef.current) {
                  gsap.set(progressFillRef.current, { scaleX: self.progress });
                }
              },
            },
          });

          // Para cada transição entre painéis
          for (let i = 0; i < total - 1; i++) {
            const outPanel = panelsRef.current[i];
            const inPanel = panelsRef.current[i + 1];
            if (!outPanel || !inPanel) continue;

            const inWords = inPanel.querySelectorAll("[data-manifesto-word]");

            // Painel atual sai para a esquerda + perde opacidade
            tl.to(
              outPanel,
              {
                x: "-80%",
                opacity: 0,
                zIndex: 1,
                duration: 1,
                ease: "none",
              },
              i
            );

            // Próximo painel entra da direita + ganha opacidade
            tl.to(
              inPanel,
              {
                x: "0%",
                opacity: 1,
                zIndex: 2,
                duration: 1,
                ease: "none",
              },
              i
            );

            // Palavras do próximo painel entram com stagger durante a transição
            if (inWords.length > 0) {
              tl.fromTo(
                inWords,
                { y: 18, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.02,
                  ease: "power2.out",
                },
                i + 0.12
              );
            }
          }
        });

        // ============================================
        // MOBILE (< 768px): vertical stacked com fade-in simples
        // Sem pin, sem transição horizontal.
        // ============================================
        mm.add("(max-width: 767px)", () => {
          const mobilePanels = sectionRef.current?.querySelectorAll(
            "[data-manifesto-panel]"
          );
          if (!mobilePanels || mobilePanels.length === 0) return;

          // Reseta transforms desktop caso matchMedia mude
          mobilePanels.forEach((panel) => {
            gsap.set(panel, { x: 0, opacity: 1, zIndex: 0 });
          });

          gsap.fromTo(
            mobilePanels,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Palavras com stagger no mobile também
          mobilePanels.forEach((panel) => {
            const words = panel.querySelectorAll("[data-manifesto-word]");
            if (words.length > 0) {
              gsap.fromTo(
                words,
                { y: 15, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.4,
                  stagger: 0.015,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: panel,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }
          });

          dotsRef.current.forEach((dot) => {
            if (dot) dot.dataset.active = "true";
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative w-full h-screen bg-black overflow-hidden"
      aria-label="Manifesto Box Curumim Gym"
    >
      {/* ============================================
          CAMADA DE FUNDO — Efeitos CSS cinematográficos
          Iluminação ambiente laranja discreta + geometria sutil
          ============================================ */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        {/* Glow radial principal — canto superior-esquerdo */}
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vh] rounded-full bg-[#F36B21]/[0.06] blur-[100px]" />

        {/* Glow secundário — canto inferior-direito */}
        <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vh] rounded-full bg-[#F36B21]/[0.04] blur-[120px]" />

        {/* Gradiente diagonal sutil para profundidade */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,17,15,0.6)_0%,transparent_40%,transparent_60%,rgba(26,20,17,0.4)_100%)]" />

        {/* Linhas diagonais decorativas muito sutis */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent, transparent 199px, rgba(243,107,33,0.5) 199px, rgba(243,107,33,0.5) 200px)",
          }}
        />
      </div>

      {/* ============================================
          PAINÉIS EMPILHADOS — Todos position:absolute no mesmo container.
          NENHUM elemento pai é movido horizontalmente.
          Apenas cada painel individual recebe translateX via GSAP.
          ============================================ */}
      <div className="absolute inset-0 z-10">
        {PANEIS.map((painel, i) => (
          <article
            key={painel.id}
            ref={(el) => {
              panelsRef.current[i] = el;
            }}
            data-manifesto-panel
            className="absolute inset-0 flex items-center justify-center will-change-transform"
            aria-label={`Manifesto ${painel.id}`}
          >
            {/* Número gigante decorativo — lado direito */}
            <span
              className="absolute right-[-2%] top-[10%] font-display text-[clamp(14rem,30vw,36rem)] font-bold italic leading-[0.85] pointer-events-none select-none max-md:text-[12rem] max-md:right-[-3%] max-md:top-[5%]"
              style={{
                color: "rgba(255,255,255,0.018)",
                textShadow: "0 0 80px rgba(243,107,33,0.08), 1px 0 0 rgba(243,107,33,0.06)",
                WebkitTextStroke: "1px rgba(243,107,33,0.04)",
              }}
              aria-hidden="true"
            >
              {painel.id}
            </span>

            {/* Linha laranja superior-esquerda */}
            <div
              className="absolute top-10 left-10 md:top-14 md:left-16 lg:top-16 lg:left-20 w-12 md:w-16 h-[2px]"
              style={{
                background: "linear-gradient(90deg, #F36B21 0%, rgba(243,107,33,0.2) 100%)",
              }}
              aria-hidden="true"
            />

            {/* Conteúdo — alinhado à esquerda com max-width controlado */}
            <div className="relative z-10 flex flex-col px-6 md:px-16 lg:px-24 max-w-[52rem] w-full mx-auto items-start">
              {/* Label / eyebrow */}
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <span
                  className="w-6 h-[2px] shrink-0"
                  style={{ background: "#F36B21" }}
                  aria-hidden="true"
                />
                <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-gray-light font-medium font-body">
                  {painel.label}
                </p>
              </div>

              {/* Headline — tipografia condensada pesada itálica */}
              <ManifestoText
                texto={painel.headline}
                highlights={painel.headlineHighlights}
                className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold italic leading-[0.92] tracking-[-0.02em] mb-5 md:mb-6"
              />

              {/* Body text — menor, cinza claro, peso regular */}
              <p className="font-body text-[clamp(0.85rem,1.1vw,1.05rem)] font-normal leading-relaxed text-white/70 whitespace-pre-line mb-6 md:mb-8 max-w-[36rem]">
                {painel.body}
              </p>

              {/* Accent phrase + linha decorativa */}
              <div className="flex items-center gap-3">
                <span
                  className="w-8 h-[2px] shrink-0"
                  style={{ background: "#F36B21" }}
                  aria-hidden="true"
                />
                <p className="font-display text-[clamp(0.9rem,1.4vw,1.2rem)] font-bold italic uppercase tracking-[0.06em] text-[#F36B21] drop-shadow-[0_0_10px_rgba(243,107,33,0.4)]">
                  {painel.accent}
                </p>
              </div>
            </div>

            {/* Indicador de painel — canto inferior esquerdo */}
            <div
              className="absolute bottom-8 left-10 md:bottom-10 md:left-16 lg:bottom-12 lg:left-20 flex items-center gap-3"
              aria-hidden="true"
            >
              <span className="font-display text-[#F36B21] text-base md:text-lg font-bold italic">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="w-6 h-px bg-white/20" />
              <span className="font-display text-white/25 text-base md:text-lg font-bold italic">
                03
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* ============================================
          INDICADORES DE PROGRESSO (3 dots centralizados)
          ============================================ */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3 max-md:bottom-6"
        role="list"
        aria-label="Painéis do manifesto"
      >
        {PANEIS.map((painel, i) => (
          <span
            key={painel.id}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
            data-active={i === 0 ? "true" : "false"}
            className="w-2 h-2 rounded-full border transition-all duration-300 data-[active=true]:bg-[#F36B21] data-[active=true]:border-[#F36B21] data-[active=true]:shadow-[0_0_10px_rgba(243,107,33,0.6)] data-[active=true]:scale-125 data-[active=false]:bg-transparent data-[active=false]:border-white/30"
            role="listitem"
            aria-label={`Painel ${painel.id}`}
          />
        ))}
      </div>

      {/* Barra de progresso inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-20 bg-white/[0.05]"
        aria-hidden="true"
      >
        <span
          ref={progressFillRef}
          className="block h-full bg-[#F36B21] origin-left scale-x-0 shadow-[0_0_10px_rgba(243,107,33,0.5)]"
        />
      </div>

      {/* Gradiente de saída suave para a próxima seção */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent z-20"
        aria-hidden="true"
      />
    </section>
  );
}