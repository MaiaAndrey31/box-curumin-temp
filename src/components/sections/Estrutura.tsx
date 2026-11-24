"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_CONFIG = {
  transitionDuration: 0.4,
  holdDuration: 0.3,
  scrub: 0.7,
  mobileScrollPerCard: 70,
};

const CARDS = [
  {
    number: "01",
    src: "/assets/Fachada.webp",
    alt: "Fachada do Box Curumim Gym",
    eyebrow: "NOSSO ESPAÇO",
    title: "UM ESPAÇO QUE",
    highlight: "IMPULSIONA",
    description:
      "Um ambiente pensado para performance, segurança e conforto, onde cada detalhe contribui para uma experiência de treino completa.",
  },
  {
    number: "02",
    src: "/assets/foto-2.webp",
    alt: "Ambiente interno de treinamento",
    eyebrow: "ÁREA DE TREINAMENTO",
    title: "ESTRUTURA PARA",
    highlight: "EVOLUIR",
    description:
      "Espaços amplos e preparados para diferentes estímulos, proporcionando liberdade de movimento e uma experiência de treino dinâmica.",
  },
  {
    number: "03",
    src: "/assets/foto-4.webp",
    alt: "Espaço dedicado ao movimento",
    eyebrow: "MOVIMENTO",
    title: "TREINO COM",
    highlight: "PROPÓSITO",
    description:
      "Um ambiente que favorece movimento, condicionamento e evolução, com uma atmosfera que mantém você motivado a ir além.",
  },
  {
    number: "04",
    src: "/assets/Fachada.webp",
    alt: "Estrutura completa e equipada",
    eyebrow: "BOX CURUMIM",
    title: "TUDO NO MESMO",
    highlight: "LUGAR",
    description:
      "Uma estrutura completa para acompanhar diferentes objetivos e momentos da sua jornada, do primeiro treino à evolução constante.",
  },
];

export function Estrutura() {
  const sectionRef = useRef<HTMLElement>(null);

  const desktopCardsRef = useRef<HTMLDivElement[]>([]);
  const desktopContentRef = useRef<HTMLDivElement[]>([]);

  const mobileCardsRef = useRef<HTMLDivElement[]>([]);

  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback((index: number) => {
    setActiveIndex((prev) => (prev !== index ? index : prev));
  }, []);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // =========================================================
        // DESKTOP
        // =========================================================

        mm.add("(min-width: 1024px)", () => {
          const totalCards = CARDS.length;

          const {
            transitionDuration,
            holdDuration,
            scrub,
          } = ANIMATION_CONFIG;

          const segmentDuration =
            transitionDuration + holdDuration;

          const totalTimelineDuration =
            segmentDuration * totalCards;

          const scrollDistance =
            window.innerHeight * totalTimelineDuration;

          // -------------------------------------------------------
          // ESTADO INICIAL DAS IMAGENS
          // -------------------------------------------------------

          desktopCardsRef.current.forEach((card, index) => {
            if (!card) return;

            gsap.set(card, {
              yPercent: index === 0 ? 0 : 12,
              opacity: index === 0 ? 1 : 0,
              scale: index === 0 ? 1 : 0.96,
              filter:
                index === 0
                  ? "brightness(1)"
                  : "brightness(0.5)",
              zIndex: index + 1,
            });
          });

          // -------------------------------------------------------
          // ESTADO INICIAL DOS CONTEÚDOS
          // -------------------------------------------------------

          desktopContentRef.current.forEach((content, index) => {
            if (!content) return;

            gsap.set(content, {
              y: index === 0 ? 0 : 35,
              opacity: index === 0 ? 1 : 0,
            });
          });

          // -------------------------------------------------------
          // TIMELINE PRINCIPAL
          // -------------------------------------------------------

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              pin: true,
              scrub,
              anticipatePin: 1,
              invalidateOnRefresh: true,

              onUpdate: (self) => {
                const progressPerCard = 1 / totalCards;

                const index = Math.min(
                  Math.floor(
                    self.progress / progressPerCard
                  ),
                  totalCards - 1
                );

                updateActiveIndex(index);
              },
            },
          });

          // -------------------------------------------------------
          // PROGRESSO
          // -------------------------------------------------------

          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleX: 0,
              transformOrigin: "left center",
            });

            tl.to(
              progressRef.current,
              {
                scaleX: 1,
                duration: totalTimelineDuration,
                ease: "none",
              },
              0
            );
          }

          // -------------------------------------------------------
          // HOLD INICIAL
          // -------------------------------------------------------

          tl.to(
            {},
            {
              duration: holdDuration,
            },
            0
          );

          // -------------------------------------------------------
          // TRANSIÇÕES
          // -------------------------------------------------------

          for (let i = 1; i < totalCards; i++) {
            const currentCard =
              desktopCardsRef.current[i];

            const previousCard =
              desktopCardsRef.current[i - 1];

            const currentContent =
              desktopContentRef.current[i];

            const previousContent =
              desktopContentRef.current[i - 1];

            const segmentStart =
              i * segmentDuration;

            // -----------------------------------------------
            // IMAGEM NOVA
            // -----------------------------------------------

            if (currentCard) {
              tl.to(
                currentCard,
                {
                  yPercent: 0,
                  opacity: 1,
                  scale: 1,
                  filter: "brightness(1)",
                  duration: transitionDuration,
                  ease: "power2.out",
                },
                segmentStart
              );
            }

            // -----------------------------------------------
            // IMAGEM ANTERIOR
            // -----------------------------------------------

            if (previousCard) {
              tl.to(
                previousCard,
                {
                  yPercent: -5,
                  opacity: 0,
                  scale: 0.96,
                  filter: "brightness(0.45)",
                  duration: transitionDuration,
                  ease: "power2.inOut",
                },
                segmentStart
              );
            }

            // -----------------------------------------------
            // CONTEÚDO NOVO
            // -----------------------------------------------

            if (currentContent) {
              tl.fromTo(
                currentContent,
                {
                  y: 35,
                  opacity: 0,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: transitionDuration * 0.75,
                  ease: "power3.out",
                },
                segmentStart + 0.15
              );
            }

            // -----------------------------------------------
            // CONTEÚDO ANTERIOR
            // -----------------------------------------------

            if (previousContent) {
              tl.to(
                previousContent,
                {
                  y: -25,
                  opacity: 0,
                  duration: transitionDuration * 0.55,
                  ease: "power2.in",
                },
                segmentStart
              );
            }

            // -----------------------------------------------
            // HOLD
            // -----------------------------------------------

            tl.to(
              {},
              {
                duration: holdDuration,
              },
              segmentStart + transitionDuration
            );
          }
        });

        // =========================================================
        // TABLET
        // =========================================================

        mm.add(
          "(min-width: 768px) and (max-width: 1023px)",
          () => {
            const { mobileScrollPerCard, scrub } =
              ANIMATION_CONFIG;

            mobileCardsRef.current.forEach((card) => {
              if (!card) return;

              const scrollDistance =
                window.innerHeight *
                (mobileScrollPerCard / 100);

              gsap.fromTo(
                card,
                {
                  y: 70,
                  opacity: 0,
                  scale: 0.97,
                },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  ease: "none",

                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: () => `+=${scrollDistance}`,
                    scrub,
                  },
                }
              );
            });
          }
        );

        // =========================================================
        // MOBILE
        // =========================================================

        mm.add("(max-width: 767px)", () => {
          const {
            mobileScrollPerCard,
            scrub,
          } = ANIMATION_CONFIG;

          mobileCardsRef.current.forEach((card) => {
            if (!card) return;

            const scrollDistance =
              window.innerHeight *
              (mobileScrollPerCard / 100);

            gsap.fromTo(
              card,
              {
                y: 50,
                opacity: 0,
                scale: 0.96,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                ease: "none",

                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  end: () => `+=${scrollDistance}`,
                  scrub,
                },
              }
            );
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      id="estrutura"
      aria-label="Estrutura"
      className="
        relative
        overflow-hidden
        bg-[#0b0b0b]
      "
    >
      {/* =====================================================
          DESKTOP
      ===================================================== */}

      <div className="hidden lg:block">
        <div className="relative h-[110vh]">
          <div className="sticky top-0 h-screen overflow-hidden">

            {/* Glow decorativo */}
            <div
              className="
                pointer-events-none
                absolute
                -left-40
                top-1/3
                h-[500px]
                w-[500px]
                rounded-full
                bg-orange/[0.04]
                blur-[140px]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -right-40
                bottom-0
                h-[450px]
                w-[450px]
                rounded-full
                bg-orange/[0.035]
                blur-[150px]
              "
            />

            <div
              className="
                relative
                z-10
                mx-auto
                flex
                h-full
                max-w-[1500px]
                flex-col
                px-8
                pt-22
                pb-10
                xl:px-14
              "
            >

             
              {/* =================================================
                  CONTEÚDO PRINCIPAL
              ================================================= */}

              <div
                className="
                  grid
                  flex-1
                  grid-cols-[0.8fr_1.2fr]
                  items-center
                  gap-14
                "
              >

                {/* =============================================
                    TEXTO
                ============================================= */}

                <div className="relative h-[390px]">

                  {CARDS.map((card, index) => (
                    <div
                      key={`content-${index}`}
                      ref={(el) => {
                        if (el) {
                          desktopContentRef.current[index] =
                            el;
                        }
                      }}
                      className="
                        absolute
                        inset-0
                        flex
                        flex-col
                        justify-center
                      "
                    >

                      <div className="mb-5 flex items-center gap-3">
                        <span
                          className="
                            font-display
                            text-sm
                            font-bold
                            italic
                            text-orange
                          "
                        >
                          {card.number}
                        </span>

                        <div className="h-px w-12 bg-orange/40" />

                        <span
                          className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.28em]
                            text-white/35
                          "
                        >
                          {card.eyebrow}
                        </span>
                      </div>

                      <h3
                        className="
                          font-display
                          text-5xl
                          font-bold
                          italic
                          leading-[0.88]
                          text-white
                          xl:text-6xl
                        "
                      >
                        {card.title}
                        <br />

                        <span className="text-orange">
                          {card.highlight}
                        </span>
                      </h3>

                      <p
                        className="
                          mt-7
                          max-w-md
                          text-base
                          leading-relaxed
                          text-white/50
                        "
                      >
                        {card.description}
                      </p>

                      {/* Indicador visual */}
                      <div className="mt-9 flex items-center gap-4">
                        <div
                          className="
                            h-1
                            w-14
                            overflow-hidden
                            rounded-full
                            bg-orange
                          "
                        />

                        <span
                          className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.25em]
                            text-white/25
                          "
                        >
                          Box Curumim Gym
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* =============================================
                    IMAGEM
                ============================================= */}

                <div
                  className="
                    relative
                    h-[min(68vh,650px)]
                    min-h-[500px]
                  "
                >
                  {/* Moldura */}
                  <div
                    className="
                      absolute
                      -bottom-3
                      -left-3
                      h-full
                      w-full
                      rounded-[20px]
                      border
                      border-orange/20
                    "
                  />

                  {/* Imagens */}
                  <div
                    className="
                      relative
                      h-full
                      w-full
                      overflow-hidden
                      rounded-[20px]
                      bg-black
                    "
                  >
                    {CARDS.map((card, index) => (
                      <div
                        key={`desktop-image-${index}`}
                        ref={(el) => {
                          if (el) {
                            desktopCardsRef.current[index] =
                              el;
                          }
                        }}
                        className="
                          absolute
                          inset-0
                          overflow-hidden
                        "
                      >
                        <Image
                          src={card.src}
                          alt={card.alt}
                          fill
                          className="
                            object-cover
                          "
                          sizes="(min-width: 1024px) 60vw"
                        />

                        {/* Overlay */}
                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/80
                            via-black/10
                            to-black/10
                          "
                        />

                        {/* Número gigante */}
                        <span
                          className="
                            absolute
                            right-8
                            top-6
                            font-display
                            text-[110px]
                            font-bold
                            italic
                            leading-none
                            text-white/[0.08]
                            xl:text-[140px]
                          "
                        >
                          {card.number}
                        </span>

                        {/* Caption */}
                        <div
                          className="
                            absolute
                            bottom-7
                            left-8
                            right-8
                            flex
                            items-end
                            justify-between
                          "
                        >
                          <div>
                            <div
                              className="
                                mb-2
                                h-[2px]
                                w-8
                                bg-orange
                              "
                            />

                            <p
                              className="
                                font-display
                                text-xl
                                font-bold
                                italic
                                text-white
                              "
                            >
                              {card.alt}
                            </p>
                          </div>

                          <span
                            className="
                              hidden
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-[0.25em]
                              text-white/40
                              xl:block
                            "
                          >
                            Box Curumim
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* =================================================
                  RODAPÉ / PROGRESSO
              ================================================= */}

              <div className="pb-2">

                <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.3em]
                      text-white/25
                    "
                  >
                    Nossa estrutura
                  </span>

                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.3em]
                      text-white/25
                    "
                  >
                    Role para explorar
                  </span>
                </div>

                <div className="relative h-px w-full bg-white/10">

                  <div
                    ref={progressRef}
                    className="
                      absolute
                      left-0
                      top-0
                      h-px
                      w-full
                      bg-orange
                      will-change-transform
                    "
                  />
                </div>

                <div className="mt-3 flex justify-between">
                  {CARDS.map((card, index) => (
                    <span
                      key={`progress-${index}`}
                      className={`
                        font-display
                        text-xs
                        font-bold
                        italic
                        transition-colors
                        duration-300
                        ${
                          activeIndex === index
                            ? "text-orange"
                            : "text-white/20"
                        }
                      `}
                    >
                      {card.number}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE / TABLET
      ===================================================== */}

      <div className="lg:hidden">

        <div className="mx-auto max-w-3xl px-6 py-24 md:px-10 md:py-32">

          {/* Header */}

          <div className="mb-14">

            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-7 bg-orange" />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-white/45
                "
              >
                Conheça nosso espaço
              </p>
            </div>

            <h2
              className="
                font-display
                text-5xl
                font-bold
                italic
                leading-[0.9]
                text-white
                md:text-6xl
              "
            >
              ESTRUTURA{" "}
              <span className="text-orange">
                COMPLETA
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-xl
                text-sm
                leading-relaxed
                text-white/45
                md:text-base
              "
            >
              Um ambiente pensado para performance,
              segurança e conforto. Conheça os espaços
              que fazem parte da experiência Box Curumim.
            </p>
          </div>

          {/* Cards */}

          <div className="flex flex-col gap-12">

            {CARDS.map((card, index) => (
              <div
                key={`mobile-${index}`}
                ref={(el) => {
                  if (el) {
                    mobileCardsRef.current[index] = el;
                  }
                }}
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-black
                "
              >

                {/* Imagem */}

                <div className="relative aspect-[4/5]">

                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black
                      via-black/20
                      to-transparent
                    "
                  />

                  {/* Número */}

                  <span
                    className="
                      absolute
                      right-5
                      top-4
                      font-display
                      text-7xl
                      font-bold
                      italic
                      leading-none
                      text-white/[0.08]
                    "
                  >
                    {card.number}
                  </span>

                  {/* Conteúdo */}

                  <div
                    className="
                      absolute
                      bottom-6
                      left-6
                      right-6
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.28em]
                        text-orange
                      "
                    >
                      {card.eyebrow}
                    </span>

                    <h3
                      className="
                        mt-2
                        font-display
                        text-3xl
                        font-bold
                        italic
                        leading-none
                        text-white
                      "
                    >
                      {card.title}
                      <br />
                      <span className="text-orange">
                        {card.highlight}
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Descrição */}

                <div className="p-6">

                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="
                        font-display
                        text-sm
                        font-bold
                        italic
                        text-orange
                      "
                    >
                      {card.number}
                    </span>

                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <p
                    className="
                      text-sm
                      leading-relaxed
                      text-white/45
                    "
                  >
                    {card.description}
                  </p>

                  <p
                    className="
                      mt-5
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.25em]
                      text-white/20
                    "
                  >
                    {card.alt}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}