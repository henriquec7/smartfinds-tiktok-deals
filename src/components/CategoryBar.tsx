import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/lib/types';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const categoryColors: Record<string, string> = {
  'cozinha-pratica': 'border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50',
  'limpeza-inteligente': 'border-accent/30 bg-accent/5 hover:bg-accent/10 hover:border-accent/50',
  'organizacao': 'border-blue-400/30 bg-blue-400/5 hover:bg-blue-400/10 hover:border-blue-400/50',
  'utilidades': 'border-amber-400/30 bg-amber-400/5 hover:bg-amber-400/10 hover:border-amber-400/50',
  'setup-quarto': 'border-violet-400/30 bg-violet-400/5 hover:bg-violet-400/10 hover:border-violet-400/50',
};

export function CategoryBar() {
  return (
    <section className="py-10">
      <div className="container">
        <h2 className="section-title mb-6 text-center">EXPLORE POR CATEGORIA</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {Object.entries(CATEGORIES).map(([key, cat], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={`/categoria/${cat.slug}`}
                className={`category-chip ${categoryColors[key] || 'border-border bg-card'}`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="text-foreground">{cat.label}</span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
