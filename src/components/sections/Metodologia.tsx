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

        /*
         * Desktop
         */
        mm.add("(min-width: 768px)", () => {
          gsap.fromTo(
            imageRef.current,
            { y: -35 },
            {
              y: 35,
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
            {
              x: 45,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 65%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        /*
         * Mobile
         */
        mm.add("(max-width: 767px)", () => {
          gsap.fromTo(
            itemsRef.current,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.12,
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
      className="
        relative overflow-hidden
        bg-[#0b0b0b]
        px-6 py-24
        md:py-32
      "
      aria-label="Metodologia"
    >
      {/* Iluminação ambiental */}
      <div
        className="
          pointer-events-none
          absolute -left-40 top-1/3
          h-[500px] w-[500px]
          rounded-full
          bg-orange/5
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute -right-40 bottom-0
          h-[450px] w-[450px]
          rounded-full
          bg-orange/5
          blur-[150px]
        "
      />

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div
          className="
            grid grid-cols-1
            items-center
            gap-14
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-20
          "
        >
          {/* ==========================================
              IMAGEM
          ========================================== */}
          <div className="relative">
            {/* Detalhe laranja atrás da imagem */}
            <div
              className="
                absolute
                -bottom-4 -left-4
                h-full w-full
                rounded-2xl
                border border-orange/20
              "
            />

            {/* Imagem */}
            <div
              className="
                relative
                h-[470px]
                overflow-hidden
                rounded-2xl
                md:h-[600px]
              "
            >
              <div
                ref={imageRef}
                className="
                  absolute
                  inset-[-40px]
                  will-change-transform
                "
              >
                <Image
                  src="/assets/SecondaryBanner.png"
                  alt="Professor acompanhando aluno durante treino"
                  fill
                  className="
                    object-cover
                    brightness-[0.58]
                    saturate-[0.9]
                  "
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>

              {/* Overlay */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/20
                  to-black/30
                "
              />

              {/* Pequena luz laranja */}
              <div
                className="
                  absolute
                  -right-24
                  -top-24
                  h-64 w-64
                  rounded-full
                  bg-orange/15
                  blur-[100px]
                "
              />

              {/* Texto sobre a imagem */}
              <div
                className="
                  absolute
                  bottom-7 left-7 right-7
                  md:bottom-8 md:left-8 md:right-8
                "
              >
                <div
                  className="
                    mb-4
                    h-[2px] w-10
                    bg-orange
                  "
                />

                <p
                  className="
                    max-w-[480px]
                    font-display
                    text-2xl
                    font-bold
                    italic
                    leading-tight
                    text-white
                    md:text-3xl
                  "
                >
                  SEU OBJETIVO É{" "}
                  <span className="text-orange">
                    NOSSO COMPROMISSO
                  </span>
                </p>
              </div>

              {/* Número decorativo */}
              <span
                className="
                  absolute
                  right-7 top-7
                  font-display
                  text-7xl
                  font-bold
                  italic
                  leading-none
                  text-white/[0.08]
                  md:right-8 md:top-8
                  md:text-8xl
                "
              >
                01
              </span>
            </div>
          </div>

          {/* ==========================================
              CONTEÚDO
          ========================================== */}
          <div className="flex flex-col">
            <SectionHeading
              subtitle="Como trabalhamos"
              title="METODOLOGIA DE"
              highlight="RESULTADOS"
            />

            <p
              className="
                mt-8
                max-w-xl
                text-base
                leading-relaxed
                text-white/55
                md:text-lg
              "
            >
              No Box Curumim, acreditamos que cada pessoa tem um
              potencial único. Nossa metodologia combina ciência do
              movimento, atenção individual e uma comunidade que
              inspira evolução constante.
            </p>

            {/* Linha de metodologia */}
            <div className="relative mt-10">
              {/* Linha vertical */}
              <div
                className="
                  absolute
                  bottom-5 left-[19px] top-5
                  w-px
                  bg-gradient-to-b
                  from-orange/60
                  via-orange/20
                  to-transparent
                "
              />

              <div className="flex flex-col gap-7">
                {DIFERENCIAIS.map((item, index) => (
                  <div
                    key={item.title}
                    ref={(el) => {
                      if (el) itemsRef.current[index] = el;
                    }}
                    className="
                      group
                      relative
                      flex gap-5
                    "
                  >
                    {/* Número */}
                    <div
                      className="
                        relative z-10
                        flex h-10 w-10
                        shrink-0
                        items-center justify-center
                        rounded-full
                        border border-orange/40
                        bg-[#0b0b0b]
                        font-display
                        text-base
                        font-bold
                        italic
                        text-orange
                        transition-all duration-400
                        group-hover:border-orange
                        group-hover:bg-orange
                        group-hover:text-black
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Conteúdo */}
                    <div
                      className="
                        flex-1
                        pb-7
                        border-b border-white/[0.07]
                        transition-colors duration-300
                        group-hover:border-orange/20
                      "
                    >
                      <h3
                        className="
                          font-display
                          text-lg
                          font-bold
                          italic
                          leading-tight
                          text-white
                          md:text-xl
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          max-w-lg
                          text-sm
                          leading-relaxed
                          text-white/45
                          transition-colors duration-300
                          group-hover:text-white/65
                          md:text-[15px]
                        "
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pequena assinatura */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-8 bg-orange" />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-white/30
                "
              >
                Treine com propósito
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}