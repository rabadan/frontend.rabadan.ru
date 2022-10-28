import {IPagination} from "./IPagination";

export interface IBlog {
  id: string,
  title: string,
  slug: string,
  preview: string,
  body: string,
  category?: string,
  tag_list: string[],
  image?: string,
  image_crop?: string,
  imageTag?: JSX.Element,
  user_id: string,
  lang: string,
  created_at: string,
  updated_at: string,
}

export interface TBlog {
  id: string,
  title: string,
  slug: string,
  preview: string,
  body: string,
  category?: string,
  tag_list: string[],
  image?: string,
  image_crop?: string,
  user_id: string,
  lang: string,
  created_at: string,
  updated_at: string
}

export interface TBlogListResponse {
  blogs: TBlog[],
  pagination: IPagination
}

export interface TBlogResponse {
  blog: TBlog
}
