"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// DADOS DOS PAINÉIS
// ============================================
const PANEIS = [
  {
    id: "01",
    label: "NOSSO MANIFESTO",
    headline: "NO BOX CURUMIM,\nCADA REPETIÇÃO É UM\nPASSO EM DIREÇÃO À SUA\nMELHOR VERSÃO.",
    headlineHighlights: ["MELHOR VERSÃO."],
    body: "Não treinamos apenas corpos — construímos\ndisciplina, resiliência e confiança.",
    accent: "AQUI, O MOVIMENTO TRANSFORMA.",
    image: "/assets/manifesto-1.webp",
    mobileImage: "/assets/manifesto-mobile1.webp",
  },
  {
    id: "02",
    label: "DISCIPLINA DIÁRIA",
    headline: "A FORÇA NÃO VEM\nDO QUE VOCÊ PODE FAZER.\nVEM DO QUE VOCÊ\nSUPERA.",
    headlineHighlights: ["SUPERA."],
    body: "Cada dia é uma nova oportunidade de ir além\ndo limite que você aceitou ontem.",
    accent: "SUPERE-SE. TODO. SANTO. DIA.",
    image: "/assets/manifesto-2.webp",
    mobileImage: "/assets/manifesto-mobile2.webp",
  },
  {
    id: "03",
    label: "COMUNIDADE BOX CURUMIM",
    headline: "SOZINHOS SOMOS\nFORTES.\nJUNTOS SOMOS\nIMPARÁVEIS.",
    headlineHighlights: ["IMPARÁVEIS."],
    body: "No Box Curumim, ninguém treina sozinho.\nA comunidade é o combustível da evolução.",
    accent: "VENHA FAZER PARTE.",
    image: "/assets/manifesto-3.webp",
    mobileImage: "/assets/manifesto-mobile3.webp",
  },
] as const;

// ============================================
// HELPER: renderiza texto com palavras destacadas em laranja.
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
  // Refs separadas para desktop e mobile para evitar conflitos
  const desktopSectionRef = useRef<HTMLElement>(null);
  const mobileSectionRef = useRef<HTMLElement>(null);
  const desktopPanelsRef = useRef<(HTMLElement | null)[]>([]);
  const mobilePanelsRef = useRef<(HTMLElement | null)[]>([]);
  const desktopDotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const desktopProgressRef = useRef<HTMLSpanElement>(null);

  // ============================================
  // DESKTOP ANIMATION
  // ============================================
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        if (!desktopSectionRef.current) return;

        const total = PANEIS.length;

        // Estado inicial: primeiro painel visível, outros invisíveis
        desktopPanelsRef.current.forEach((panel, i) => {
          if (!panel) return;

          if (i === 0) {
            gsap.set(panel, { opacity: 1, scale: 1, zIndex: 2 });
          } else {
            gsap.set(panel, { opacity: 0, scale: 1.03, zIndex: 1 });
          }
        });

        // Animação de entrada das palavras do primeiro painel
        const firstWords = desktopPanelsRef.current[0]?.querySelectorAll(
          "[data-manifesto-word]"
        );

        if (firstWords && firstWords.length > 0) {
          gsap.fromTo(
            firstWords,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.025,
              ease: "power3.out",
              scrollTrigger: {
                trigger: desktopSectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Timeline principal com scrub cinematográfico
        // AJUSTE: multiplicador da distância de scroll entre slides (atual: 3.0)
        // Aumente para mais lento/longo, diminua para mais rápido
        const SCROLL_DISTANCE_MULTIPLIER = 3.0;

        // AJUSTE: suavidade do scrub em segundos (atual: 2.0)
        // Maior = mais suave/lento, menor = mais direto/rápido
        const SCRUB_SMOOTHNESS = 2.0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: desktopSectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * SCROLL_DISTANCE_MULTIPLIER * (total - 1)}`,
            pin: true,
            scrub: SCRUB_SMOOTHNESS,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              const rawIndex = self.progress * (total - 1);
              const activeIndex = Math.round(rawIndex);

              desktopDotsRef.current.forEach((dot, i) => {
                if (dot) {
                  dot.dataset.active =
                    i === activeIndex ? "true" : "false";
                }
              });

              if (desktopProgressRef.current) {
                gsap.set(desktopProgressRef.current, {
                  scaleX: self.progress,
                });
              }
            },
          },
        });

        // AJUSTE: escala do painel que sai (atual: 0.99). Mais próximo de 1 = menos movimento
        const OUT_SCALE = 0.99;
        // AJUSTE: escala inicial do painel que entra (atual: 1.01). Mais próximo de 1 = menos movimento
        const IN_SCALE_START = 1.01;
        // AJUSTE: deslocamento Y das palavras ao sair (atual: -5). Menor = mais sutil
        const OUT_WORDS_Y = -5;
        // AJUSTE: deslocamento Y das palavras ao entrar (atual: 8). Menor = mais sutil
        const IN_WORDS_Y = 8;

        // Transições entre painéis usando camadas sobrepostas com fade + scale sutil
        for (let i = 0; i < total - 1; i++) {
          const outPanel = desktopPanelsRef.current[i];
          const inPanel = desktopPanelsRef.current[i + 1];

          if (!outPanel || !inPanel) continue;

          const outWords = outPanel.querySelectorAll("[data-manifesto-word]");
          const inWords = inPanel.querySelectorAll("[data-manifesto-word]");

          // Transição sincronizada: imagem e palavras se movem juntas
          // Painel atual: fade out + zoom + palavras saindo simultaneamente
          tl.to(
            outPanel,
            {
              opacity: 0,
              scale: OUT_SCALE,
              zIndex: 1,
              duration: 1,
              ease: "none",
            },
            i
          );

          if (outWords.length > 0) {
            tl.to(
              outWords,
              {
                y: OUT_WORDS_Y,
                opacity: 0,
                duration: 1,
                stagger: 0.006,
                ease: "none",
              },
              i
            );
          }

          // Próximo painel: fade in + zoom + palavras entrando simultaneamente
          gsap.set(inPanel, { scale: IN_SCALE_START });
          tl.to(
            inPanel,
            {
              opacity: 1,
              scale: 1,
              zIndex: 2,
              duration: 1,
              ease: "none",
            },
            i
          );

          if (inWords.length > 0) {
            tl.fromTo(
              inWords,
              { y: IN_WORDS_Y, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.015,
                ease: "none",
              },
              i
            );
          }
        }
      }, desktopSectionRef);

      return () => ctx.revert();
    },
    { scope: desktopSectionRef }
  );

  // ============================================
  // MOBILE ANIMATION
  // Pin estável com scrub controlado, sem conflitos de refs
  // ============================================
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        if (!mobileSectionRef.current) return;

        const total = PANEIS.length;

        // Estado inicial
        mobilePanelsRef.current.forEach((panel, i) => {
          if (!panel) return;

          if (i === 0) {
            gsap.set(panel, { opacity: 1, zIndex: 2 });
          } else {
            gsap.set(panel, { opacity: 0, zIndex: 1 });
          }
        });

        // Animação de entrada das palavras do primeiro painel
        const firstWords = mobilePanelsRef.current[0]?.querySelectorAll(
          "[data-manifesto-word]"
        );

        if (firstWords && firstWords.length > 0) {
          gsap.fromTo(
            firstWords,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.02,
              ease: "power2.out",
              scrollTrigger: {
                trigger: mobileSectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // AJUSTE MOBILE: distância de scroll entre slides (atual: 2.2)
        const MOBILE_SCROLL_MULTIPLIER = 2.2;
        // AJUSTE MOBILE: suavidade do scrub em segundos (atual: 1.5)
        const MOBILE_SCRUB_SMOOTHNESS = 1.5;

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileSectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * MOBILE_SCROLL_MULTIPLIER * (total - 1)}`,
            pin: true,
            scrub: MOBILE_SCRUB_SMOOTHNESS,
            invalidateOnRefresh: true,
          },
        });

        // Transições mobile sincronizadas: imagem e palavras juntas
        for (let i = 0; i < total - 1; i++) {
          const outPanel = mobilePanelsRef.current[i];
          const inPanel = mobilePanelsRef.current[i + 1];

          if (!outPanel || !inPanel) continue;

          const outWords = outPanel.querySelectorAll("[data-manifesto-word]");
          const inWords = inPanel.querySelectorAll("[data-manifesto-word]");

          // Painel atual sai com fade + scale sutil
          mobileTl.to(
            outPanel,
            {
              opacity: 0,
              scale: 0.99,
              zIndex: 1,
              duration: 1,
              ease: "none",
            },
            i
          );

          if (outWords.length > 0) {
            mobileTl.to(
              outWords,
              { opacity: 0, y: -4, duration: 1, ease: "none" },
              i
            );
          }

          // Próximo painel entra com fade + scale sutil
          gsap.set(inPanel, { scale: 1.01 });
          mobileTl.to(
            inPanel,
            {
              opacity: 1,
              scale: 1,
              zIndex: 2,
              duration: 1,
              ease: "none",
            },
            i
          );

          if (inWords.length > 0) {
            mobileTl.fromTo(
              inWords,
              { y: 6, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.012,
                ease: "none",
              },
              i + 0.2
            );
          }
        }
      }, mobileSectionRef);

      return () => ctx.revert();
    },
    { scope: mobileSectionRef }
  );

  return (
    <>
      {/* ============================================
          DESKTOP: Seção pinada com experiência cinematográfica
          ============================================ */}
      <section
        ref={desktopSectionRef}
        id="manifesto"
        className="relative w-full bg-black overflow-hidden max-md:hidden"
        style={{ height: "100vh" }}
        aria-label="Manifesto Box Curumim Gym"
      >
        {/* PAINÉIS SOBREPOSTOS */}
        <div className="absolute inset-0 z-10">
          {PANEIS.map((painel, i) => (
            <article
              key={painel.id}
              ref={(el) => {
                desktopPanelsRef.current[i] = el;
              }}
              data-manifesto-panel
              className="absolute inset-0 will-change-transform"
              aria-label={`Manifesto ${painel.id}`}
            >
              {/* Background Desktop */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${painel.image})` }}
                aria-hidden="true"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

              {/* Gradiente lateral para leitura */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
                aria-hidden="true"
              />

              {/* Gradiente inferior */}
              <div
                className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent"
                aria-hidden="true"
              />

              {/* CONTEÚDO - posicionado na área negativa esquerda */}
              {/* AJUSTE: max-w do container de conteúdo (atual: 56rem). Aumente para linhas mais longas */}
              <div
                className="
                  relative z-10
                  flex flex-col
                  px-16 lg:px-24
                  pt-[18vh]
                  max-w-[60rem]
                "
              >
                {/* Label */}
                <div className="flex items-center gap-3 mb-7">
                  <span
                    className="w-7 h-[2px] shrink-0"
                    style={{ background: "#F36B21" }}
                    aria-hidden="true"
                  />
                  <p className="text-[11px] uppercase tracking-[0.35em] text-gray-light font-medium font-body">
                    {painel.label}
                  </p>
                </div>

                {/* Headline */}
                {/* AJUSTE: leading da headline (atual: 1.0). Aumente para mais espaço entre linhas */}
                <ManifestoText
                  texto={painel.headline}
                  highlights={painel.headlineHighlights}
                  className="
                    font-display
                    text-[clamp(2.8rem,4.5vw,4.5rem)]
                    font-bold
                    italic
                    leading-[1.1]
                    tracking-[-0.02em]
                    mb-6
                  "
                />

                {/* Body */}
                {/* AJUSTE: max-w do body (atual: 40rem) e leading (atual: 1.7). Aumente para menos quebras e mais respiro */}
                <p
                  className="
                    font-body
                    text-[clamp(0.9rem,1.1vw,1.05rem)]
                    font-normal
                    leading-[1.7]
                    text-white/70
                    whitespace-pre-line
                    mb-7
                    max-w-[40rem]
                  "
                >
                  {painel.body}
                </p>

                {/* Accent */}
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-[2px] shrink-0"
                    style={{ background: "#F36B21" }}
                    aria-hidden="true"
                  />
                  <p
                    className="
                      font-display
                      text-[clamp(0.95rem,1.3vw,1.15rem)]
                      font-bold
                      italic
                      uppercase
                      tracking-[0.06em]
                      text-[#F36B21]
                      drop-shadow-[0_0_10px_rgba(243,107,33,0.4)]
                    "
                  >
                    {painel.accent}
                  </p>
                </div>
              </div>

              {/* INDICADOR DO PAINEL */}
              <div
                className="
                  absolute bottom-10 left-16
                  lg:bottom-12 lg:left-20
                  flex items-center gap-3 z-10
                "
                aria-hidden="true"
              >
                <span className="font-display text-[#F36B21] text-lg font-bold italic">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-6 h-px bg-white/20" />
                <span className="font-display text-white/25 text-lg font-bold italic">
                  03
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* INDICADORES DE PROGRESSO */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3"
          role="list"
          aria-label="Painéis do manifesto"
        >
          {PANEIS.map((painel, i) => (
            <span
              key={painel.id}
              ref={(el) => {
                desktopDotsRef.current[i] = el;
              }}
              data-active={i === 0 ? "true" : "false"}
              className="
                w-2 h-2 rounded-full border
                transition-all duration-300
                data-[active=true]:bg-[#F36B21]
                data-[active=true]:border-[#F36B21]
                data-[active=true]:shadow-[0_0_10px_rgba(243,107,33,0.6)]
                data-[active=true]:scale-125
                data-[active=false]:bg-transparent
                data-[active=false]:border-white/30
              "
              role="listitem"
              aria-label={`Painel ${painel.id}`}
            />
          ))}
        </div>

        {/* BARRA DE PROGRESSO */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-20 bg-white/[0.05]"
          aria-hidden="true"
        >
          <span
            ref={desktopProgressRef}
            className="block h-full bg-[#F36B21] origin-left scale-x-0 shadow-[0_0_10px_rgba(243,107,33,0.5)]"
          />
        </div>

        {/* Gradiente de saída */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent z-20"
          aria-hidden="true"
        />
      </section>

      {/* ============================================
          MOBILE: Seção pinada com scrub estável
          Refs completamente separadas do desktop
          ============================================ */}
      <section
        ref={mobileSectionRef}
        className="relative w-full bg-black overflow-hidden md:hidden"
        style={{ height: "100vh" }}
        aria-label="Manifesto Box Curumim Gym Mobile"
      >
        {/* PAINÉIS SOBREPOSTOS MOBILE */}
        <div className="absolute inset-0 z-10">
          {PANEIS.map((painel, i) => (
            <article
              key={painel.id}
              ref={(el) => {
                mobilePanelsRef.current[i] = el;
              }}
              data-manifesto-panel
              className="absolute inset-0 will-change-transform"
              aria-label={`Manifesto ${painel.id}`}
            >
              {/* Background Mobile */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${painel.mobileImage})` }}
                aria-hidden="true"
              />

              {/* Overlay escuro para legibilidade no mobile */}
              <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

              {/* Gradiente superior forte + toque sutil de laranja para destaque do texto */}
              <div
                className="absolute inset-x-0 top-0 h-[65%] bg-gradient-to-b from-black/95 via-black/70 to-transparent"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-orange-900/20 via-orange-900/5 to-transparent"
                aria-hidden="true"
              />

              {/* Gradiente inferior */}
              <div
                className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent"
                aria-hidden="true"
              />

              {/* CONTEÚDO - respeitando área escura superior da imagem mobile */}
              {/* AJUSTE MOBILE: max-w do container (atual: 36rem). Aumente para linhas mais longas */}
              <div
                className="
                  relative z-10
                  flex flex-col
                  px-6
                  pt-[22vh]
                  max-w-[36rem]
                "
              >
                {/* Label */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="w-5 h-[2px] shrink-0"
                    style={{ background: "#F36B21" }}
                    aria-hidden="true"
                  />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-light font-medium font-body">
                    {painel.label}
                  </p>
                </div>

                {/* Headline */}
                {/* AJUSTE MOBILE: leading da headline (atual: 1.05). Aumente para mais espaço entre linhas */}
                <ManifestoText
                  texto={painel.headline}
                  highlights={painel.headlineHighlights}
                  className="
                    font-display
                    text-[clamp(2rem,9vw,3.2rem)]
                    font-bold
                    italic
                    leading-[1.05]
                    tracking-[-0.02em]
                    mb-5
                  "
                />

                {/* Body */}
                {/* AJUSTE MOBILE: max-w do body (atual: 34rem) e leading (atual: 1.7). Aumente para menos quebras e mais respiro */}
                <p
                  className="
                    font-body
                    text-[0.9rem]
                    font-normal
                    leading-[1.7]
                    text-white/70
                    whitespace-pre-line
                    mb-5
                    max-w-[34rem]
                  "
                >
                  {painel.body}
                </p>

                {/* Accent */}
                <div className="flex items-center gap-3">
                  <span
                    className="w-6 h-[2px] shrink-0"
                    style={{ background: "#F36B21" }}
                    aria-hidden="true"
                  />
                  <p
                    className="
                      font-display
                      text-[0.9rem]
                      font-bold
                      italic
                      uppercase
                      tracking-[0.06em]
                      text-[#F36B21]
                      drop-shadow-[0_0_10px_rgba(243,107,33,0.4)]
                    "
                  >
                    {painel.accent}
                  </p>
                </div>
              </div>

              {/* INDICADOR DO PAINEL */}
              <div
                className="
                  absolute bottom-8 left-6
                  flex items-center gap-3 z-10
                "
                aria-hidden="true"
              >
                <span className="font-display text-[#F36B21] text-base font-bold italic">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-5 h-px bg-white/20" />
                <span className="font-display text-white/25 text-base font-bold italic">
                  03
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* INDICADORES MOBILE */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3"
          role="list"
          aria-label="Painéis do manifesto mobile"
        >
          {PANEIS.map((painel, i) => (
            <span
              key={painel.id}
              data-active={i === 0 ? "true" : "false"}
              className="
                w-2 h-2 rounded-full border
                transition-all duration-300
                data-[active=true]:bg-[#F36B21]
                data-[active=true]:border-[#F36B21]
                data-[active=true]:shadow-[0_0_10px_rgba(243,107,33,0.6)]
                data-[active=true]:scale-125
                data-[active=false]:bg-transparent
                data-[active=false]:border-white/30
              "
              role="listitem"
              aria-label={`Painel ${painel.id}`}
            />
          ))}
        </div>

        {/* Gradiente de saída */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent z-20"
          aria-hidden="true"
        />
      </section>
    </>
  );
}