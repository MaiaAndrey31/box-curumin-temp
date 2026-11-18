"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

// Placeholders — substituir por depoimentos reais autorizados
const DEPOIMENTOS = [
  {
    nome: "ALUNO A",
    texto:
      "O acompanhamento mudou minha relação com o treino. Evoluí mais em 3 meses do que em 2 anos sozinho.",
    modalidade: "Musculação",
  },
  {
    nome: "ALUNA B",
    texto:
      "O MMT me desafia de um jeito que eu nunca imaginei. Cada aula é diferente e a energia é incrível.",
    modalidade: "MMT",
  },
  {
    nome: "PAI/MÃE C",
    texto:
      "Meu filho adora as aulas de parkour. Ganhou confiança, coordenação e fez amigos. Recomendo demais.",
    modalidade: "Parkour Infantil",
  },
];

export function Comunidade() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          gsap.fromTo(
            cardsRef.current,
            { y: 50, opacity: 0, rotateX: 5 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        mm.add("(max-width: 767px)", () => {
          gsap.fromTo(
            cardsRef.current,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 bg-black"
      aria-label="Comunidade"
    >
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Quem vive, recomenda"
          title="NOSSA"
          highlight="COMUNIDADE"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8">
          {DEPOIMENTOS.map((dep, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="relative p-8 rounded-2xl border border-white/5 bg-graphite/50 hover:border-orange/30 transition-colors duration-300 flex flex-col gap-6"
            >
              {/* Aspas decorativas */}
              <span
                className="absolute top-6 right-6 font-display text-6xl text-orange/20 leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <p className="text-white/90 text-base md:text-lg leading-relaxed italic relative z-10">
                {dep.texto}
              </p>

              <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center text-orange font-display font-bold italic text-sm">
                  {dep.nome.charAt(0)}
                </div>
                <div>
                  <p className="font-display font-bold italic text-white text-sm">
                    {dep.nome}
                  </p>
                  <p className="text-gray-light text-xs">{dep.modalidade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nota de placeholder */}
        <p className="text-center text-gray-dark text-xs mt-12">
          * Depoimentos ilustrativos. Substituir por relatos reais autorizados.
        </p>
      </div>
    </section>
  );
}