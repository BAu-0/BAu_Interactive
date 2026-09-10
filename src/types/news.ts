export type NewsCategory = 'anuncio' | 'actualizacion' | 'notas_de_version' | 'desarrollo';

export interface NewsPost {
  id: string;
  slug: string;
  game_id?: string | null;
  game_title?: string;
  title: string;
  excerpt: string;
  body: string;
  category: NewsCategory;
  cover_image_path?: string | null;
  cover_alt?: string | null;
  status: 'draft' | 'published' | 'archived';
  author_name: string;
  seo_title?: string | null;
  seo_description?: string | null;
  published_at: string;
}
