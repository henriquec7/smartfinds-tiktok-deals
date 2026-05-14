import { Link } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { useProductsByCategory } from '@/hooks/useProducts';
import { ArrowRight, Trophy, Sparkles, Flag, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorldCupPage() {
  const { data: products = [], isLoading } = useProductsByCategory('copa-do-mundo');

  return (
    <main className="min-h-screen bg-[#f7fff8]">
      <section className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-green-200 bg-gradient-to-br from-green-700 via-green-600 to-yellow-400 p-6 md:p-10 text-white shadow-xl"
        >
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-yellow-300/30 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-700/30 blur-2xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <Trophy size={15} />
              Especial Copa do Mundo
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl">
              Achadinhos para entrar no clima da Copa
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
              Produtos temáticos para torcida, decoração, álbum de figurinhas, presentes e tudo que combina com a energia da Copa.
            </p>

            <div className="mt-6 grid gap-3 text-xs font-bold uppercase tracking-wider sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-2xl bg-white/12 p-3 backdrop-blur-sm">
                <Flag size={15} /> Torcida e decoração
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white/12 p-3 backdrop-blur-sm">
                <Star size={15} /> Produtos temáticos
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white/12 p-3 backdrop-blur-sm">
                <Sparkles size={15} /> Ofertas selecionadas
              </div>
            </div>

            <a
              href="#produtos-copa"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-black uppercase tracking-wider text-green-800 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Ver produtos da Copa <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </section>

      <section id="produtos-copa" className="container py-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-700">
              <Trophy size={15} /> Vitrine da Copa
            </div>
            <h2 className="mt-2 text-2xl font-black uppercase text-foreground md:text-3xl">
              Produtos temáticos selecionados
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Cadastre seus produtos no admin usando a categoria “Copa do Mundo” para aparecerem automaticamente aqui.
            </p>
          </div>

          <Link
            to="/"
            className="text-sm font-bold uppercase tracking-wider text-green-700 hover:text-green-900"
          >
            Voltar para KS Deals
          </Link>
        </div>

        {isLoading ? (
          <div className="rounded-3xl bg-white p-10 text-center text-muted-foreground">
            Carregando produtos da Copa...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-green-300 bg-white p-10 text-center">
            <h3 className="text-lg font-black uppercase text-foreground">Nenhum produto da Copa ainda</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Entre no admin, cadastre um produto e selecione a categoria “Copa do Mundo”.
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
