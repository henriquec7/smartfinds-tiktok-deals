import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, Category } from '@/lib/types';
import { useProductsByCategory } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const categoryKey = slug as Category;
  const category = CATEGORIES[categoryKey];
  const { data: products = [], isLoading } = useProductsByCategory(categoryKey);

  if (!category) {
    return (
      <main className="container py-20 text-center">
        <h1 className="text-2xl font-heading font-bold text-foreground uppercase">
          Categoria não encontrada
        </h1>
        <Link to="/" className="text-primary mt-4 inline-block font-semibold">
          Voltar ao início
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> VOLTAR
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="warm-section rounded-3xl p-6 md:p-8 mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground uppercase">
            {category.label}
          </h1>
        </div>

        <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
          Produtos selecionados nesta categoria para você comparar com calma, ver os principais benefícios e conferir a oferta atual na loja oficial.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-primary" />
            Curadoria por categoria
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-primary" />
            Redirecionamento seguro
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="py-20 text-center text-muted-foreground">Carregando...</div>
      ) : products.length === 0 ? (
        <div className="warm-section rounded-3xl py-20 text-center">
          <p className="text-muted-foreground font-medium">
            Nenhum produto nesta categoria ainda.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="section-title">PRODUTOS SELECIONADOS</h2>
            <div className="flex-1 h-px bg-border ml-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}