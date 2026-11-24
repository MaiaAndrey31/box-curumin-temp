"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export function Contato() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          "[data-contact-left]",
          {
            x: -40,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          }
        ).fromTo(
          "[data-contact-info]",
          {
            x: 40,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.55"
        );

        gsap.fromTo(
          "[data-contact-item]",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/5 bg-black px-6 py-24 md:py-32"
      aria-label="Contato"
    >
      {/* BACKGROUND */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Base */}
        <div className="absolute inset-0 bg-black" />

        {/* Glow laranja */}
        <div
          className="
            absolute
            -right-[15%]
            top-[5%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-[#F36B21]/[0.055]
            blur-[180px]
          "
        />

        <div
          className="
            absolute
            -bottom-[30%]
            -left-[15%]
            h-[550px]
            w-[550px]
            rounded-full
            bg-[#F36B21]/[0.025]
            blur-[170px]
          "
        />

        {/* Iluminação central */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[450px]
            w-[900px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/[0.008]
            blur-[140px]
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
            bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.65)_100%)]
          "
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 container mx-auto max-w-7xl"
      >
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* CTA PRINCIPAL */}
          <div data-contact-left className="flex flex-col gap-8">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#F36B21]" />

                <p className="font-display text-xs font-bold italic uppercase tracking-[0.3em] text-[#F36B21]">
                  Comece hoje
                </p>
              </div>

              <h2
                className="
                  font-display
                  text-5xl
                  font-bold
                  italic
                  leading-[0.86]
                  tracking-tight
                  text-white
                  sm:text-6xl
                  md:text-7xl
                  lg:text-[5.5rem]
                "
              >
                PRONTO PARA
                <br />
                <span className="text-[#F36B21]">EVOLUIR?</span>
              </h2>
            </div>

            <p className="max-w-lg font-body text-base leading-relaxed text-white/50 md:text-lg">
              Agende sua aula experimental e descubra como o Box Curumim pode
              transformar sua relação com o movimento.
            </p>

            <div className="mt-1 flex flex-wrap gap-4">
              <Button
                size="lg"
                icon={<WhatsAppIcon />}
                onClick={() =>
                  window.open("https://wa.me/", "_blank")
                }
              >
                Fale pelo WhatsApp
              </Button>
            </div>

            {/* Micro destaque */}
            <div className="flex items-center gap-3 pt-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F36B21] shadow-[0_0_10px_rgba(243,107,33,0.8)]" />

              <span className="font-body text-xs text-white/30">
                Resposta rápida pelo WhatsApp
              </span>
            </div>
          </div>

          {/* INFORMAÇÕES */}
          <div
            data-contact-info
            className="
              relative
              overflow-hidden
              border
              border-white/10
              bg-white/[0.025]
              backdrop-blur-sm
            "
          >
            {/* Linha laranja superior */}
            <div
              className="
                absolute
                left-0
                top-0
                h-px
                w-24
                bg-[#F36B21]
                shadow-[0_0_20px_rgba(243,107,33,0.6)]
              "
            />

            <div className="p-7 md:p-9">
              {/* Header */}
              <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-6">
                <div>
                  <p className="mb-2 font-body text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
                    Box Curumim
                  </p>

                  <h3 className="font-display text-2xl font-bold italic text-white md:text-3xl">
                    ENCONTRE A GENTE
                  </h3>
                </div>

                <span className="font-display text-4xl font-bold italic text-white/[0.06]">
                  01
                </span>
              </div>

              <div className="flex flex-col">
                {/* Localização */}
                <div
                  data-contact-item
                  className="
                    group
                    flex
                    gap-4
                    border-b
                    border-white/10
                    py-6
                    first:pt-0
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      border
                      border-white/10
                      bg-black/30
                      text-[#F36B21]
                      transition-all
                      duration-300
                      group-hover:border-[#F36B21]/50
                      group-hover:bg-[#F36B21]/10
                    "
                  >
                    <MapPinIcon />
                  </div>

                  <div>
                    <p className="mb-1 font-display text-sm font-bold italic text-white">
                      LOCALIZAÇÃO
                    </p>

                    <p className="font-body text-sm leading-relaxed text-white/50">
                      Adamantina - SP
                    </p>

                    <span className="mt-1 block font-body text-[10px] text-white/20">
                      * Endereço completo a confirmar
                    </span>
                  </div>
                </div>

                {/* Horários */}
                <div
                  data-contact-item
                  className="
                    group
                    flex
                    gap-4
                    border-b
                    border-white/10
                    py-6
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      border
                      border-white/10
                      bg-black/30
                      text-[#F36B21]
                      transition-all
                      duration-300
                      group-hover:border-[#F36B21]/50
                      group-hover:bg-[#F36B21]/10
                    "
                  >
                    <ClockIcon />
                  </div>

                  <div>
                    <p className="mb-1 font-display text-sm font-bold italic text-white">
                      HORÁRIOS
                    </p>

                    <p className="font-body text-sm leading-relaxed text-white/50">
                      Segunda a Sexta: 6h às 22h
                      <br />
                      Sábado: 8h às 14h
                    </p>

                    <span className="mt-1 block font-body text-[10px] text-white/20">
                      * Horários sujeitos a alteração
                    </span>
                  </div>
                </div>

                {/* Instagram */}
                <div
                  data-contact-item
                  className="group flex gap-4 py-6 pb-0"
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      border
                      border-white/10
                      bg-black/30
                      text-[#F36B21]
                      transition-all
                      duration-300
                      group-hover:border-[#F36B21]/50
                      group-hover:bg-[#F36B21]/10
                    "
                  >
                    <InstagramIcon />
                  </div>

                  <div>
                    <p className="mb-1 font-display text-sm font-bold italic text-white">
                      REDES SOCIAIS
                    </p>

                    <a
                      href="https://www.instagram.com/boxcurumimgym/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        font-body
                        text-sm
                        text-white/50
                        transition-colors
                        duration-300
                        hover:text-[#F36B21]
                        focus-visible:outline-2
                        focus-visible:outline-offset-2
                        focus-visible:outline-[#F36B21]
                      "
                    >
                      @boxcurumimgym
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVISOR */}
        <div className="mt-20 flex items-center gap-5 md:mt-24">
          <span className="h-px flex-1 bg-white/5" />

          <span className="font-display text-[10px] font-bold italic tracking-[0.35em] text-white/15">
            BOX CURUMIM
          </span>

          <span className="h-px flex-1 bg-white/5" />
        </div>

        {/* FOOTER */}
        <footer className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Image
              src="/assets/logoCurumim.webp"
              alt="Box Curumim Gym"
              width={100}
              height={28}
              className="h-7 w-auto object-contain opacity-80"
            />

            <p className="text-center font-body text-xs text-white/45 md:text-left">
              © 2024 Box Curumim Gym. Todos os direitos reservados.
            </p>
          </div>

          <a
            href="https://freelings.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-body
              text-xs
              text-white/45
              transition-colors
              duration-300
              hover:text-[#F36B21]
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#F36B21]
            "
          >
            Desenvolvido por{" "}
            <span className="font-semibold text-white/65 transition-colors duration-300 hover:text-[#F36B21]">
              Freelings Company
            </span>
          </a>
      </footer>
      </div>
    </section>
  );
}