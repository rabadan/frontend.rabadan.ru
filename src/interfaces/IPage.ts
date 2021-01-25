import {IAttachment} from "./IAttachment";

export interface IPage {
  id: string,
  title: string,
  h1: string,
  slug: string,
  breadcrumb: string,
  body: string,
  image?: string,
  image_crop?: string,
  attachments?: IAttachment[],
  footer: string,
  seo_desc: string,
  seo_key: string,
  lang: string,
  created_at: string,
  updated_at: string,
  imageTag?: JSX.Element,
}

export type TPage = {
  id: string,
  title: string,
  h1: string,
  slug: string,
  breadcrumb: string,
  body: string,
  image?: string,
  image_crop?: string,
  attachments?: IAttachment[],
  footer: string,
  seo_desc: string,
  seo_key: string,
  created_at: string,
  updated_at: string,
}

export interface IPageResponse {
  id: string,
  title: string,
  h1: string,
  slug: string,
  breadcrumb: string,
  body: string,
  image?: string,
  image_crop?: string,
  attachments?: IAttachment[],
  footer: string,
  seo_desc: string,
  seo_key: string,
  lang: string,
  created_at: string,
  updated_at: string,
}
