import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, Category } from '@/lib/types';
import { useProductsByCategory } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const categoryKey = slug as Category;
  const category = CATEGORIES[categoryKey];
  const { data: products = [], isLoading } = useProductsByCategory(categoryKey);

  if (!category) {
    return (
      <main className="container py-20 text-center">
        <h1 className="text-2xl font-heading font-bold text-foreground uppercase">Categoria não encontrada</h1>
        <Link to="/" className="text-primary mt-4 inline-block font-semibold">Voltar ao início</Link>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium mb-8 transition-colors">
        <ArrowLeft size={16} /> VOLTAR
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground uppercase">{category.label}</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-10">
          Os melhores produtos selecionados nesta categoria com custo-benefício incrível.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="py-20 text-center text-muted-foreground">Carregando...</div>
      ) : products.length === 0 ? (
        <div className="warm-section rounded-3xl py-20 text-center">
          <p className="text-muted-foreground font-medium">Nenhum produto nesta categoria ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
