import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  emoji?: string;
  products: Product[];
  id?: string;
}

export function ProductSection({ title, emoji, products, id }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="py-10" id={id}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-8"
        >
          {emoji && <span className="text-2xl">{emoji}</span>}
          <h2 className="section-title">{title}</h2>
          <div className="flex-1 h-px bg-border ml-4" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
