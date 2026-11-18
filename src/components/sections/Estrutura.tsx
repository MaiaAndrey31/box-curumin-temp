"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// CONFIGURAÇÃO CENTRALIZADA DA ANIMAÇÃO
// Ajuste estes valores para controlar o ritmo da experiência
// ============================================
const ANIMATION_CONFIG = {
 // Duração relativa da transição entre cards (entrada do próximo)
 transitionDuration: 1,
 // Duração relativa do período de permanência (hold) após cada transição
 holdDuration: 1.5,
 // Intensidade do scrub (suavização): valores maiores = mais suave/lento
 scrub: 1,
 // Distância de scroll por card no mobile (em vh)
 mobileScrollPerCard: 80,
};

// 4 cards centralizados para fácil substituição futura de imagens
const CARDS = [
 { src: "/assets/Fachada.png", alt: "Fachada do Box Curumim Gym" },
 { src: "/assets/bannerHome.png", alt: "Ambiente interno de treinamento" },
 { src: "/assets/SecondaryBanner.png", alt: "Espaço dedicado ao movimento" },
 { src: "/assets/Fachada.png", alt: "Estrutura completa e equipada" },
];

export function Estrutura() {
 const sectionRef = useRef<HTMLElement>(null);
 // Refs separadas para desktop e mobile para evitar conflito de seletores
 const desktopCardsRef = useRef<HTMLDivElement[]>([]);
 const mobileCardsRef = useRef<HTMLDivElement[]>([]);
 const progressRef = useRef<HTMLDivElement>(null);
 const [activeIndex, setActiveIndex] = useState(0);

 // Callback memoizado para evitar re-renders desnecessários no onUpdate
 const updateActiveIndex = useCallback(
 (idx: number) => {
 setActiveIndex((prev) => (prev !== idx ? idx : prev));
 },
 []
 );

 useGSAP(
 () => {
 const ctx = gsap.context(() => {
 const mm = gsap.matchMedia();

 // ============================================
 // DESKTOP (>= 1024px): Sticky + Stacked Cards + Scrub + Hold
 // ============================================
 mm.add("(min-width: 1024px)", () => {
 const totalCards = CARDS.length;
 const { transitionDuration, holdDuration, scrub } = ANIMATION_CONFIG;

 // Cada card tem um segmento completo: transição + hold
 // O primeiro card tem apenas hold inicial (já está visível)
 // O último card tem hold final após entrar
 // Total de segmentos = totalCards (1 hold inicial + N-1 transições+holds)
 const segmentDuration = transitionDuration + holdDuration;
 const totalTimelineDuration = segmentDuration * totalCards;

 // Distância total de scroll proporcional à duração da timeline
 const scrollDistance = window.innerHeight * totalTimelineDuration;

 // Set inicial via GSAP (não inline style) para garantir que
 // a timeline tenha controle total sobre transform/opacity
 desktopCardsRef.current.forEach((card, i) => {
 if (!card) return;
 gsap.set(card, {
 yPercent: i === 0 ? 0 : 100,
 opacity: i === 0 ? 1 : 0,
 scale: 1,
 zIndex: i,
 });
 });

 const tl = gsap.timeline({
 scrollTrigger: {
 trigger: sectionRef.current,
 start: "top top",
 end: () => `+=${scrollDistance}`,
 pin: true,
 scrub,
 invalidateOnRefresh: true,
 anticipatePin: 1,
 onUpdate: (self) => {
 // Calcula qual card está ativo baseado no progresso da timeline
 // Cada segmento representa um card: [0..1/N) = card 0, [1/N..2/N) = card 1, etc.
 const progressPerSegment = 1 / totalCards;
 const idx = Math.min(
 Math.floor(self.progress / progressPerSegment),
 totalCards - 1
 );
 updateActiveIndex(idx);
 },
 },
 });

 // --- HOLD INICIAL: Card 01 permanece visível ---
 // Segmento vazio onde nada muda visualmente, mas o scroll avança
 tl.to({}, { duration: holdDuration }, 0);

 // --- TRANSIÇÕES + HOLDS para cada card subsequente ---
 for (let i = 1; i < totalCards; i++) {
 const card = desktopCardsRef.current[i];
 const prevCard = desktopCardsRef.current[i - 1];
 // Posição na timeline onde esta transição começa
 const segmentStart = i * segmentDuration;

 if (card) {
 // Card atual entra de baixo para cima (transição)
 tl.to(
 card,
 {
 yPercent: 0,
 opacity: 1,
 duration: transitionDuration,
 ease: "none",
 },
 segmentStart
 );
 }

 if (prevCard) {
 // Card anterior reduz escala e brilho durante a transição
 tl.to(
 prevCard,
 {
 scale: 0.96,
 filter: "brightness(0.7)",
 duration: transitionDuration,
 ease: "none",
 },
 segmentStart
 );
 }

 // HOLD após transição: card permanece visível sem mudança visual
 // Adiciona um segmento vazio após a transição completar
 tl.to({}, { duration: holdDuration }, segmentStart + transitionDuration);
 }

 // Barra de progresso sincronizada com toda a timeline
 if (progressRef.current) {
 tl.fromTo(
 progressRef.current,
 { width: "0%" },
 { width: "100%", duration: totalTimelineDuration, ease: "none" },
 0
 );
 }
 });

 // ============================================
 // TABLET (768px - 1023px): Vertical reveal com scrub + hold
 // ============================================
 mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
 const { mobileScrollPerCard } = ANIMATION_CONFIG;

 mobileCardsRef.current.forEach((card, i) => {
 if (!card) return;

 // Cada card tem seu próprio ScrollTrigger independente
 // com distância de scroll que inclui transição + hold
 const scrollDist = window.innerHeight * (mobileScrollPerCard / 100);

 gsap.fromTo(
 card,
 { y: 80, opacity: 0, scale: 0.97 },
 {
 y: 0,
 opacity: 1,
 scale: 1,
 ease: "none",
 scrollTrigger: {
 trigger: card,
 start: "top 85%",
 end: () => `+=${scrollDist}`,
 scrub: ANIMATION_CONFIG.scrub,
 },
 }
 );
 });
 });

 // ============================================
 // MOBILE (< 768px): Vertical reveal com scrub adaptado + hold
 // ============================================
 mm.add("(max-width: 767px)", () => {
 const { mobileScrollPerCard } = ANIMATION_CONFIG;

 mobileCardsRef.current.forEach((card, i) => {
 if (!card) return;

 const scrollDist = window.innerHeight * (mobileScrollPerCard / 100);

 gsap.fromTo(
 card,
 { y: 50, opacity: 0 },
 {
 y: 0,
 opacity: 1,
 ease: "none",
 scrollTrigger: {
 trigger: card,
 start: "top 88%",
 end: () => `+=${scrollDist}`,
 scrub: ANIMATION_CONFIG.scrub,
 },
 }
 );
 });
 });
 }, sectionRef);

 return () => ctx.revert();
 },
 { scope: sectionRef }
 );

 return (
 <section
 ref={sectionRef}
 className="relative bg-graphite overflow-hidden"
 aria-label="Estrutura"
 id="estrutura"
 >
 <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
 {/* ==============================
 DESKTOP: duas colunas
 ============================== */}
 <div className="hidden lg:grid lg:grid-cols-[40%_60%] gap-12 min-h-screen items-start">
 {/* COLUNA ESQUERDA — Sticky Content */}
 <div className="flex flex-col justify-center h-screen py-24">
 <p className="text-gray-light text-sm uppercase tracking-[0.3em] font-medium mb-4">
 Conheça nosso espaço
 </p>

 <h2 className="font-display text-5xl xl:text-6xl font-bold italic leading-[0.95] mb-6">
 ESTRUTURA{" "}
 <span className="text-orange">COMPLETA</span>
 </h2>

 <p className="text-gray-light text-base lg:text-lg leading-relaxed max-w-md mb-10">
 Um ambiente pensado para performance, segurança e conforto.
 Equipamentos modernos, espaços amplos e atmosfera motivadora
 para que cada treino seja um passo em direção à sua melhor versão.
 </p>

 {/* Indicador de progresso */}
 <div className="flex items-center gap-4">
 <span className="font-display font-bold italic text-orange text-2xl">
 {String(activeIndex + 1).padStart(2, "0")}
 </span>
 <div className="flex-1 h-px bg-white/10 relative overflow-hidden max-w-[120px]">
 <div
 ref={progressRef}
 className="absolute inset-y-0 left-0 bg-orange will-change-transform"
 style={{ width: "0%" }}
 />
 </div>
 <span className="font-display font-bold italic text-white/30 text-2xl">
 {String(CARDS.length).padStart(2, "0")}
 </span>
 </div>
 </div>

 {/* COLUNA DIREITA — Stacked Cards */}
 <div className="relative h-screen flex items-center justify-center py-24">
 {CARDS.map((img, index) => (
 <div
 key={`desktop-${index}`}
 ref={(el) => {
 if (el) desktopCardsRef.current[index] = el;
 }}
 className="absolute w-full max-w-[580px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 will-change-transform"
 >
 <Image
 src={img.src}
 alt={img.alt}
 fill
 className="object-cover brightness-[0.6]"
 sizes="(min-width: 1024px) 580px, 100vw"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
 <p className="absolute bottom-8 left-8 font-display font-bold italic text-white text-xl lg:text-2xl">
 {img.alt}
 </p>
 </div>
 ))}
 </div>
 </div>

 {/* ==============================
 MOBILE / TABLET
 ============================== */}
 <div className="lg:hidden flex flex-col gap-8 py-24 md:py-32">
 <div className="mb-4">
 <p className="text-gray-light text-xs uppercase tracking-[0.3em] font-medium mb-3">
 Conheça nosso espaço
 </p>
 <h2 className="font-display text-4xl md:text-5xl font-bold italic leading-[0.95] mb-4">
 ESTRUTURA{" "}
 <span className="text-orange">COMPLETA</span>
 </h2>
 <p className="text-gray-light text-sm md:text-base leading-relaxed max-w-lg">
 Um ambiente pensado para performance, segurança e conforto.
 Equipamentos modernos, espaços amplos e atmosfera motivadora.
 </p>
 </div>

 <div className="flex flex-col gap-6">
 {CARDS.map((img, index) => (
 <div
 key={`mobile-${index}`}
 ref={(el) => {
 if (el) mobileCardsRef.current[index] = el;
 }}
 className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden border border-white/5"
 >
 <Image
 src={img.src}
 alt={img.alt}
 fill
 className="object-cover brightness-[0.6]"
 sizes="(max-width: 768px) 100vw, 80vw"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
 <p className="absolute bottom-6 left-6 font-display font-bold italic text-white text-lg md:text-xl">
 {img.alt}
 </p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>
 );
}