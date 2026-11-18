"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const DIFERENCIAIS = [
  {
    title: "ACOMPANHAMENTO INDIVIDUAL",
    desc: "Cada aluno recebe atenção personalizada, respeitando limitações e objetivos únicos.",
  },
  {
    title: "EVOLUÇÃO CONTÍNUA",
    desc: "Planejamento progressivo que acompanha seu desenvolvimento semana a semana.",
  },
  {
    title: "COMUNIDADE FORTE",
    desc: "Ambiente acolhedor onde alunos e professores crescem juntos.",
  },
];

export function Metodologia() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // Desktop: parallax na imagem + stagger nos itens
        mm.add("(min-width: 768px)", () => {
          gsap.fromTo(
            imageRef.current,
            { y: -40 },
            {
              y: 40,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );

          gsap.fromTo(
            itemsRef.current,
            { x: 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 65%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Mobile: entrada simples sem parallax
        mm.add("(max-width: 767px)", () => {
          gsap.fromTo(
            itemsRef.current,
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
      className="relative py-24 md:py-32 px-6 bg-black overflow-hidden"
      aria-label="Metodologia"
    >
      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Coluna esquerda — Imagem com parallax */}
        <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden">
          <div ref={imageRef} className="absolute inset-[-40px] will-change-transform">
            <Image
              src="/assets/SecondaryBanner.png"
              alt="Professor acompanhando aluno durante treino"
              fill
              className="object-cover brightness-[0.6]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

          {/* Badge sobreposto */}
          <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl border border-orange/30 bg-black/60 backdrop-blur-sm">
            <p className="font-display text-2xl md:text-3xl font-bold italic text-white">
              SEU OBJETIVO É <span className="text-orange">NOSSO COMPROMISSO</span>
            </p>
          </div>
        </div>

        {/* Coluna direita — Conteúdo */}
        <div className="flex flex-col gap-8">
          <SectionHeading
            subtitle="Como trabalhamos"
            title="METODOLOGIA DE"
            highlight="RESULTADOS"
          />

          <p className="text-gray-light text-base md:text-lg leading-relaxed max-w-lg">
            No Box Curumim, acreditamos que cada pessoa tem um potencial único.
            Nossa metodologia combina ciência do movimento, atenção individual
            e uma comunidade que inspira evolução constante.
          </p>

          <div className="flex flex-col gap-6 mt-4">
            {DIFERENCIAIS.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                className="group flex gap-4 p-4 rounded-xl border border-white/5 hover:border-orange/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 shrink-0 rounded-full border border-orange/50 flex items-center justify-center text-orange font-display font-bold italic text-lg group-hover:bg-orange group-hover:text-black transition-colors duration-300">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-display font-bold italic text-white text-lg mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-light text-sm leading-relaxed">
                    {item.desc}
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