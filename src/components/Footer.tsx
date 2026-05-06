import { KSLogo } from './KSLogo';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <KSLogo compact />

          <p className="text-xs text-muted-foreground text-center max-w-sm leading-relaxed">
            Este site pode receber comissão por compras realizadas através dos links.
            Isso não altera o preço final para você.
          </p>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} KS Deals
          </p>
        </div>
      </div>
    </footer>
  );
}