export interface Product {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  whyWorthIt: string;
  imageUrl: string;
  affiliateUrl: string;
  category: Category;
  badge?: 'destaque' | 'mais-visto' | 'bem-avaliado';
  price?: string;
  createdAt: string;
}

export type Category =
  | 'funko-pop'
  | 'perifericos'
  | 'hardware'
  | 'setup-gamer'
  | 'acessorios';

export const CATEGORIES: Record<Category, { label: string; icon: string; slug: string }> = {
  'funko-pop': { label: 'Funko Pop', icon: '🎭', slug: 'funko-pop' },
  'perifericos': { label: 'Periféricos', icon: '🎮', slug: 'perifericos' },
  'hardware': { label: 'Hardware', icon: '💻', slug: 'hardware' },
  'setup-gamer': { label: 'Setup Gamer', icon: '🖥️', slug: 'setup-gamer' },
  'acessorios': { label: 'Acessórios', icon: '🎧', slug: 'acessorios' },
};
