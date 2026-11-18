import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: "primary" | "outline" | "ghost";
 size?: "sm" | "md" | "lg";
 icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
 ({ className, variant = "primary", size = "md", icon, children, ...props }, ref) => {
  const baseStyles =
   "inline-flex items-center justify-center gap-2 font-display font-semibold uppercase italic tracking-wide transition-all duration-300 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
   primary:
    "bg-orange text-black hover:bg-orange-hover hover:shadow-[0_0_24px_rgba(243,107,33,0.4)]",
   outline:
    "border border-white/30 text-white hover:border-orange hover:text-orange bg-transparent",
   ghost: "text-white hover:text-orange bg-transparent",
  };

  const sizes = {
   sm: "px-4 py-2 text-sm",
   md: "px-6 py-3 text-base",
   lg: "px-8 py-4 text-lg",
  };

  return (
   <button
    ref={ref}
    className={clsx(baseStyles, variants[variant], sizes[size], className)}
    {...props}
   >
    {icon && <span className="shrink-0">{icon}</span>}
    {children}
   </button>
  );
 }
);

Button.displayName = "Button";