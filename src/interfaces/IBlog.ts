export interface IAttachment {
  title: string,
  value: string
}

export interface IBlog {
  id: string,
  title: string,
  slug: string,
  preview: string,
  body: string,
  image?: string,
  image_crop?: string,
  imageTag?: JSX.Element,
  attachments?: IAttachment[],
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
  image?: string,
  image_crop?: string,
  attachments?: IAttachment[],
  user_id: string,
  created_at: string,
  updated_at: string,
}

export interface TBlogListResponse {
  posts: TBlogResponse[],
  total_pages: number
}

export interface TBlogResponse {
  id: string,
  title: string,
  slug: string,
  preview: string,
  body: string,
  image?: string,
  image_crop?: string,
  attachments?: IAttachment[],
  user_id: string,
  created_at: string,
  updated_at: string,
}
