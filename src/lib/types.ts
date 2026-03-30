export interface Post {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePostInput {
  title: string;
  subtitle?: string;
  slug: string;
  content: string;
  cover_image_url?: string;
  published: boolean;
}
