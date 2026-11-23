"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "INÍCIO", href: "#hero" },
  { label: "MODALIDADES", href: "#modalidades" },
  { label: "ESTRUTURA", href: "#estrutura" },
  { label: "METODOLOGIA", href: "#metodologia" },
  { label: "COMUNIDADE", href: "#comunidade" },
  { label: "CONTATO", href: "#contato" },
];

const CalendarIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const headerRef = useRef<HTMLElement>(null);

  // Animação de entrada
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          headerRef.current,
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2,
            clearProps: "transform", // não deixa transform residual no header
          }
        );
      });

      return () => mm.revert();
    },
    { scope: headerRef }
  );

  // Estado de scroll (fundo mais sólido + header mais compacto)
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
      if (window.scrollY < 100) setActiveId("hero");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Link ativo conforme a seção visível
  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.href.slice(1))
    ).filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Trava o scroll da página com o menu aberto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Fecha com ESC e ao passar para o layout desktop
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onChange);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          isMenuOpen
            ? "bg-transparent border-transparent"
            : isScrolled
            ? "bg-black/85 backdrop-blur-md border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            : "bg-black/40 backdrop-blur-sm border-white/5"
        }`}
      >
        <div
          className={`container mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between xl:grid xl:grid-cols-[1fr_auto_1fr] transition-[height] duration-300 ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link
            href="/#hero"
            onClick={closeMenu}
            className="relative z-50 shrink-0 justify-self-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            aria-label="Box Curumim Gym - ir para o início"
          >
            <Image
              src="/assets/logoCurumim.webp"
              alt="Box Curumim Gym"
              width={140}
              height={40}
              className={`w-auto object-contain transition-all duration-300 ${
                isScrolled ? "h-9" : "h-10"
              }`}
              priority
            />
          </Link>

          {/* Navegação desktop (centralizada de verdade) */}
          <nav
            className="hidden xl:flex items-center gap-8"
            aria-label="Navegação principal"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.slice(1);

              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`group relative py-2 font-display text-sm font-semibold italic uppercase tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange ${
                    isActive ? "text-orange" : "text-white hover:text-orange"
                  }`}
                >
                  {link.label}

                  {/* Sublinhado animado */}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[2px] w-full origin-left bg-orange transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          {/* CTA desktop */}
          <a
            href="#contato"
            className="hidden xl:inline-flex items-center gap-2 justify-self-end px-5 py-2.5 rounded-full border border-orange bg-transparent text-orange font-display text-xs font-bold italic uppercase tracking-wide transition-all duration-300 hover:bg-orange hover:text-black hover:shadow-[0_0_24px_rgba(243,107,33,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            <CalendarIcon />
            Agende sua Experiência
          </a>

          {/* Botão do menu mobile */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="xl:hidden relative z-50 w-11 h-11 -mr-2 flex flex-col items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2 bg-orange" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2 bg-orange" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Menu mobile: FORA do <header> para o fixed cobrir a tela toda */}
      <div
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
        className={`xl:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl overflow-y-auto transition-all duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Brilho decorativo */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-orange/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative min-h-full flex flex-col justify-between px-6 md:px-12 pt-28 pb-[max(2rem,env(safe-area-inset-bottom))]">
          {/* Links */}
          <nav
            className="flex flex-col w-full max-w-md mx-auto"
            aria-label="Navegação mobile"
          >
            {NAV_LINKS.map((link, index) => {
              const isActive = activeId === link.href.slice(1);

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  style={{
                    transitionDelay: isMenuOpen ? `${150 + index * 60}ms` : "0ms",
                  }}
                  className={`flex items-baseline gap-4 py-4 border-b border-white/10 font-display text-3xl font-bold italic uppercase tracking-wide transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange ${
                    isMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  } ${isActive ? "text-orange" : "text-white hover:text-orange"}`}
                >
                  <span className="text-xs font-medium not-italic tracking-[0.2em] text-orange/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA + logo */}
          <div
            style={{
              transitionDelay: isMenuOpen ? `${150 + NAV_LINKS.length * 60}ms` : "0ms",
            }}
            className={`w-full max-w-md mx-auto mt-10 flex flex-col items-center gap-8 transition-all duration-500 ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <a
              href="#contato"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-orange text-black font-display text-base font-bold italic uppercase tracking-wide transition-all duration-300 hover:bg-orange-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              <CalendarIcon size={20} />
              Agende sua Experiência
            </a>

            <Image
              src="/assets/logoCurumim.webp"
              alt=""
              width={100}
              height={30}
              className="h-8 w-auto object-contain opacity-30"
            />
          </div>
        </div>
      </div>
    </>
  );
}