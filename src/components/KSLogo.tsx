import logo from "@/assets/ks-deals-logo.png";

export function KSLogo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src={logo}
      alt="KS Deals"
      className={`shrink-0 w-auto object-contain ${compact ? "h-10" : "h-12 md:h-16"}`}
      loading="eager"
      decoding="async"
    />
  );
}
