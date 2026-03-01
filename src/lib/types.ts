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
  | 'cozinha-pratica'
  | 'limpeza-inteligente'
  | 'organizacao'
  | 'utilidades'
  | 'setup-quarto';

export const CATEGORIES: Record<Category, { label: string; icon: string; slug: string }> = {
  'cozinha-pratica': { label: 'Cozinha Prática', icon: '🍳', slug: 'cozinha-pratica' },
  'limpeza-inteligente': { label: 'Limpeza Inteligente', icon: '✨', slug: 'limpeza-inteligente' },
  'organizacao': { label: 'Organização', icon: '📦', slug: 'organizacao' },
  'utilidades': { label: 'Utilidades do Dia a Dia', icon: '🛠️', slug: 'utilidades' },
  'setup-quarto': { label: 'Setup & Quarto', icon: '🖥️', slug: 'setup-quarto' },
};
