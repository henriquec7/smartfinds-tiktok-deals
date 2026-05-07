import logo from "@/assets/ks-deals-logo.png";

export function KSLogo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src={logo}
      alt="KS Deals"
      className={`shrink-0 w-auto object-contain ${compact ? "h-8" : "h-9 md:h-11"}`}
      loading="eager"
      decoding="async"
    />
  );
}
