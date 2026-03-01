import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl mx-4 md:mx-auto max-w-[1200px] mt-4">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-16 md:py-24 md:px-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <TrendingUp size={14} />
            CURADORIA EXCLUSIVA
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading uppercase leading-[1.1] text-primary-foreground tracking-tight">
            PRODUTOS INTELIGENTES QUE{' '}
            <span className="text-primary">FACILITAM SUA VIDA</span>
          </h1>

          <p className="text-primary-foreground/80 text-base md:text-lg mt-5 max-w-lg leading-relaxed">
            Selecionamos os melhores produtos com custo-benefício incrível. Testados, aprovados e prontos para transformar seu dia a dia.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a href="#destaques" className="btn-cta py-4 px-8 text-sm uppercase tracking-wider">
              VER DESTAQUES <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
