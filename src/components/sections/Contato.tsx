"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function Contato() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          contentRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 bg-black border-t border-white/5"
      aria-label="Contato"
    >
      <div ref={contentRef} className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Coluna esquerda — CTA principal */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-gray-light text-sm uppercase tracking-[0.3em] font-medium mb-4">
                Comece hoje
              </p>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold italic leading-[0.9] text-white">
                PRONTO PARA <br />
                <span className="text-orange">EVOLUIR?</span>
              </h2>
            </div>

            <p className="text-gray-light text-base md:text-lg leading-relaxed max-w-md">
              Agende sua aula experimental e descubra como o Box Curumim
              pode transformar sua relação com o movimento.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <Button
                size="lg"
                icon={<WhatsAppIcon />}
                onClick={() => window.open("https://wa.me/", "_blank")}
              >
                Fale pelo WhatsApp
              </Button>
            </div>
          </div>

          {/* Coluna direita — Informações */}
          <div className="flex flex-col gap-8 p-8 rounded-2xl border border-white/5 bg-graphite/30">
            {/* Endereço */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 shrink-0 rounded-full border border-orange/50 flex items-center justify-center text-orange">
                <MapPinIcon />
              </div>
              <div>
                <h4 className="font-display font-bold italic text-white text-lg mb-1">
                  LOCALIZAÇÃO
                </h4>
                <p className="text-gray-light text-sm leading-relaxed">
                  Adamantina - SP<br />
                  <span className="text-gray-dark text-xs">
                    * Endereço completo a confirmar
                  </span>
                </p>
              </div>
            </div>

            {/* Horário */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 shrink-0 rounded-full border border-orange/50 flex items-center justify-center text-orange">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold italic text-white text-lg mb-1">
                  HORÁRIOS
                </h4>
                <p className="text-gray-light text-sm leading-relaxed">
                  Segunda a Sexta: 6h às 22h<br />
                  Sábado: 8h às 14h<br />
                  <span className="text-gray-dark text-xs">
                    * Horários sujeitos a alteração
                  </span>
                </p>
              </div>
            </div>

            {/* Redes sociais */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 shrink-0 rounded-full border border-orange/50 flex items-center justify-center text-orange">
                <InstagramIcon />
              </div>
              <div>
                <h4 className="font-display font-bold italic text-white text-lg mb-1">
                  REDES SOCIAIS
                </h4>
                <a
                  href="https://www.instagram.com/boxcurumimgym/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-light text-sm hover:text-orange transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  @boxcurumimgym
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/logoCurumim.webp"
              alt="Box Curumim Gym"
              width={100}
              height={28}
              className="h-7 w-auto object-contain opacity-60"
            />
            <p className="text-gray-dark text-xs text-center md:text-left">
              © 2024 Box Curumim Gym. Todos os direitos reservados.
            </p>
          </div>
          <p className="text-gray-dark text-xs">
            Desenvolvido com 💪 e código
          </p>
        </footer>
      </div>
    </section>
  );
}