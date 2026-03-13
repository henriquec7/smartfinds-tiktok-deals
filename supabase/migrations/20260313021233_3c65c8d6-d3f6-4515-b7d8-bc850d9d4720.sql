
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  why_worth_it TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  affiliate_url TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'cozinha-pratica',
  badge TEXT,
  price TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public can read all products
CREATE POLICY "Anyone can read products"
  ON public.products FOR SELECT
  USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update
CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed default products
INSERT INTO public.products (title, description, benefits, why_worth_it, image_url, affiliate_url, category, badge, price) VALUES
  ('Organizador Multiuso que Elimina a Bagunça da Cozinha', 'Transforme sua bancada em um espaço limpo e organizado. Este organizador inteligente acomoda temperos, utensílios e acessórios em um só lugar.', ARRAY['Economiza espaço na bancada', 'Material resistente e durável', 'Fácil de limpar', 'Design moderno que combina com qualquer cozinha'], 'Se você perde tempo procurando coisas na cozinha, esse organizador resolve o problema de vez. Com compartimentos inteligentes, tudo fica à mão.', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop', 'https://shopee.com.br', 'cozinha-pratica', 'destaque', 'R$ 49,90'),
  ('Mop Giratório que Limpa o Chão em Metade do Tempo', 'Chega de esfregar o chão de joelhos. Este mop giratório com balde espremedor faz a limpeza pesada ficar leve.', ARRAY['Sistema de centrifugação poderoso', 'Cabo ajustável', 'Refis laváveis e reutilizáveis', 'Balde com pedal prático'], 'Quem já usou não volta para o rodo comum. A economia de tempo e esforço é real.', 'https://images.unsplash.com/photo-1581622558663-b2e33377de14?w=600&h=400&fit=crop', 'https://amazon.com.br', 'limpeza-inteligente', 'mais-visto', 'R$ 89,90'),
  ('Caixas Organizadoras Empilháveis para Qualquer Ambiente', 'Organize closet, escritório ou despensa com este kit de caixas modulares que se encaixam perfeitamente.', ARRAY['Empilháveis e modulares', 'Tampa com trava segura', 'Transparentes para fácil identificação', 'Resistentes e leves'], 'A organização muda o astral de qualquer ambiente. Com essas caixas, você ganha espaço e praticidade.', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', 'https://shopee.com.br', 'organizacao', 'bem-avaliado', 'R$ 39,90'),
  ('Luminária LED de Mesa com Carregador Wireless', 'Ilumine seu setup com estilo. Esta luminária LED tem 3 tons de luz e carrega seu celular sem fio.', ARRAY['3 temperaturas de cor', 'Carregador wireless integrado', 'Ajuste de intensidade', 'Design minimalista'], 'Dois em um: iluminação perfeita para trabalho ou estudo e carregador sempre à mão. Menos fios, mais praticidade.', 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=400&fit=crop', 'https://amazon.com.br', 'setup-quarto', 'destaque', 'R$ 129,90'),
  ('Dispenser Automático de Sabonete Sem Contato', 'Higiene sem encostar. Sensor infravermelho libera a quantidade certa de sabonete líquido.', ARRAY['Sensor sem toque', 'Economia de sabonete', 'Recarregável via USB', 'À prova de respingos'], 'Mais higiênico, mais econômico e muito mais prático que os dispensers comuns.', 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=400&fit=crop', 'https://shopee.com.br', 'utilidades', 'mais-visto', 'R$ 59,90'),
  ('Cortador de Legumes Multifuncional 12 em 1', 'Corte, rale, fatie e pique em segundos. Este cortador substitui 12 utensílios de cozinha.', ARRAY['12 lâminas diferentes', 'Protetor de dedos incluso', 'Fácil de lavar', 'Compacto para guardar'], 'Se você cozinha todo dia, vai economizar pelo menos 30 minutos no preparo. Testado e aprovado.', 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=400&fit=crop', 'https://amazon.com.br', 'cozinha-pratica', 'bem-avaliado', 'R$ 69,90');
