import { useParams, Link } from 'react-router-dom';
import { getProduct, getProducts } from '@/lib/products';
import { CATEGORIES } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { ArrowLeft, ExternalLink, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id!);

  if (!product) {
    return (
      <main className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Produto não encontrado</h1>
        <Link to="/" className="text-primary mt-4 inline-block">Voltar ao início</Link>
      </main>
    );
  }

  const related = getProducts()
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const category = CATEGORIES[product.category];

  return (
    <main className="container py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={16} /> Voltar
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid md:grid-cols-2 gap-8"
      >
        {/* Image */}
        <div className="rounded-xl overflow-hidden bg-secondary aspect-square md:aspect-[4/3]">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {category && (
            <Link
              to={`/categoria/${category.slug}`}
              className="text-xs font-medium text-primary bg-primary/10 self-start px-2.5 py-1 rounded-full mb-3"
            >
              {category.icon} {category.label}
            </Link>
          )}

          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
            {product.title}
          </h1>

          <p className="text-muted-foreground mt-3 leading-relaxed">{product.description}</p>

          {product.price && (
            <p className="text-2xl font-extrabold text-primary mt-4">{product.price}</p>
          )}

          {/* Benefits */}
          <ul className="mt-5 space-y-2">
            {product.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <Check size={16} className="text-accent mt-0.5 shrink-0" />
                {b}
              </li>
            ))}
          </ul>

          {/* Why worth it */}
          <div className="mt-6 bg-secondary rounded-lg p-4">
            <h3 className="font-bold text-sm text-foreground mb-1">💡 Por que vale a pena?</h3>
            <p className="text-sm text-muted-foreground">{product.whyWorthIt}</p>
          </div>

          {/* CTA */}
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-6 inline-flex items-center justify-center gap-2 cta-gradient cta-shadow text-primary-foreground font-bold text-base py-4 px-8 rounded-xl hover:opacity-90 transition-opacity animate-pulse-cta"
          >
            Ver Oferta na Loja <ExternalLink size={18} />
          </a>

          <p className="text-[11px] text-muted-foreground mt-3">
            🔒 Este site pode receber comissão por compras realizadas através dos links.
          </p>
        </div>
      </motion.div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-extrabold text-foreground mb-6">Quem viu este produto também gostou</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
