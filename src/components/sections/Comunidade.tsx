"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";
import styles from "./Comunidade.module.css";

gsap.registerPlugin(ScrollTrigger);

// TODO: substituir pelos depoimentos reais autorizados
const DEPOIMENTOS = [
  {
    nome: "Matheus Lourenço",
    texto:
      "O acompanhamento mudou minha relação com o treino. Evoluí mais em 3 meses do que em 2 anos sozinho.",
    modalidade: "Musculação",
    foto: "/assets/person1.webp",
  },
  {
    nome: "Renata Barros",
    texto:
      "O MMT me desafia de um jeito que eu nunca imaginei. Cada aula é diferente e a energia é incrível.",
    modalidade: "MMT",
    foto: "/assets/person2.webp",
  },
  {
    nome: "Thiago Zambrano",
    texto:
      "Meu filho adora as aulas de parkour. Ganhou confiança, coordenação e fez amigos. Recomendo demais.",
    modalidade: "Parkour Infantil",
    foto: "/assets/person3.webp",
  },
];

const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: "/assets/post-01.webp",
  },
  {
    id: 2,
    image: "/assets/post-02.webp",
  },
  {
    id: 3,
    image: "/assets/post-03.webp",
  },
  {
    id: 4,
    image: "/assets/post-04.webp",
  },
  {
    id: 5,
    image: "/assets/post-05.webp",
  },
  {
    id: 6,
    image: "/assets/post-06.webp",
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
            {
              y: 70,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.15,
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
      className="relative overflow-hidden bg-black px-6 py-24 md:py-32"
      aria-label="Comunidade"
    >
      {/* Glow decorativo */}
      <div className="pointer-events-none absolute left-1/2 top-40 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-orange/5 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <SectionHeading
            subtitle="Quem vive, recomenda"
            title="NOSSA"
            highlight="COMUNIDADE"
            align="center"
          />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/45 md:text-base">
            Mais do que treinar, fazemos parte de uma comunidade que
            compartilha evolução, desafios e conquistas todos os dias.
          </p>
        </div>

        {/* DEPOIMENTOS */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">

          {DEPOIMENTOS.map((dep, index) => (
            <div
              key={dep.nome}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={`
                group relative overflow-hidden rounded-2xl
                border border-white/[0.06]
                bg-[#151515]
                p-7
                transition-all duration-500
                hover:-translate-y-1
                hover:border-orange/30
                ${
                  index === 0
                    ? "md:col-span-7 md:p-9"
                    : "md:col-span-5"
                }
              `}
            >

              {/* Número */}
              <span className="absolute right-6 top-5 font-display text-7xl font-bold italic text-white/[0.025]">
                0{index + 1}
              </span>

              {/* Aspas */}
              <span
                className="
                  absolute right-6 top-16
                  font-display text-[100px]
                  leading-none text-orange/[0.12]
                  transition-transform duration-500
                  group-hover:scale-110
                "
                aria-hidden="true"
              >
                "
              </span>

              {/* Estrelas */}
              <div className="relative z-10 mb-6 flex gap-1 text-orange">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-sm">
                    ★
                  </span>
                ))}
              </div>

              {/* Texto */}
              <p
                className={`
                  relative z-10
                  max-w-2xl
                  font-display
                  font-bold
                  italic
                  leading-relaxed
                  text-white
                  ${
                    index === 0
                      ? "text-xl md:text-2xl"
                      : "text-lg"
                  }
                `}
              >
                "{dep.texto}"
              </p>

              {/* Linha */}
              <div className="my-7 h-px bg-white/[0.08]" />

              {/* Autor */}
              <div className="flex items-center gap-4">

                <div
                  className="
                      relative
                      h-14 w-14 shrink-0
                      overflow-hidden
                      rounded-full
                      border border-orange/30
                      bg-orange/10
                  "
                >
                   <Image
                    src={dep.foto}
                    alt={dep.nome}
                    fill
                    className="object-cover"
                    sizes="44px"
                    />
                </div>

                <div>
                  <p className="font-display text-sm font-bold italic text-white">
                    {dep.nome}
                  </p>

                  <p className="mt-0.5 text-xs uppercase tracking-wider text-white/35">
                    {dep.modalidade}
                  </p>
                </div>

              </div>

              {/* Detalhe inferior */}
              <div
                className="
                  absolute bottom-0 left-0 h-[2px] w-0
                  bg-orange
                  transition-all duration-500
                  group-hover:w-full
                "
              />
            </div>
          ))}

        </div>

        {/* INSTAGRAM */}
        <div className="mt-24 md:mt-28">

          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[2px] w-7 bg-orange" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                  Vida real. Treino real.
                </p>
              </div>

              <h3 className="font-display text-4xl font-bold italic text-white md:text-5xl">
                ACOMPANHE{" "}
                <span className="text-orange">NO INSTAGRAM</span>
              </h3>
            </div>

            <a
              href="https://www.instagram.com/boxcurumimgym/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-3
                self-start
                rounded-full
                border border-orange/40
                px-5 py-3
                font-display
                text-sm font-bold italic
                text-orange
                transition-all duration-300
                hover:bg-orange
                hover:text-black
                md:self-auto
              "
            >
              @boxcurumimgym

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  ry="5"
                />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r=".5"
                  fill="currentColor"
                />
              </svg>
            </a>

          </div>

         {/* CARROSSEL INSTAGRAM */}
            <div className="relative overflow-hidden">

              <div className={`${styles.instagramTrack} flex w-max`}>
                {[...INSTAGRAM_POSTS, ...INSTAGRAM_POSTS].map((post, index) => (
                  <a
                    key={`${post.id}-${index}`}
                    href="https://www.instagram.com/boxcurumimgym/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      relative
                      h-[400px]
                      w-[200px]
                      shrink-0
                      mr-5
                      overflow-hidden
                      rounded-xl
                      border border-white/[0.07]
                      bg-[#151515]
                      transition-all
                      duration-500
                      hover:border-orange/40
                    "
                  >

                    {/* IMAGEM */}
                    <Image
                      src={post.image}
                      alt={`Publicação ${post.id} do Box Curumim`}
                      fill
                      className="
                        object-cover
                        object-top
                        scale-100
                        brightness-[0.85]
                        transition-all
                        duration-700
                        ease-out
                        group-hover:scale-105
                        group-hover:brightness-100
                      "
                      sizes="200px"
                    />

                    {/* SOMBRA PRETA SUAVE */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/45
                        via-black/5
                        to-transparent
                        opacity-80
                        blur-[1px]
                        transition-opacity
                        duration-700
                        group-hover:opacity-30
                      "
                    />

                    {/* LARANJA SUAVE NA BASE */}
                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-[40%]
                        bg-gradient-to-t
                        from-orange/30
                        via-orange/8
                        to-transparent
                        opacity-60
                        blur-[2px]
                        transition-all
                        duration-700
                        group-hover:h-[25%]
                        group-hover:opacity-10
                      "
                    />

                    {/* BORDA */}
                    <div
                      className="
                        absolute
                        inset-0
                        rounded-xl
                        ring-1
                        ring-inset
                        ring-transparent
                        transition-all
                        duration-500
                        group-hover:ring-orange/50
                      "
                    />

                    {/* INSTAGRAM */}
                    <div
                      className="
                        absolute
                        left-4
                        top-4
                        transition-all
                        duration-500
                        group-hover:-translate-y-1
                      "
                    >
                      <span
                        className="
                          font-display
                          text-xs
                          font-bold
                          italic
                          tracking-wider
                          text-white/60
                          transition-colors
                          duration-300
                          group-hover:text-white
                        "
                      >
                        INSTAGRAM
                      </span>
                    </div>

                    {/* CTA */}
                    <div
                      className="
                        absolute
                        bottom-5
                        left-5
                        translate-y-3
                        opacity-0
                        transition-all
                        duration-500
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                    >
                      <span
                        className="
                          font-display
                          text-sm
                          font-bold
                          italic
                          text-white
                        "
                      >
                        VER PUBLICAÇÃO →
                      </span>
                    </div>

                  </a>
                ))}

              </div>

            </div>
  

          <p className="mt-5 text-xs text-white/25">
            Acompanhe nossos treinos, alunos, eventos e novidades.
          </p>

        </div>

      </div>
    </section>
  );
}

