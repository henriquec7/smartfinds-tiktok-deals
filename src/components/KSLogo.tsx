export function KSLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 text-foreground">
      <svg
        width={compact ? 38 : 46}
        height={compact ? 38 : 46}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M18 22H46L50 54H14L18 22Z"
          fill="currentColor"
        />
        <path
          d="M23 22C23 12.5 28.5 7 32 7C35.5 7 41 12.5 41 22"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M22 48L36 33L24 33L38 17"
          stroke="white"
          strokeWidth="7"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M43 30C33 28 28 31 28 36C28 42 38 41 38 46C38 50 31 51 24 48"
          stroke="white"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>

      {!compact && (
        <span className="font-heading text-xl md:text-2xl font-bold tracking-tight leading-none">
          KS <span className="font-medium italic">Deals</span>
        </span>
      )}
    </div>
  );
}
