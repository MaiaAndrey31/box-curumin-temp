"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const PERGUNTAS = [
  {
    pergunta: "Preciso ter experiência prévia para começar?",
    resposta:
      "Não! Nossas turmas são adaptadas para todos os níveis. O acompanhamento profissional garante que você evolua com segurança, independente da sua experiência.",
  },
  {
    pergunta: "Qual a idade mínima para o Parkour Infantil?",
    resposta:
      "As aulas de Parkour Infantil são voltadas para crianças a partir de 7 anos. As atividades são adaptadas por faixa etária, priorizando segurança, coordenação e diversão.",
  },
  {
    pergunta: "Como funciona o agendamento das aulas?",
    resposta:
      "Os agendamentos são feitos pelo aplicativo, com vagas limitadas para garantir qualidade no atendimento. Entre em contato para saber mais sobre horários disponíveis.",
  },
  {
    pergunta: "Posso fazer uma aula experimental?",
    resposta:
      "Sim! Oferecemos uma experiência inicial para você conhecer o espaço, os professores e as modalidades. Agende pelo WhatsApp ou pelo botão acima.",
  },
  {
    pergunta: "Quais são os planos disponíveis?",
    resposta:
      "Temos opções mensais, trimestrais e anuais, com condições especiais para famílias. Entre em contato para valores atualizados e promoções vigentes.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Entrada da seção
        gsap.fromTo(
          sectionRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Entrada individual das perguntas
        gsap.fromTo(
          "[data-faq-item]",
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden bg-black px-6 py-24 md:py-32"
      aria-label="Perguntas Frequentes"
    >
      {/* ============================================
          BACKGROUND
          ============================================ */}

      {/* BACKGROUND */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Base */}
          <div className="absolute inset-0 bg-black" />

          {/* Glow principal — canto direito */}
          <div
            className="
              absolute
              -right-[20%]
              -top-[15%]
              h-[700px]
              w-[700px]
              rounded-full
              bg-[#F36B21]/[0.055]
              blur-[180px]
            "
          />

          {/* Glow secundário — canto inferior esquerdo */}
          <div
            className="
              absolute
              -bottom-[25%]
              -left-[20%]
              h-[600px]
              w-[600px]
              rounded-full
              bg-[#F36B21]/[0.025]
              blur-[180px]
            "
          />

          {/* Luz central extremamente sutil */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-[500px]
              w-[900px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white/[0.008]
              blur-[120px]
            "
          />

          {/* Textura */}
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Vinheta */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.55)_100%)]
            "
          />
        </div>

      {/* ============================================
          CONTAINER
          ============================================ */}
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* ============================================
            HEADER
            ============================================ */}
        <div className="mb-12 md:mb-16">
          <SectionHeading
            subtitle="Tire suas dúvidas"
            title="PERGUNTAS"
            highlight="FREQUENTES"
            align="center"
          />

          {/* Texto auxiliar */}
          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-center
              font-body
              text-sm
              leading-relaxed
              text-white/50
              md:text-base
            "
          >
            Tudo o que você precisa saber antes de começar sua jornada no Box
            Curumim.
          </p>
        </div>

        {/* ============================================
            FAQ LIST
            ============================================ */}
        <div className="mx-auto max-w-4xl">
          {PERGUNTAS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                data-faq-item
                className={`
                  group
                  relative
                  border-t
                  transition-all
                  duration-500
                  ${
                    index === PERGUNTAS.length - 1
                      ? "border-b"
                      : ""
                  }
                  ${
                    isOpen
                      ? "border-[#F36B21]/40"
                      : "border-white/10 hover:border-white/20"
                  }
                `}
              >
                {/* Pequeno marcador laranja lateral */}
                <div
                  className={`
                    absolute
                    left-0
                    top-0
                    h-full
                    w-[2px]
                    origin-top
                    bg-[#F36B21]
                    transition-transform
                    duration-500
                    ${
                      isOpen
                        ? "scale-y-100 opacity-100"
                        : "scale-y-0 opacity-0"
                    }
                  `}
                  aria-hidden="true"
                />

                {/* ============================================
                    PERGUNTA
                    ============================================ */}
                <button
                  id={`faq-question-${index}`}
                  onClick={() => toggleItem(index)}
                  className="
                    relative
                    flex
                    w-full
                    items-center
                    gap-5
                    px-2
                    py-6
                    text-left
                    outline-none
                    md:px-5
                    md:py-7
                  "
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  {/* Número */}
                  <span
                    className={`
                      hidden
                      w-10
                      shrink-0
                      font-display
                      text-sm
                      font-bold
                      italic
                      transition-colors
                      duration-300
                      md:block
                      ${
                        isOpen
                          ? "text-[#F36B21]"
                          : "text-white/20 group-hover:text-white/40"
                      }
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Pergunta */}
                  <span
                    className={`
                      flex-1
                      font-display
                      text-lg
                      font-bold
                      italic
                      leading-tight
                      transition-colors
                      duration-300
                      md:text-2xl
                      ${
                        isOpen
                          ? "text-white"
                          : "text-white/80 group-hover:text-white"
                      }
                    `}
                  >
                    {faq.pergunta}
                  </span>

                  {/* Ícone */}
                  <span
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition-all
                      duration-500
                      ${
                        isOpen
                          ? "rotate-45 border-[#F36B21] bg-[#F36B21] text-black shadow-[0_0_25px_rgba(243,107,33,0.3)]"
                          : "border-white/15 bg-white/[0.02] text-[#F36B21] group-hover:border-[#F36B21]/50 group-hover:bg-[#F36B21]/5"
                      }
                    `}
                    aria-hidden="true"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                {/* ============================================
                    RESPOSTA
                    ============================================ */}
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`
                    grid
                    transition-[grid-template-rows,opacity]
                    duration-500
                    ease-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="flex px-2 pb-7 md:px-5 md:pb-8">
                      {/* Linha vertical */}
                      <div className="ml-[3.5rem] mr-5 hidden w-px shrink-0 bg-gradient-to-b from-[#F36B21]/50 to-transparent md:block" />

                      <p
                        className="
                          max-w-3xl
                          font-body
                          text-sm
                          leading-relaxed
                          text-white/55
                          md:text-base
                        "
                      >
                        {faq.resposta}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================
            CTA FINAL
            ============================================ */}
        <div
          className="
            mx-auto
            mt-14
            flex
            max-w-3xl
            flex-col
            items-center
            text-center
            md:mt-16
          "
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#F36B21]" />
            <span className="font-display text-xs font-bold italic uppercase tracking-[0.25em] text-[#F36B21]">
              AINDA TEM DÚVIDAS?
            </span>
            <span className="h-px w-8 bg-[#F36B21]" />
          </div>

          <p className="max-w-md font-body text-sm leading-relaxed text-white/45">
            Nossa equipe está pronta para te ajudar a encontrar a melhor forma
            de começar.
          </p>
        </div>
      </div>
    </section>
  );
}