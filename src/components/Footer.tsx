import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-heading font-bold text-lg text-foreground">
            <Sparkles size={18} className="text-primary" />
            SMARTFINDS
          </div>
          <p className="text-xs text-muted-foreground text-center max-w-sm">
            Este site pode receber comissão por compras realizadas através dos links. Isso não altera o preço final para você.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SmartFinds
          </p>
        </div>
      </div>
    </footer>
  );
}
