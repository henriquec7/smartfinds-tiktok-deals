import { Product } from './types';

const STORAGE_KEY = 'affiliate-products';

const defaultProducts: Product[] = [
  {
    id: '1',
    title: 'Organizador Multiuso que Elimina a Bagunça da Cozinha',
    description: 'Transforme sua bancada em um espaço limpo e organizado. Este organizador inteligente acomoda temperos, utensílios e acessórios em um só lugar.',
    benefits: ['Economiza espaço na bancada', 'Material resistente e durável', 'Fácil de limpar', 'Design moderno que combina com qualquer cozinha'],
    whyWorthIt: 'Se você perde tempo procurando coisas na cozinha, esse organizador resolve o problema de vez. Com compartimentos inteligentes, tudo fica à mão.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    affiliateUrl: 'https://shopee.com.br',
    category: 'cozinha-pratica',
    badge: 'destaque',
    price: 'R$ 49,90',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Mop Giratório que Limpa o Chão em Metade do Tempo',
    description: 'Chega de esfregar o chão de joelhos. Este mop giratório com balde espremedor faz a limpeza pesada ficar leve.',
    benefits: ['Sistema de centrifugação poderoso', 'Cabo ajustável', 'Refis laváveis e reutilizáveis', 'Balde com pedal prático'],
    whyWorthIt: 'Quem já usou não volta para o rodo comum. A economia de tempo e esforço é real.',
    imageUrl: 'https://images.unsplash.com/photo-1581622558663-b2e33377de14?w=600&h=400&fit=crop',
    affiliateUrl: 'https://amazon.com.br',
    category: 'limpeza-inteligente',
    badge: 'mais-visto',
    price: 'R$ 89,90',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Caixas Organizadoras Empilháveis para Qualquer Ambiente',
    description: 'Organize closet, escritório ou despensa com este kit de caixas modulares que se encaixam perfeitamente.',
    benefits: ['Empilháveis e modulares', 'Tampa com trava segura', 'Transparentes para fácil identificação', 'Resistentes e leves'],
    whyWorthIt: 'A organização muda o astral de qualquer ambiente. Com essas caixas, você ganha espaço e praticidade.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    affiliateUrl: 'https://shopee.com.br',
    category: 'organizacao',
    badge: 'bem-avaliado',
    price: 'R$ 39,90',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Luminária LED de Mesa com Carregador Wireless',
    description: 'Ilumine seu setup com estilo. Esta luminária LED tem 3 tons de luz e carrega seu celular sem fio.',
    benefits: ['3 temperaturas de cor', 'Carregador wireless integrado', 'Ajuste de intensidade', 'Design minimalista'],
    whyWorthIt: 'Dois em um: iluminação perfeita para trabalho ou estudo e carregador sempre à mão. Menos fios, mais praticidade.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=400&fit=crop',
    affiliateUrl: 'https://amazon.com.br',
    category: 'setup-quarto',
    badge: 'destaque',
    price: 'R$ 129,90',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Dispenser Automático de Sabonete Sem Contato',
    description: 'Higiene sem encostar. Sensor infravermelho libera a quantidade certa de sabonete líquido.',
    benefits: ['Sensor sem toque', 'Economia de sabonete', 'Recarregável via USB', 'À prova de respingos'],
    whyWorthIt: 'Mais higiênico, mais econômico e muito mais prático que os dispensers comuns.',
    imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=400&fit=crop',
    affiliateUrl: 'https://shopee.com.br',
    category: 'utilidades',
    badge: 'mais-visto',
    price: 'R$ 59,90',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Cortador de Legumes Multifuncional 12 em 1',
    description: 'Corte, rale, fatie e pique em segundos. Este cortador substitui 12 utensílios de cozinha.',
    benefits: ['12 lâminas diferentes', 'Protetor de dedos incluso', 'Fácil de lavar', 'Compacto para guardar'],
    whyWorthIt: 'Se você cozinha todo dia, vai economizar pelo menos 30 minutos no preparo. Testado e aprovado.',
    imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=400&fit=crop',
    affiliateUrl: 'https://amazon.com.br',
    category: 'cozinha-pratica',
    badge: 'bem-avaliado',
    price: 'R$ 69,90',
    createdAt: new Date().toISOString(),
  },
];

export function getProducts(): Product[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
  return defaultProducts;
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return getProducts().filter(p => p.category === category);
}

export function getProductsByBadge(badge: string): Product[] {
  return getProducts().filter(p => p.badge === badge);
}

export function saveProduct(product: Product): void {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index >= 0) {
    products[index] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}
