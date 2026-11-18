"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_TEXT =
 "No Box Curumim, cada repetição é um passo em direção à sua melhor versão. Não treinamos apenas corpos — construímos disciplina, resiliência e confiança. Aqui, o movimento transforma.";

export function Manifesto() {
 const sectionRef = useRef<HTMLElement>(null);
 const textRef = useRef<HTMLParagraphElement>(null);

 useGSAP(
  () => {
   const ctx = gsap.context(() => {
    // Split text em palavras para reveal progressivo
    const words = textRef.current?.querySelectorAll(".manifesto-word");
    if (!words || words.length === 0) return;

    // Desktop & Mobile: scrub sincronizado ao scroll
    // Mobile adapta a distância mas mantém o scrub
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
     gsap.fromTo(
      words,
      { opacity: 0.1, y: 20 },
      {
       opacity: 1,
       y: 0,
       stagger: 0.05,
       ease: "none",
       scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 60%",
        scrub: 1,
       },
      }
     );
    });

    mm.add("(max-width: 767px)", () => {
     gsap.fromTo(
      words,
      { opacity: 0.15, y: 10 },
      {
       opacity: 1,
       y: 0,
       stagger: 0.03,
       ease: "none",
       scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 50%",
        scrub: 1,
       },
      }
     );
    });
   }, sectionRef);

   return () => ctx.revert();
  },
  { scope: sectionRef }
 );

 // Renderiza palavras como spans individuais para animação
 const renderWords = () => {
  return MANIFESTO_TEXT.split(" ").map((word, i) => (
   <span
    key={i}
    className="manifesto-word inline-block mr-[0.3em] transition-colors duration-300"
   >
    {word}
   </span>
  ));
 };

 return (
  <section
   ref={sectionRef}
   className="relative py-32 md:py-48 px-6 bg-black"
   aria-label="Manifesto"
  >
   <div className="container mx-auto max-w-4xl">
    {/* Linha decorativa superior */}
    <div className="w-16 h-1 bg-orange mb-12" aria-hidden="true" />

    <p
     ref={textRef}
     className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic leading-[1.1] tracking-tight text-white"
    >
     {renderWords()}
    </p>

    {/* Linha decorativa inferior */}
    <div className="w-16 h-1 bg-orange mt-12 ml-auto" aria-hidden="true" />
   </div>
  </section>
 );
}