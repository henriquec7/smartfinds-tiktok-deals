import { HeroSection } from '@/components/HeroSection';
import { ProductSection } from '@/components/ProductSection';
import { getProducts } from '@/lib/products';

const Index = () => {
  const products = getProducts();

  const destaques = products.filter(p => p.badge === 'destaque');
  const maisVistos = products.filter(p => p.badge === 'mais-visto');
  const bemAvaliados = products.filter(p => p.badge === 'bem-avaliado');

  return (
    <main className="container">
      <HeroSection />
      <ProductSection title="Produtos em Destaque" emoji="🔥" products={destaques} />
      <ProductSection title="Mais Vistos" emoji="👀" products={maisVistos} />
      <ProductSection title="Mais Bem Avaliados" emoji="⭐" products={bemAvaliados} />
    </main>
  );
};

export default Index;
