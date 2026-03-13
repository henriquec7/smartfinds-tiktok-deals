import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';

const BADGE_CONFIG: Record<string, { label: string; className: string }> = {
  destaque: { label: '🔥 DESTAQUE', className: 'bg-primary text-primary-foreground' },
  'mais-visto': { label: '👀 MAIS VISTO', className: 'bg-foreground text-background' },
  'bem-avaliado': { label: '⭐ TOP AVALIADO', className: 'bg-accent text-accent-foreground' },
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const badge = product.badge ? BADGE_CONFIG[product.badge] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="card-product group"
    >
      <Link to={`/produto/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {badge && (
          <span className={`badge-tag absolute top-3 left-3 ${badge.className}`}>
            {badge.label}
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-heading font-bold text-sm leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product.title}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {product.price && (
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-heading font-bold text-primary">{product.price}</span>
          </div>
        )}

        <div className="mt-auto pt-4">
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-cta w-full py-3 px-4 text-xs uppercase tracking-wider"
            onClick={(e) => e.stopPropagation()}
          >
            VER PREÇO ATUAL <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
