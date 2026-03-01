export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container py-8 text-center">
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Este site pode receber comissão por compras realizadas através dos links. Isso não altera o preço para você.
        </p>
        <p className="text-xs text-muted-foreground mt-3">
          © {new Date().getFullYear()} SmartFinds. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
