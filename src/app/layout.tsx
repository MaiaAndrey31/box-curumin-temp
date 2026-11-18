import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Box Curumim Gym | Adamantina - SP",
  description:
    "Musculação, MMT e Parkour Infantil em Adamantina. Treinamento personalizado, acompanhamento profissional e uma comunidade que evolui junto.",
  keywords: [
    "academia Adamantina",
    "musculação",
    "MMT",
    "parkour infantil",
    "treino personalizado",
    "Box Curumim",
  ],
  openGraph: {
    title: "Box Curumim Gym | Movimento que Transforma",
    description:
      "Saúde, performance, disciplina e evolução. Conheça o espaço e agende sua experiência.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body suppressHydrationWarning className="min-h-screen bg-black text-white antialiased selection:bg-orange selection:text-black">
        <Header />
        {children}
      </body>
    </html>
  );
}