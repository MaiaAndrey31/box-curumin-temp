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
    image: "/assets/foto-3.webp",
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.5 6.5h11M6.5 17.5h11M6 20v-2a6 6 0 1 1 12 0v2M6 4v2a6 6 0 1 0 12 0V4" />
      </svg>
    ),
  },
  {
    id: "mmt",
    title: "MMT",
    desc: "Mixed Modalities Training. Condicionamento, força e resistência.",
    image: "/assets/foto-1.webp",
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3.7 2 2.4 3.3 2.9 3.8z" />
      </svg>
    ),
  },
  {
    id: "parkour",
    title: "PARKOUR",
    desc: "Movimento, coordenação e confiança para as crianças.",
    image: "/assets/foto-5.webp",
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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

        mm.add("(min-width: 768px)", () => {
          gsap.fromTo(
            cardsRef.current,
            {
              y: 60,
              opacity: 0,
              scale: 0.97,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 72%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        mm.add("(max-width: 767px)", () => {
          gsap.fromTo(
            cardsRef.current,
            {
              y: 40,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 78%",
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
      className="relative overflow-hidden bg-[#0b0b0b] py-24 md:py-32 px-6"
      aria-label="Modalidades"
    >
      {/* Iluminação ambiental */}
      <div
        className="
          pointer-events-none absolute
          -top-40 left-1/2
          h-[500px] w-[900px]
          -translate-x-1/2
          rounded-full
          bg-orange/10
          blur-[140px]
          opacity-40
        "
      />

      {/* Textura/linha decorativa */}
      <div
        className="
          pointer-events-none absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />

      <div className="relative z-10 container mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Para todas as idades e objetivos"
          title="NOSSAS"
          highlight="MODALIDADES"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {MODALIDADES.map((mod, index) => (
            <div
              key={mod.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="
                group relative
                min-h-[390px]
                overflow-hidden
                rounded-2xl
                border border-white/[0.08]
                bg-[#111111]
                transition-all duration-500
                hover:-translate-y-1
                hover:border-orange/60
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]
              "
            >
              {/* Imagem */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={mod.image}
                  alt={mod.title}
                  fill
                  className="
                    object-cover
                    scale-[1.01]
                    brightness-[0.52]
                    saturate-[0.9]
                    transition-all duration-700 ease-out
                    group-hover:scale-105
                    group-hover:brightness-[0.62]
                    group-hover:saturate-100
                  "
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Degradê principal */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black
                    via-black/55
                    to-black/10
                  "
                />

                {/* Pequena iluminação laranja */}
                <div
                  className="
                    absolute -right-20 -top-20
                    h-48 w-48
                    rounded-full
                    bg-orange/20
                    blur-[90px]
                    opacity-0
                    transition-opacity duration-700
                    group-hover:opacity-100
                  "
                />
              </div>

              {/* Conteúdo */}
              <div
                className="
                  relative z-10
                  flex min-h-[390px]
                  flex-col justify-end
                  p-7 md:p-8
                "
              >
                {/* Ícone */}
                <div
                  className="
                    mb-auto
                    flex h-12 w-12
                    items-center justify-center
                    text-orange
                    transition-transform duration-500
                    group-hover:-translate-y-1
                  "
                >
                  {mod.icon}
                </div>

                {/* Conteúdo inferior */}
                <div>
                  {/* Linha de destaque */}
                  <div
                    className="
                      mb-4
                      h-[2px] w-8
                      bg-orange
                      transition-all duration-500
                      group-hover:w-14
                    "
                  />

                  <h3
                    className="
                      font-display
                      text-3xl md:text-[2.6rem]
                      font-bold italic
                      leading-none
                      tracking-tight
                      text-white
                    "
                  >
                    {mod.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-[330px]
                      text-sm md:text-[15px]
                      leading-relaxed
                      text-white/65
                      transition-colors duration-300
                      group-hover:text-white/80
                    "
                  >
                    {mod.desc}
                  </p>

                  {/* Indicador */}
                  <div className="mt-6 flex items-center justify-between">
                    <span
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.25em]
                        text-white/35
                        transition-colors duration-300
                        group-hover:text-orange
                      "
                    >
                      Conheça
                    </span>

                    <div
                      className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-full
                        border border-white/15
                        text-white/50
                        transition-all duration-500
                        group-hover:border-orange
                        group-hover:bg-orange
                        group-hover:text-black
                      "
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}