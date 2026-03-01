import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, Category } from '@/lib/types';
import { getProductsByCategory } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const categoryKey = slug as Category;
  const category = CATEGORIES[categoryKey];
  const products = getProductsByCategory(categoryKey);

  if (!category) {
    return (
      <main className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Categoria não encontrada</h1>
        <Link to="/" className="text-primary mt-4 inline-block">Voltar ao início</Link>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} /> Voltar
      </Link>
      <h1 className="text-2xl font-extrabold text-foreground mb-2">
        {category.icon} {category.label}
      </h1>
      <p className="text-muted-foreground text-sm mb-8">
        Os melhores produtos selecionados nesta categoria.
      </p>

      {products.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">Nenhum produto nesta categoria ainda.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
