"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const MODALIDADES = [
  {
    id: "musculacao",
    title: "MUSCULAÇÃO",
    desc: "Força, saúde e qualidade de vida.",
    image: "/assets/bannerHome.png",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11M6.5 17.5h11M6 20v-2a6 6 0 1 1 12 0v2M6 4v2a6 6 0 1 0 12 0V4" />
      </svg>
    ),
  },
  {
    id: "mmt",
    title: "MMT",
    desc: "Mixed Modalities Training. Condicionamento, força e resistência.",
    image: "/assets/SecondaryBanner.png",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3.7 2 2.4 3.3 2.9 3.8z" />
      </svg>
    ),
  },
  {
    id: "parkour",
    title: "PARKOUR",
    desc: "Movimento, coordenação e confiança para as crianças.",
    image: "/assets/Fachada.png",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
  },
];

export function Modalidades() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // Desktop: stagger reveal com scale sutil
        mm.add("(min-width: 768px)", () => {
          gsap.fromTo(
            cardsRef.current,
            { y: 60, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
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

        // Mobile: entrada sequencial mais suave
        mm.add("(max-width: 767px)", () => {
          gsap.fromTo(
            cardsRef.current,
            { y: 40, opacity: 0 },
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
      className="relative py-24 md:py-32 px-6 bg-graphite"
      aria-label="Modalidades"
    >
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Para todas as idades e objetivos"
          title="NOSSAS"
          highlight="MODALIDADES"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8">
          {MODALIDADES.map((mod, index) => (
            <div
              key={mod.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative rounded-2xl overflow-hidden border border-orange/30 bg-black/40 hover:border-orange transition-colors duration-300"
            >
              {/* Imagem de fundo */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={mod.image}
                  alt={mod.title}
                  fill
                  className="object-cover brightness-[0.3] group-hover:brightness-[0.4] group-hover:scale-105 transition-all duration-700 ease-out-expo"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Conteúdo */}
              <div className="relative z-10 p-8 flex flex-col h-full min-h-[320px] justify-end">
                <div className="text-orange mb-4">{mod.icon}</div>
                <h3 className="font-display text-3xl md:text-4xl font-bold italic text-white mb-3">
                  {mod.title}
                </h3>
                <p className="text-gray-light text-sm md:text-base leading-relaxed">
                  {mod.desc}
                </p>

                {/* Seta indicativa */}
                <div className="mt-6 self-end w-10 h-10 rounded-full border border-orange/50 flex items-center justify-center text-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}