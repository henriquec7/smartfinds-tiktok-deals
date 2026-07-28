import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/lib/types';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const categoryColors: Record<string, string> = {
  'cozinha': 'border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50',
  'organizacao': 'border-emerald-400/30 bg-emerald-400/5 hover:bg-emerald-400/10 hover:border-emerald-400/50',
  'casa-decor': 'border-amber-400/30 bg-amber-400/5 hover:bg-amber-400/10 hover:border-amber-400/50',
  'utensilios': 'border-rose-400/30 bg-rose-400/5 hover:bg-rose-400/10 hover:border-rose-400/50',
  'limpeza': 'border-sky-400/30 bg-sky-400/5 hover:bg-sky-400/10 hover:border-sky-400/50',
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
