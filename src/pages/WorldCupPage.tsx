import { Link } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { useProductsByCategory } from '@/hooks/useProducts';
import { ArrowRight, Trophy, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import trophyImg from '@/assets/world-cup-trophy.png';

const scrollToProducts = () => {
  const el = document.getElementById('produtos-copa');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function WorldCupPage() {
  const { data: products = [], isLoading } = useProductsByCategory('copa-do-mundo');

  return (
    <main className="min-h-screen bg-[#FFFBEB]">
      {/* HERO — Brazilian flag colors, stadium feel */}
      <section className="relative overflow-hidden bg-[#009C3B]">
        {/* Subtle stadium grid lines */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 60px), repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 60px)',
          }}
        />

        {/* Yellow diamond accent (flag motif) */}
        <div
          aria-hidden
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rotate-45 bg-[#FFDF00]/20"
        />
        <div
          aria-hidden
          className="absolute -left-40 -bottom-40 w-[400px] h-[400px] rotate-45 bg-[#002776]/30"
        />

        <div className="container relative z-10 py-12 md:py-20 grid md:grid-cols-[1.1fr_auto] gap-8 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 text-[#FFDF00] font-mono text-xs tracking-[0.3em] uppercase"
            >
              <span className="h-px w-8 bg-[#FFDF00]" />
              <Trophy size={14} />
              Especial Mundial 2026
              <span className="h-px w-8 bg-[#FFDF00]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 font-heading font-black uppercase text-white leading-[0.9] text-5xl md:text-7xl tracking-tight"
            >
              É hexa
              <br />
              ou nada.
              <span className="block text-[#FFDF00] mt-2">Bora torcer.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-lg text-white/90 text-base md:text-lg leading-relaxed"
            >
              Camisas, decoração da sala, álbum de figurinhas, churrasco completo
              e tudo que o brasileiro precisa pra viver a Copa do jeito certo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-widest text-white/70"
            >
              <span className="flex items-center gap-2">
                <Calendar size={13} className="text-[#FFDF00]" /> Junho · Julho 2026
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={13} className="text-[#FFDF00]" /> EUA · México · Canadá
              </span>
            </motion.div>

            <motion.button
              onClick={scrollToProducts}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-3 bg-[#FFDF00] hover:bg-[#FFE94D] text-[#002776] font-black uppercase tracking-wider text-sm px-7 py-4 rounded-full shadow-[0_8px_0_0_#002776] hover:shadow-[0_4px_0_0_#002776] hover:translate-y-[4px] transition-all"
            >
              Ver os achadinhos da Copa
              <ArrowRight size={18} />
            </motion.button>
          </div>

          {/* Trophy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 70 }}
            className="hidden md:block relative"
          >
            <div className="absolute inset-0 bg-[#FFDF00] rounded-full blur-3xl opacity-30" />
            <motion.img
              src={trophyImg}
              alt="Taça da Copa do Mundo"
              width={1024}
              height={1024}
              className="relative w-72 lg:w-80 h-auto drop-shadow-[0_25px_30px_rgba(0,0,0,0.5)]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Bottom flag stripe */}
        <div className="relative z-10 flex h-3">
          <div className="flex-1 bg-[#009C3B]" />
          <div className="flex-1 bg-[#FFDF00]" />
          <div className="flex-1 bg-[#002776]" />
          <div className="flex-1 bg-white" />
        </div>
      </section>

      {/* Editorial intro band */}
      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: 'Pra torcer em casa',
              desc: 'Camisa, bandeira, buzina e tudo que faz a vizinhança saber que tem jogo.',
            },
            {
              num: '02',
              title: 'Pra decorar de verdade',
              desc: 'Painel, cortina, balão metalizado e enfeite de mesa pros dias de jogo.',
            },
            {
              num: '03',
              title: 'Pra colecionar',
              desc: 'Álbum oficial, pacotes de figurinhas, miniaturas da taça e bola oficial.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white border-l-4 border-[#009C3B] p-6 rounded-r-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="font-mono text-xs tracking-widest text-[#009C3B] font-bold">
                #{item.num}
              </span>
              <h3 className="mt-2 font-heading font-black uppercase text-xl text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products section */}
      <section id="produtos-copa" className="container pb-16 scroll-mt-24">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b-2 border-[#009C3B] pb-4">
          <div>
            <div className="font-mono text-xs tracking-[0.3em] uppercase text-[#009C3B] font-bold">
              Vitrine · Copa do Mundo
            </div>
            <h2 className="mt-1 font-heading font-black uppercase text-3xl md:text-4xl text-foreground">
              Os achadinhos da seleção
            </h2>
          </div>
          <Link
            to="/"
            className="text-sm font-bold uppercase tracking-wider text-[#002776] hover:text-[#009C3B] transition-colors"
          >
            ← Voltar para KS Deals
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-16 text-muted-foreground">
            Carregando produtos...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[#009C3B]/40 bg-white p-12 text-center">
            <Trophy size={36} className="mx-auto text-[#009C3B]" />
            <h3 className="mt-3 font-heading font-black uppercase text-lg">
              Vitrine em preparação
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Os achadinhos da Copa estão chegando. Volte em breve para conferir as novidades selecionadas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
