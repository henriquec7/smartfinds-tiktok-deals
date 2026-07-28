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
  | 'cozinha'
  | 'organizacao'
  | 'casa-decor'
  | 'utensilios'
  | 'limpeza';

export const CATEGORIES: Record<Category, { label: string; icon: string; slug: string }> = {
  'cozinha': { label: 'Cozinha', icon: '🍳', slug: 'cozinha' },
  'organizacao': { label: 'Organização', icon: '🧺', slug: 'organizacao' },
  'casa-decor': { label: 'Casa & Decoração', icon: '🏠', slug: 'casa-decor' },
  'utensilios': { label: 'Utensílios', icon: '✨', slug: 'utensilios' },
  'limpeza': { label: 'Limpeza', icon: '🧽', slug: 'limpeza' },
};
