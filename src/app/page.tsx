import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Modalidades } from "@/components/sections/Modalidades";
import { Metodologia } from "@/components/sections/Metodologia";
import { Estrutura } from "@/components/sections/Estrutura";
import { Comunidade } from "@/components/sections/Comunidade";
import { FAQ } from "@/components/sections/FAQ";
import { Contato } from "@/components/sections/Contato";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-clip">
      <div id="hero">
        <Hero />
      </div>

      <Manifesto />

      <div id="modalidades" className="scroll-mt-20">
        <Modalidades />
      </div>

      <div id="metodologia" className="scroll-mt-20">
        <Metodologia />
      </div>

      <div id="estrutura" className="scroll-mt-20">
        <Estrutura />
      </div>

      <div id="comunidade" className="scroll-mt-20">
        <Comunidade />
      </div>

      <FAQ />

      <div id="contato" className="scroll-mt-20">
        <Contato />
      </div>
    </main>
  );
}