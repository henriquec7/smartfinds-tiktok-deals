import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function ConversionBanner() {
  return (
    <section className="py-10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="warm-section rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 animate-float">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Zap size={20} className="text-primary" />
            </div>
          </div>

          <h2 className="section-title mb-3">ENCONTROU ALGO QUE GOSTOU?</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            Todos os nossos produtos são cuidadosamente selecionados com foco em qualidade e custo-benefício. 
            Os preços podem variar, então aproveite enquanto estão disponíveis!
          </p>
          <a href="#destaques" className="btn-cta py-3.5 px-8 text-sm uppercase tracking-wider mt-6 inline-flex">
            VERIFICAR DISPONIBILIDADE
          </a>
        </motion.div>
      </div>
    </section>
  );
}
