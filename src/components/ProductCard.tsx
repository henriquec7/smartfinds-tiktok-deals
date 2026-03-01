import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const BADGE_LABELS: Record<string, string> = {
  destaque: '🔥 Destaque',
  'mais-visto': '👀 Mais Visto',
  'bem-avaliado': '⭐ Bem Avaliado',
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="group bg-card rounded-lg border border-border card-shadow hover:card-hover-shadow transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      <Link to={`/produto/${product.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-foreground">
            {BADGE_LABELS[product.badge]}
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-bold text-sm leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{product.description}</p>

        {product.price && (
          <p className="text-base font-extrabold text-primary mt-3">{product.price}</p>
        )}

        <div className="mt-auto pt-3">
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-full inline-flex items-center justify-center gap-2 cta-gradient cta-shadow text-primary-foreground font-semibold text-sm py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            Ver Preço Atual <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
