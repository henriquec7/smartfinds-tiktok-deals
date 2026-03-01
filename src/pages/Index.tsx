import { HeroSection } from '@/components/HeroSection';
import { CategoryBar } from '@/components/CategoryBar';
import { ProductSection } from '@/components/ProductSection';
import { ConversionBanner } from '@/components/ConversionBanner';
import { getProducts } from '@/lib/products';

const Index = () => {
  const products = getProducts();

  const destaques = products.filter(p => p.badge === 'destaque');
  const maisVistos = products.filter(p => p.badge === 'mais-visto');
  const bemAvaliados = products.filter(p => p.badge === 'bem-avaliado');

  return (
    <main>
      <HeroSection />
      <CategoryBar />
      <ProductSection title="PRODUTOS EM DESTAQUE" emoji="🔥" products={destaques} id="destaques" />
      <ProductSection title="MAIS VISTOS" emoji="👀" products={maisVistos} />
      <ConversionBanner />
      <ProductSection title="MAIS BEM AVALIADOS" emoji="⭐" products={bemAvaliados} />
    </main>
  );
};

export default Index;
