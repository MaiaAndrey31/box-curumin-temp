"use client";

import { useState, useRef } from "react";
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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Animação de entrada do header
        gsap.fromTo(
          headerRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );
      }, headerRef);

      return () => ctx.revert();
    },
    { scope: headerRef }
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 shrink-0">
          <Image
            src="/assets/logoCurumim.webp"
            alt="Box Curumim Gym"
            width={140}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-display text-sm font-semibold italic uppercase tracking-wide text-white hover:text-orange transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button Desktop */}
        <a
          href="#contato"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange bg-transparent text-orange font-display text-xs font-bold italic uppercase tracking-wide hover:bg-orange hover:text-black transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
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
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Agende sua Experiência
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-out-expo ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-display text-2xl font-bold italic uppercase tracking-wide text-white hover:text-orange transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          onClick={() => setIsMenuOpen(false)}
          className="mt-4 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange text-black font-display text-base font-bold italic uppercase tracking-wide hover:bg-orange-hover transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
        >
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
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Agende sua Experiência
        </a>

        {/* Logo no menu mobile */}
        <div className="absolute bottom-8 opacity-30">
          <Image
            src="/assets/logoCurumim.webp"
            alt="Box Curumim Gym"
            width={100}
            height={30}
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
}