import { useEffect, useState } from 'react';
import { Smartphone, Share, Plus, MoreVertical, Lock } from 'lucide-react';

export default function InstallAdminPage() {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) setPlatform('ios');
    else if (/android/.test(ua)) setPlatform('android');
    else setPlatform('desktop');

    // Inject admin manifest only on this page
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = '/manifest-admin.json';
    link.id = 'admin-manifest';
    document.head.appendChild(link);

    const theme = document.createElement('meta');
    theme.name = 'theme-color';
    theme.content = '#0a0a0a';
    theme.id = 'admin-theme-color';
    document.head.appendChild(theme);

    const apple = document.createElement('meta');
    apple.name = 'apple-mobile-web-app-capable';
    apple.content = 'yes';
    apple.id = 'admin-apple-capable';
    document.head.appendChild(apple);

    const appleTitle = document.createElement('meta');
    appleTitle.name = 'apple-mobile-web-app-title';
    appleTitle.content = 'KS Admin';
    appleTitle.id = 'admin-apple-title';
    document.head.appendChild(appleTitle);

    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = '/favicon.png';
    appleIcon.id = 'admin-apple-icon';
    document.head.appendChild(appleIcon);

    return () => {
      ['admin-manifest', 'admin-theme-color', 'admin-apple-capable', 'admin-apple-title', 'admin-apple-icon']
        .forEach((id) => document.getElementById(id)?.remove());
    };
  }, []);

  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <Smartphone size={28} className="text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-heading font-bold uppercase tracking-tight text-foreground">
            Instalar KS Admin
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Adicione o painel à tela inicial do seu celular como um app.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={16} className="text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Acesso restrito
            </span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            O app instalado abre direto na tela de login. Apenas o seu e-mail de administrador
            consegue entrar — qualquer outra pessoa será bloqueada na autenticação.
          </p>
        </div>

        {platform === 'ios' && (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-foreground">📱 No iPhone / iPad (Safari)</h2>
            <ol className="space-y-3 text-sm text-foreground/90">
              <li className="flex gap-3">
                <span className="font-bold text-primary">1.</span>
                <span>Abra esta página no <strong>Safari</strong> (não funciona no Chrome do iOS).</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">2.</span>
                <span className="flex items-center gap-1">
                  Toque no ícone de compartilhar
                  <Share size={16} className="inline" />
                  na barra inferior.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">3.</span>
                <span className="flex items-center gap-1">
                  Selecione <strong>Adicionar à Tela de Início</strong>
                  <Plus size={16} className="inline" />.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">4.</span>
                <span>Confirme em <strong>Adicionar</strong>. Pronto, o ícone KS Admin aparece na tela inicial.</span>
              </li>
            </ol>
          </div>
        )}

        {platform === 'android' && (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-foreground">🤖 No Android (Chrome)</h2>
            <ol className="space-y-3 text-sm text-foreground/90">
              <li className="flex gap-3">
                <span className="font-bold text-primary">1.</span>
                <span>Abra esta página no <strong>Chrome</strong>.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">2.</span>
                <span className="flex items-center gap-1">
                  Toque nos três pontos
                  <MoreVertical size={16} className="inline" />
                  no canto superior direito.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">3.</span>
                <span>Selecione <strong>Instalar app</strong> ou <strong>Adicionar à tela inicial</strong>.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">4.</span>
                <span>Confirme. O app KS Admin aparece junto dos outros apps.</span>
              </li>
            </ol>
          </div>
        )}

        {platform === 'desktop' && (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-foreground">💻 No computador (Chrome / Edge)</h2>
            <ol className="space-y-3 text-sm text-foreground/90">
              <li className="flex gap-3">
                <span className="font-bold text-primary">1.</span>
                <span>Procure o ícone de instalar na barra de endereço (no canto direito).</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">2.</span>
                <span>Clique e confirme <strong>Instalar</strong>.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">3.</span>
                <span>Para a melhor experiência, abra esta página no celular para instalar como app mobile.</span>
              </li>
            </ol>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-6">
          ⚠️ A instalação só funciona no site publicado (não no preview do editor).
        </p>
      </div>
    </main>
  );
}