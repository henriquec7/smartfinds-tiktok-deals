import { Link } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { useProductsByCategory } from '@/hooks/useProducts';
import { ArrowRight, Trophy, Sparkles, Flag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import trophyImg from '@/assets/world-cup-trophy.png';

const COLOR_DOTS = ['#e63946', '#f4a261', '#fcbf49', '#2a9d8f', '#1d4ed8', '#7c3aed'];

const scrollToProducts = () => {
  const el = document.getElementById('produtos-copa');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function WorldCupPage() {
  const { data: products = [], isLoading } = useProductsByCategory('copa-do-mundo');

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff4ec] via-white to-[#fff4ec] overflow-hidden">
      <section className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border-2 border-[#ff5722]/30 bg-gradient-to-br from-[#ff5722] via-[#e63946] to-[#7c3aed] p-6 md:p-12 text-white shadow-2xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-yellow-400 via-green-400 to-blue-500 opacity-40 blur-2xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 opacity-40 blur-2xl"
          />

          {COLOR_DOTS.map((color, i) => (
            <motion.div
              key={i}
              className="absolute h-4 w-4 rounded-full hidden md:block"
              style={{
                background: color,
                top: `${15 + i * 12}%`,
                right: `${5 + (i % 3) * 4}%`,
              }}
              animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-black uppercase tracking-widest backdrop-blur-md border border-white/30"
              >
                <Trophy size={15} className="text-yellow-300" />
                Especial Copa do Mundo 2026
              </motion.div>

              <h1 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl drop-shadow-lg">
                Entre no <span className="text-yellow-300">clima</span> da{' '}
                <span className="bg-gradient-to-r from-yellow-300 via-green-300 to-blue-300 bg-clip-text text-transparent">
                  Copa
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/95 md:text-base">
                Achadinhos temáticos para torcida, decoração, álbum de figurinhas e tudo que faz a festa do mundial.
              </p>

              <div className="mt-6 grid gap-3 text-xs font-black uppercase tracking-wider sm:grid-cols-3">
                {[
                  { icon: Flag, label: 'Torcida' },
                  { icon: Star, label: 'Temáticos' },
                  { icon: Sparkles, label: 'Ofertas' },
                ].map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-2 rounded-2xl bg-white/15 p-3 backdrop-blur-sm border border-white/20"
                  >
                    <Icon size={15} className="text-yellow-300" /> {label}
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={scrollToProducts}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-black uppercase tracking-wider text-[#ff5722] shadow-2xl"
              >
                Ver produtos da Copa <ArrowRight size={16} />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
              className="hidden md:flex justify-center items-center relative"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-yellow-300 rounded-full blur-3xl"
              />
              <motion.img
                src={trophyImg}
                alt="Taça da Copa do Mundo"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative h-64 lg:h-80 w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="produtos-copa" className="container py-10 scroll-mt-24">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#ff5722]">
              <Trophy size={15} /> Vitrine da Copa
            </div>
            <h2 className="mt-2 text-2xl font-black uppercase text-foreground md:text-3xl">
              Produtos temáticos selecionados
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Cadastre seus produtos no admin usando a categoria "Copa do Mundo" para aparecerem automaticamente aqui.
            </p>
          </div>

          <Link
            to="/"
            className="text-sm font-bold uppercase tracking-wider text-[#ff5722] hover:text-[#c4421a]"
          >
            Voltar para KS Deals
          </Link>
        </div>

        {isLoading ? (
          <div className="rounded-3xl bg-white p-10 text-center text-muted-foreground">
            Carregando produtos da Copa...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-[#ff5722]/40 bg-white p-10 text-center">
            <h3 className="text-lg font-black uppercase text-foreground">Nenhum produto da Copa ainda</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Entre no admin, cadastre um produto e selecione a categoria "Copa do Mundo".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
