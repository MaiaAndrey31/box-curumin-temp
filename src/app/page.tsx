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
  <main className="relative w-full overflow-hidden">
   <Hero />
   <Manifesto />
   <Modalidades />
   <Metodologia />
   <Estrutura />
   <Comunidade />
   <FAQ />
   <Contato />
  </main>
 );
}