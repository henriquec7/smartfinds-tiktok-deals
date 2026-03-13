import { supabase } from '@/integrations/supabase/client';
import { Product, Category } from './types';

interface DbProduct {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  why_worth_it: string;
  image_url: string;
  affiliate_url: string;
  category: string;
  badge: string | null;
  price: string | null;
  created_at: string;
}

function mapDbToProduct(row: DbProduct): Product {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    benefits: row.benefits || [],
    whyWorthIt: row.why_worth_it,
    imageUrl: row.image_url,
    affiliateUrl: row.affiliate_url,
    category: row.category as Category,
    badge: row.badge as Product['badge'] || undefined,
    price: row.price || '',
    createdAt: row.created_at,
  };
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(mapDbToProduct);
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapDbToProduct(data) : undefined;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(mapDbToProduct);
}

export async function getProductsByBadge(badge: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('badge', badge)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(mapDbToProduct);
}

export async function saveProduct(product: Product): Promise<void> {
  const row = {
    id: product.id,
    title: product.title,
    description: product.description,
    benefits: product.benefits,
    why_worth_it: product.whyWorthIt,
    image_url: product.imageUrl,
    affiliate_url: product.affiliateUrl,
    category: product.category,
    badge: product.badge || null,
    price: product.price || '',
  };

  const { error } = await supabase
    .from('products')
    .upsert(row, { onConflict: 'id' });

  if (error) throw error;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
