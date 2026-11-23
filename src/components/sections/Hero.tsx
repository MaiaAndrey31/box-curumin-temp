
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

// ==========================================
// ÍCONES SVG
// ==========================================

const CalendarIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const PlayIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <polygon points="5 3 19 12 5 21" />
    </svg>
);

const DumbbellIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6.5 6.5h11M6.5 17.5h11" />
        <path d="M4 8v8M7 5v14M17 5v14M20 8v8" />
        <path d="M4 10H2v4h2M20 10h2v4h-2" />
    </svg>
);

const FireIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3.7 2 2.4 3.3 2.9 3.8z" />
    </svg>
);

const RunIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="15" cy="5" r="2" />
        <path d="m13 8-3 4 4 2 2 5" />
        <path d="m10 12-4 1-3 4" />
        <path d="m14 14 4-2 3 2" />
        <path d="m9 17-2 4M17 19l3 2" />
    </svg>
);

const ChevronRight = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
);

const ChevronDown = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

// ==========================================
// MODALIDADES
// ==========================================

const modalities = [
    {
        icon: DumbbellIcon,
        title: "Musculação",
        desc: "Força e saúde",
    },
    {
        icon: FireIcon,
        title: "MMT",
        desc: "Alta performance",
    },
    {
        icon: RunIcon,
        title: "Parkour",
        desc: "Diversão e movimento para as crianças",
    },
];

// ==========================================
// HERO
// ==========================================

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add(
                {
                    reduceMotion: "(prefers-reduced-motion: reduce)",
                    motionOK: "(prefers-reduced-motion: no-preference)",
                },
                (context) => {
                    const { reduceMotion } = context.conditions as {
                        reduceMotion: boolean;
                        motionOK: boolean;
                    };

                    const elements = [
                        subtitleRef.current,
                        titleRef.current,
                        ctaRef.current,
                        ...(cardsRef.current
                            ? Array.from(cardsRef.current.children)
                            : []),
                    ].filter(Boolean);

                    if (reduceMotion) {
                        gsap.set(
                            [imageRef.current, ...elements, scrollRef.current],
                            { clearProps: "all" }
                        );
                        return;
                    }

                    const tl = gsap.timeline({
                        defaults: { ease: "power3.out" },
                    });

                    // Fotografia cinematográfica
                    tl.fromTo(
                        imageRef.current,
                        { scale: 1.12, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 1.8,
                            ease: "power2.out",
                        },
                        0
                    );

                    // Identificação da academia
                    tl.fromTo(
                        subtitleRef.current,
                        { y: 25, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.9 },
                        0.35
                    );

                    // Headline
                    const words = titleRef.current?.querySelectorAll(".word");

                    if (words?.length) {
                        tl.fromTo(
                            words,
                            {
                                y: 70,
                                opacity: 0,
                                rotateX: -12,
                            },
                            {
                                y: 0,
                                opacity: 1,
                                rotateX: 0,
                                duration: 1.1,
                                stagger: 0.12,
                                ease: "power3.out",
                            },
                            0.55
                        );
                    }

                    // Botões
                    tl.fromTo(
                        ctaRef.current,
                        { y: 25, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.8 },
                        1
                    );

                    // Cards das modalidades
                    const cards = cardsRef.current?.children;

                    if (cards?.length) {
                        tl.fromTo(
                            cards,
                            { x: 35, opacity: 0 },
                            {
                                x: 0,
                                opacity: 1,
                                duration: 0.8,
                                stagger: 0.15,
                            },
                            0.85
                        );
                    }

                    // Indicador de scroll
                    tl.fromTo(
                        scrollRef.current,
                        { opacity: 0, y: 10 },
                        { opacity: 1, y: 0, duration: 0.7 },
                        1.3
                    );
                }
            );

            return () => mm.revert();
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full flex items-center overflow-hidden bg-black"
            aria-label="Apresentação Box Curumim Gym"
        >
            {/* ======================================
          BACKGROUND
      ====================================== */}

            <div
                ref={imageRef}
                className="absolute inset-0 z-0 will-change-transform"
            >
                <Image
                    src="/assets/bannerHome.png"
                    alt="Atleta treinando no Box Curumim Gym"
                    fill
                    priority
                    className="object-cover object-center brightness-[0.45] contrast-[1.1]"
                    sizes="100vw"
                />

                {/* Overlay cinematográfico */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />

                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/15 to-black/55" />

                {/* Escurecimento inferior */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
            </div>

            {/* ======================================
          ELEMENTOS DECORATIVOS
      ====================================== */}

            {/* Diagonal superior esquerda */}
            <div className="absolute -top-20 -left-20 z-[1] pointer-events-none">
                <div className="w-[2px] h-72 bg-gradient-to-b from-orange via-orange/70 to-transparent rotate-[28deg]" />
            </div>

            {/* Diagonal inferior direita */}
            <div className="absolute -bottom-32 -right-16 z-[1] pointer-events-none">
                <div className="w-[2px] h-80 bg-gradient-to-b from-orange/70 to-transparent rotate-[28deg]" />
            </div>

            {/* ======================================
          CONTEÚDO PRINCIPAL
      ====================================== */}

            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-24 lg:pt-36 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* COLUNA ESQUERDA */}
                <div className="lg:col-span-8 flex flex-col items-start gap-6">

                    {/* Identificação */}
                    <div
                        ref={subtitleRef}
                        className="flex items-center gap-5 opacity-0"
                    >
                        <p className="text-gray-light text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
                            Box Curumim Gym
                        </p>

                        <span className="w-12 h-[2px] bg-orange" />
                    </div>

                    {/* Headline */}
                    <h1
                        ref={titleRef}
                        className="font-display text-[clamp(3rem,7.2vw,7.5rem)] font-bold italic leading-[0.86] tracking-[-0.045em] max-w-5xl"
                    >
                        <span className="word inline-block text-white mr-3">
                            MOVIMENTO
                        </span>

                        <span className="word inline-block text-white">
                            QUE
                        </span>

                        <br />

                        <span className="word inline-block text-orange">
                            TRANSFORMA
                        </span>
                    </h1>

                    {/* Palavras-chave */}
                    <p className="text-white/75 text-xs sm:text-sm md:text-base uppercase tracking-[0.16em] md:tracking-[0.22em] font-medium">
                        Saúde
                        <span className="text-orange mx-2">•</span>
                        Performance
                        <span className="text-orange mx-2">•</span>
                        Disciplina
                        <span className="text-orange mx-2">•</span>
                        Evolução
                    </p>

                    {/* CTAs */}
                    <div
                        ref={ctaRef}
                        className="flex flex-wrap items-center gap-5 mt-5 opacity-0"
                    >
                        {/* CTA principal */}
                        <div className="relative group">
                            {/* Glow: o raio precisa acompanhar o do botão */}
                            <div className="absolute -inset-1 rounded-2xl bg-orange/30 blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                            <Button
                                size="lg"
                                icon={<CalendarIcon />}
                                className="rounded-2xl"
                            >
                                Agende sua Experiência

                                {/* Seta à direita */}
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="ml-4 shrink-0 text-white/40 transition-all duration-300 group-hover:text-white/80 group-hover:translate-x-1"
                                    aria-hidden="true"
                                >
                                    <path d="M9 6l6 6-6 6" />
                                </svg>
                            </Button>
                        </div>

                        {/* CTA secundário */}
                        <a
                            href="#estrutura"
                            className="group flex items-center gap-4 text-white transition-all duration-300
               active:scale-95
               focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                            aria-label="Conheça nossa estrutura"
                        >
                            {/* Círculo do play */}
                            <span
                                className="relative w-16 h-16 rounded-full border-2 border-white/80 bg-white/5 backdrop-blur-sm
                   flex items-center justify-center shrink-0
                   transition-all duration-300
                   group-hover:border-orange group-hover:bg-orange group-hover:scale-110
                   group-hover:shadow-[0_0_28px_rgba(255,106,0,0.5)]"
                            >
                                {/* Anel pulsante no hover */}
                                <span
                                    className="absolute inset-0 rounded-full border border-orange opacity-0
                       group-hover:opacity-100 group-hover:animate-ping"
                                    aria-hidden="true"
                                />

                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="relative ml-0.5 shrink-0 text-white transition-transform duration-300 group-hover:scale-110"
                                    aria-hidden="true"
                                >
                                    <path d="M6 4l14 8-14 8V4z" />
                                </svg>
                            </span>

                            {/* Texto */}
                            <span
                                className="font-display uppercase italic font-bold text-base tracking-wide leading-tight text-left
                   transition-colors duration-300 group-hover:text-amber-500"
                            >
                                Conheça
                                <br />
                                Nossa Estrutura
                            </span>
                        </a>
                    </div>
                </div>

                {/* ======================================
            COLUNA DIREITA — MODALIDADES
        ====================================== */}

                <div className="lg:col-span-4 w-full mt-4 lg:mt-0">

                    <div
                        ref={cardsRef}
                        className="flex flex-col gap-3 max-w-md lg:ml-auto"
                    >
                        {modalities.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group relative flex items-center gap-5 p-4 md:p-5 rounded-2xl border border-white/[0.07] bg-black/55 backdrop-blur-md transition-all duration-400 hover:border-orange/50 hover:bg-black/80 hover:-translate-x-2 hover:shadow-[0_0_30px_rgba(243,107,33,0.10)]"
                                >
                                    {/* Destaque lateral no hover */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 rounded-full bg-orange shadow-[0_0_15px_rgba(243,107,33,0.8)] transition-all duration-300 group-hover:h-3/4" />

                                    {/* Ícone */}
                                    <div className="w-16 h-16 rounded-full border border-orange/50 flex items-center justify-center text-orange shrink-0 transition-all duration-300 group-hover:bg-orange/10 group-hover:border-orange group-hover:shadow-[0_0_20px_rgba(243,107,33,0.15)]">
                                        <Icon />
                                    </div>

                                    {/* Informações */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-display font-bold italic uppercase text-white text-lg md:text-xl">
                                            {item.title}
                                        </p>

                                        <p className="text-gray-light text-sm leading-snug mt-1">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Seta */}
                                    <div className="text-white/40 transition-all duration-300 group-hover:text-orange group-hover:translate-x-1">
                                        <ChevronRight />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ======================================
          INDICADOR DE SCROLL
      ====================================== */}

            <div
                ref={scrollRef}
                className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-10"
            >
                <div className="w-3.5 h-3.5 rounded-full bg-orange shadow-[0_0_15px_rgba(243,107,33,0.8)] animate-pulse" />

                <div className="w-px h-24 bg-gradient-to-b from-orange via-white/40 to-white/10" />

                <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                    Scroll
                </span>

                <div className="text-white/60 animate-bounce">
                    <ChevronDown />
                </div>
            </div>
        </section>
    );
}
