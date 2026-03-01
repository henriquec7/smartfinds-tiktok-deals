import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface Props {
  title: string;
  emoji?: string;
  products: Product[];
}

export function ProductSection({ title, emoji, products }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="py-10">
      <h2 className="text-xl font-extrabold text-foreground mb-6">
        {emoji && <span className="mr-2">{emoji}</span>}
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
