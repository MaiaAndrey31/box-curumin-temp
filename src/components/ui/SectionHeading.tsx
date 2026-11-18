import { clsx } from "clsx";

interface SectionHeadingProps {
 title: string;
 subtitle?: string;
 highlight?: string;
 align?: "left" | "center";
 className?: string;
}

export function SectionHeading({
 title,
 subtitle,
 highlight,
 align = "left",
 className,
}: SectionHeadingProps) {
 return (
  <div
   className={clsx(
    "flex flex-col gap-3 mb-12",
    align === "center" ? "items-center text-center" : "items-start",
    className
   )}
  >
   {/* Barras diagonais decorativas */}
   <div className="flex gap-1 mb-2" aria-hidden="true">
    {[...Array(5)].map((_, i) => (
     <div
      key={i}
      className="w-1 h-6 bg-orange skew-x-[-20deg] opacity-80"
     />
    ))}
   </div>

   {subtitle && (
    <p className="text-gray-light text-sm md:text-base uppercase tracking-widest font-medium">
     {subtitle}
    </p>
   )}

   <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold italic leading-[0.95]">
    {title}{" "}
    {highlight && <span className="text-orange">{highlight}</span>}
   </h2>
  </div>
 );
}