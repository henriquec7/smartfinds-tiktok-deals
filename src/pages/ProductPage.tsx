import { useParams, Link } from 'react-router-dom';
import { getProduct, getProducts } from '@/lib/products';
import { CATEGORIES } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { ArrowLeft, ExternalLink, Check, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id!);

  if (!product) {
    return (
      <main className="container py-20 text-center">
        <h1 className="text-2xl font-heading font-bold text-foreground uppercase">Produto não encontrado</h1>
        <Link to="/" className="text-primary mt-4 inline-block font-semibold">Voltar ao início</Link>
      </main>
    );
  }

  const related = getProducts()
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const category = CATEGORIES[product.category];

  return (
    <main className="container py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium mb-8 transition-colors">
        <ArrowLeft size={16} /> VOLTAR
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-8 md:gap-12"
      >
        {/* Image */}
        <div className="rounded-3xl overflow-hidden bg-secondary aspect-square relative group">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
          />
          {product.badge && (
            <span className="badge-tag absolute top-4 left-4 bg-primary text-primary-foreground">
              {product.badge === 'destaque' ? '🔥 DESTAQUE' : product.badge === 'mais-visto' ? '👀 MAIS VISTO' : '⭐ TOP'}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {category && (
            <Link
              to={`/categoria/${category.slug}`}
              className="text-xs font-bold uppercase tracking-widest text-primary self-start mb-4"
            >
              {category.icon} {category.label}
            </Link>
          )}

          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight uppercase">
            {product.title}
          </h1>

          <p className="text-muted-foreground mt-4 leading-relaxed">{product.description}</p>

          {product.price && (
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-3xl font-heading font-bold text-primary">{product.price}</span>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">BENEFÍCIOS</h3>
            {product.benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} className="text-accent" />
                </div>
                <span className="text-sm text-foreground">{b}</span>
              </motion.div>
            ))}
          </div>

          {/* Why worth it */}
          <div className="mt-6 warm-section rounded-2xl p-5">
            <h3 className="font-heading font-bold text-sm text-foreground mb-2 uppercase">💡 POR QUE VALE A PENA?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{product.whyWorthIt}</p>
          </div>

          {/* CTA */}
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-cta mt-8 py-4 px-8 text-sm uppercase tracking-widest"
          >
            VER OFERTA NA LOJA <ExternalLink size={16} />
          </a>

          <div className="flex items-center gap-2 mt-4 text-muted-foreground">
            <Shield size={14} />
            <p className="text-[11px]">
              Este site pode receber comissão por compras realizadas através dos links.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="section-title">QUEM VIU TAMBÉM GOSTOU</h2>
            <div className="flex-1 h-px bg-border ml-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
