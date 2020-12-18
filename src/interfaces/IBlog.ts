export interface IBlog {
  id: string,
  title: string,
  slug: string,
  preview: string,
  body: string,
  photo?: string,
  user_id: string,
  created_at: string,
  updated_at: string,
}

export type TBlog = {
  id: string,
  title: string,
  slug: string,
  preview: string,
  body: string,
  photo?: string,
  user_id: string,
  created_at: string,
  updated_at: string,
}

export interface TBlogResponse {
  id: string,
  title: string,
  slug: string,
  preview: string,
  body: string,
  photo?: string,
  user_id: string,
  created_at: string,
  updated_at: string,
}
