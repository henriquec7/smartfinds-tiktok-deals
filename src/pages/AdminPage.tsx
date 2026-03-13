import { useState } from 'react';
import { Product, Category, CATEGORIES } from '@/lib/types';
import { useProducts, useSaveProduct, useDeleteProduct } from '@/hooks/useProducts';
import { Plus, Trash2, Edit, ArrowLeft, LogOut } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';

const emptyProduct: Omit<Product, 'id' | 'createdAt'> = {
  title: '',
  description: '',
  benefits: [''],
  whyWorthIt: '',
  imageUrl: '',
  affiliateUrl: '',
  category: 'cozinha-pratica',
  badge: undefined,
  price: '',
};

export default function AdminPage() {
  const { isAdmin, loading } = useAdmin();
  const { data: products = [], isLoading } = useProducts();
  const saveProductMutation = useSaveProduct();
  const deleteProductMutation = useDeleteProduct();
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [showForm, setShowForm] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Verificando acesso...</div>;
  if (!isAdmin) return <Navigate to="/login" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.affiliateUrl) {
      toast.error('Preencha pelo menos título e link de afiliado');
      return;
    }

    const product: Product = {
      ...form,
      id: editing?.id || crypto.randomUUID(),
      benefits: form.benefits.filter(b => b.trim()),
      createdAt: editing?.createdAt || new Date().toISOString(),
    };

    try {
      await saveProductMutation.mutateAsync(product);
      setShowForm(false);
      setEditing(null);
      setForm(emptyProduct);
      toast.success(editing ? 'Produto atualizado!' : 'Produto adicionado!');
    } catch (err: any) {
      toast.error('Erro ao salvar: ' + (err.message || 'tente novamente'));
    }
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setForm({
      title: product.title,
      description: product.description,
      benefits: product.benefits.length > 0 ? product.benefits : [''],
      whyWorthIt: product.whyWorthIt,
      imageUrl: product.imageUrl,
      affiliateUrl: product.affiliateUrl,
      category: product.category,
      badge: product.badge,
      price: product.price || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Remover este produto?')) {
      try {
        await deleteProductMutation.mutateAsync(id);
        toast.success('Produto removido');
      } catch (err: any) {
        toast.error('Erro ao remover: ' + (err.message || 'tente novamente'));
      }
    }
  };

  return (
    <main className="container py-8 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} /> Voltar ao site
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-foreground">⚙️ Painel Admin</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm(emptyProduct); }}
            className="btn-cta text-primary-foreground font-bold text-base py-3 px-6 rounded-xl"
          >
            <Plus size={20} /> Novo Produto
          </button>
          <button
            onClick={async () => { await supabase.auth.signOut(); toast.success('Deslogado!'); }}
            className="inline-flex items-center gap-2 bg-secondary text-muted-foreground font-medium text-sm py-2.5 px-3 rounded-lg hover:text-foreground transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 mb-8 space-y-4">
          <h2 className="font-bold text-foreground">{editing ? 'Editar Produto' : 'Novo Produto'}</h2>

          <input
            placeholder="Título (focado em benefício)"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full bg-secondary text-foreground rounded-lg px-4 py-2.5 text-sm border-0 outline-none focus:ring-2 ring-primary"
          />

          <textarea
            placeholder="Descrição curta e persuasiva"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full bg-secondary text-foreground rounded-lg px-4 py-2.5 text-sm border-0 outline-none focus:ring-2 ring-primary resize-none"
          />

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Benefícios</label>
            {form.benefits.map((b, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={b}
                  onChange={e => {
                    const benefits = [...form.benefits];
                    benefits[i] = e.target.value;
                    setForm({ ...form, benefits });
                  }}
                  placeholder={`Benefício ${i + 1}`}
                  className="flex-1 bg-secondary text-foreground rounded-lg px-4 py-2 text-sm border-0 outline-none focus:ring-2 ring-primary"
                />
                {form.benefits.length > 1 && (
                  <button type="button" onClick={() => setForm({ ...form, benefits: form.benefits.filter((_, j) => j !== i) })} className="text-destructive p-2">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => setForm({ ...form, benefits: [...form.benefits, ''] })} className="text-xs text-primary font-medium">
              + Adicionar benefício
            </button>
          </div>

          <textarea
            placeholder="Por que vale a pena?"
            value={form.whyWorthIt}
            onChange={e => setForm({ ...form, whyWorthIt: e.target.value })}
            rows={2}
            className="w-full bg-secondary text-foreground rounded-lg px-4 py-2.5 text-sm border-0 outline-none focus:ring-2 ring-primary resize-none"
          />

          <ImageUpload
            value={form.imageUrl}
            onChange={(url) => setForm({ ...form, imageUrl: url })}
          />

          <input
            placeholder="Link de afiliado (Shopee, Amazon, etc)"
            value={form.affiliateUrl}
            onChange={e => setForm({ ...form, affiliateUrl: e.target.value })}
            className="w-full bg-secondary text-foreground rounded-lg px-4 py-2.5 text-sm border-0 outline-none focus:ring-2 ring-primary"
          />

          <input
            placeholder="Preço (ex: R$ 49,90)"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            className="w-full bg-secondary text-foreground rounded-lg px-4 py-2.5 text-sm border-0 outline-none focus:ring-2 ring-primary"
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value as Category })}
              className="bg-secondary text-foreground rounded-lg px-4 py-2.5 text-sm border-0 outline-none focus:ring-2 ring-primary"
            >
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <option key={key} value={key}>{cat.label}</option>
              ))}
            </select>

            <select
              value={form.badge || ''}
              onChange={e => setForm({ ...form, badge: (e.target.value || undefined) as Product['badge'] })}
              className="bg-secondary text-foreground rounded-lg px-4 py-2.5 text-sm border-0 outline-none focus:ring-2 ring-primary"
            >
              <option value="">Sem selo</option>
              <option value="destaque">🔥 Destaque</option>
              <option value="mais-visto">👀 Mais Visto</option>
              <option value="bem-avaliado">⭐ Bem Avaliado</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saveProductMutation.isPending}
              className="btn-cta text-primary-foreground font-semibold text-sm py-2.5 px-6 rounded-lg disabled:opacity-50"
            >
              {saveProductMutation.isPending ? 'Salvando...' : editing ? 'Salvar' : 'Adicionar'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="bg-secondary text-foreground font-medium text-sm py-2.5 px-6 rounded-lg">
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Product list */}
      {isLoading ? (
        <div className="text-center text-muted-foreground py-10">Carregando...</div>
      ) : (
        <div className="space-y-3">
          {products.map(p => (
            <div key={p.id} className="flex items-center gap-4 bg-card border border-border rounded-lg p-4">
              <img src={p.imageUrl || '/placeholder.svg'} alt="" className="w-16 h-12 object-cover rounded-md shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{CATEGORIES[p.category]?.label} {p.badge && `· ${p.badge}`}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => handleEdit(p)} className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-destructive">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
