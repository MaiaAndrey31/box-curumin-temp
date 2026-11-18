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
  const itemsRef = useRef<HTMLDivElement[]>([]);

  // Animação de entrada via CSS para evitar conflito com hidratação do React
  // O GSAP fromTo nos itens do FAQ quebrava o onClick após hidratação
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
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
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 bg-graphite"
      aria-label="Perguntas Frequentes"
    >
      <div className="container mx-auto max-w-3xl">
        <SectionHeading
          subtitle="Tire suas dúvidas"
          title="PERGUNTAS"
          highlight="FREQUENTES"
          align="center"
        />

        <div className="flex flex-col gap-3 mt-8">
          {PERGUNTAS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                className="border border-white/10 rounded-xl overflow-hidden bg-black/30"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-orange"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-display font-bold italic text-white text-base md:text-lg pr-4">
                    {faq.pergunta}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border border-orange/50 flex items-center justify-center text-orange transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
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

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-out-expo ${
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-gray-light text-sm md:text-base leading-relaxed">
                    {faq.resposta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}