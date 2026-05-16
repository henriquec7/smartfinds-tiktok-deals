import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl mx-4 md:mx-auto max-w-[1200px] mt-4">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 px-6 py-16 md:py-24 md:px-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <TrendingUp size={14} />
            ACHADINHOS E OFERTAS DO MOMENTO
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading uppercase leading-[1.1] text-primary-foreground tracking-tight">
            PRODUTOS QUE ESTÃO EM ALTA E{' '}
            <span className="text-primary">VALEM O CLIQUE</span>
          </h1>

          <p className="text-primary-foreground/80 text-base md:text-lg mt-5 max-w-lg leading-relaxed">
            Uma vitrine com produtos selecionados por categoria para você conferir o preço atualizado direto na loja oficial.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-primary-foreground/85 text-xs font-semibold uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-primary" />
              Produtos escolhidos a dedo
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-primary" />
              Compra finalizada na loja oficial
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              type="button"
              onClick={() => document.getElementById('destaques')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-cta py-4 px-8 text-sm uppercase tracking-wider"
            >
              VER PRODUTOS EM DESTAQUE <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}