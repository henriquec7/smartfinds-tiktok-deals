import { motion } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';

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

          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-4">
            <ShieldCheck size={15} />
            Curadoria com redirecionamento seguro
          </div>

          <h2 className="section-title mb-3">VIU UM PRODUTO INTERESSANTE?</h2>

          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Clique para conferir o preço atualizado na loja oficial. Os valores podem mudar conforme disponibilidade, promoção e estoque do vendedor.
          </p>

          <a href="#destaques" className="btn-cta py-3.5 px-8 text-sm uppercase tracking-wider mt-6 inline-flex">
            CONFERIR PRODUTOS EM DESTAQUE
          </a>
        </motion.div>
      </div>
    </section>
  );
}