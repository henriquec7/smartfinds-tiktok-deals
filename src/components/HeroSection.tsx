import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
          Produtos Inteligentes Que{' '}
          <span className="text-primary">Facilitam Sua Vida</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mt-4 max-w-lg mx-auto">
          Selecionamos os melhores produtos com custo-benefício incrível para o seu dia a dia. Testados e aprovados.
        </p>
      </motion.div>
    </section>
  );
}
