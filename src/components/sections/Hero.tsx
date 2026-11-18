"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

// Ícones SVG inline para evitar dependências externas
const CalendarIcon = () => (
 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
  <line x1="16" y1="2" x2="16" y2="6" />
  <line x1="8" y1="2" x2="8" y2="6" />
  <line x1="3" y1="10" x2="21" y2="10" />
 </svg>
);

const PlayIcon = () => (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
  <polygon points="5 3 19 12 5 21 5 3" />
 </svg>
);

const DumbbellIcon = () => (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M6.5 6.5h11M6.5 17.5h11M6 20v-2a6 6 0 1 1 12 0v2M6 4v2a6 6 0 1 0 12 0V4" />
 </svg>
);

const FireIcon = () => (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3.7 2 2.4 3.3 2.9 3.8z" />
 </svg>
);

const RunIcon = () => (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
 </svg>
);

export function Hero() {
 const containerRef = useRef<HTMLDivElement>(null);
 const titleRef = useRef<HTMLHeadingElement>(null);
 const subtitleRef = useRef<HTMLParagraphElement>(null);
 const ctaRef = useRef<HTMLDivElement>(null);
 const imageRef = useRef<HTMLDivElement>(null);

 useGSAP(
  () => {
   const ctx = gsap.context(() => {
    // Timeline de entrada cinematográfica
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Imagem de fundo: scale sutil de 1.1 para 1
    tl.fromTo(
     imageRef.current,
     { scale: 1.15, opacity: 0 },
     { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" },
     0
    );

    // Subtítulo: fade up
    tl.fromTo(
     subtitleRef.current,
     { y: 30, opacity: 0 },
     { y: 0, opacity: 1, duration: 1 },
     0.3
    );

    // Título: reveal palavra por palavra com stagger
    const words = titleRef.current?.querySelectorAll(".word");
    if (words) {
     tl.fromTo(
      words,
      { y: 100, opacity: 0, rotateX: -10 },
      {
       y: 0,
       opacity: 1,
       rotateX: 0,
       duration: 1.2,
       stagger: 0.15,
       ease: "back.out(1.4)",
      },
      0.5
     );
    }

    // CTAs: slide in
    tl.fromTo(
     ctaRef.current,
     { y: 40, opacity: 0 },
     { y: 0, opacity: 1, duration: 1 },
     1
    );
   }, containerRef);

   return () => ctx.revert();
  },
  { scope: containerRef }
 );

 return (
  <section
   ref={containerRef}
   className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
   aria-label="Hero"
  >
   {/* Background Image com overlay */}
   <div
    ref={imageRef}
    className="absolute inset-0 z-0 will-change-transform"
   >
    <Image
     src="/assets/bannerHome.png"
     alt="Atleta treinando no Box Curumim Gym"
     fill
     priority
     className="object-cover object-center brightness-[0.4] contrast-[1.1]"
     sizes="100vw"
    />
    {/* Gradiente overlay para legibilidade */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
   </div>

   {/* Conteúdo principal */}
   <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
    {/* Coluna esquerda — Texto e CTAs */}
    <div className="lg:col-span-8 flex flex-col items-start gap-6">
     <p
      ref={subtitleRef}
      className="text-gray-light text-sm md:text-base uppercase tracking-[0.3em] font-medium opacity-0"
     >
      Box Curumim Gym
     </p>

     <h1
      ref={titleRef}
      className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold italic leading-[0.85] tracking-tight"
     >
      <span className="word inline-block text-white mr-4">MOVIMENTO</span>
      <span className="word inline-block text-white mr-4">QUE</span>
      <br />
      <span className="word inline-block text-orange">TRANSFORMA</span>
     </h1>

     <p className="text-white/80 text-base md:text-lg max-w-xl font-light tracking-wide">
      Saúde{" "}
      <span className="text-orange mx-1" aria-hidden="true">•</span>{" "}
      Performance{" "}
      <span className="text-orange mx-1" aria-hidden="true">•</span>{" "}
      Disciplina{" "}
      <span className="text-orange mx-1" aria-hidden="true">•</span>{" "}
      Evolução
     </p>

     <div ref={ctaRef} className="flex flex-wrap gap-4 mt-4 opacity-0">
      <Button size="lg" icon={<CalendarIcon />}>
       Agende sua Experiência
      </Button>

      <button
       className="group flex items-center gap-4 text-white hover:text-orange transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
       aria-label="Conheça nossa estrutura"
      >
       <span className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center group-hover:border-orange transition-colors">
        <PlayIcon />
       </span>
       <span className="font-display uppercase italic font-semibold text-sm tracking-wide leading-tight">
        Conheça<br />Nossa Estrutura
       </span>
      </button>
     </div>
    </div>

    {/* Coluna direita — Modalidades rápidas (desktop) */}
    <div className="hidden lg:flex flex-col gap-6 lg:col-span-4 items-end">
     {[
      { icon: <DumbbellIcon />, title: "Musculação", desc: "Força e saúde" },
      { icon: <FireIcon />, title: "MMT", desc: "Alta performance" },
      { icon: <RunIcon />, title: "Parkour", desc: "Diversão e movimento para as crianças" },
     ].map((item) => (
      <div
       key={item.title}
       className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-orange/30 transition-colors"
      >
       <div className="w-12 h-12 rounded-full border border-orange/50 flex items-center justify-center text-orange shrink-0">
        {item.icon}
       </div>
       <div className="text-right">
        <p className="font-display font-bold italic text-white text-lg">{item.title}</p>
        <p className="text-gray-light text-sm">{item.desc}</p>
       </div>
      </div>
     ))}
    </div>
   </div>

   {/* Indicador de scroll lateral */}
   <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-10">
    <div className="flex flex-col items-center gap-2">
     <div className="w-3 h-3 rounded-full bg-orange shadow-[0_0_12px_rgba(243,107,33,0.6)]" />
     <div className="w-px h-16 bg-gradient-to-b from-orange/60 to-white/20" />
     <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
     <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
     <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
    </div>
    <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 writing-vertical-lr">
     Scroll
    </span>
   </div>
  </section>
 );
}