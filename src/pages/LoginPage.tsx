import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ShoppingBag, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error('Credenciais inválidas');
      setLoading(false);
      return;
    }
    // Check admin role
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Erro ao verificar usuário');
      setLoading(false);
      return;
    }
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin');

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      toast.error('Acesso negado. Você não é administrador.');
      setLoading(false);
      return;
    }

    toast.success('Bem-vindo, admin!');
    navigate('/admin');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={24} className="text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-heading font-bold uppercase tracking-tight text-foreground">
            ÁREA RESTRITA
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Acesso exclusivo para administradores</p>
        </div>

        <form onSubmit={handleLogin} className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm border-0 outline-none focus:ring-2 ring-primary"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm border-0 outline-none focus:ring-2 ring-primary"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-cta text-primary-foreground font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            <Lock size={18} />
            {loading ? 'Entrando...' : 'ENTRAR'}
          </button>
        </form>
      </div>
    </main>
  );
}
