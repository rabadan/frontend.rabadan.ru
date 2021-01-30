import {IPage, IPageResponse} from '../interfaces/IPage';
import {IAttachment} from "../interfaces/IAttachment";
import React from "react";

export default class Page implements IPage {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _h1: string;
  private readonly _slug: string;
  private readonly _breadcrumb: string;
  private readonly _body: string;
  private readonly _image?: string;
  private readonly _image_crop?: string;
  private readonly _attachments?: IAttachment[] | undefined;
  private readonly _footer: string;
  private readonly _seo_desc: string;
  private readonly _seo_key: string;
  private readonly _lang: string;
  private readonly _created_at: string;
  private readonly _updated_at: string;

  constructor(page: IPageResponse) {
    this._id = page.id;
    this._title = page.title;
    this._h1 = page.h1;
    this._slug = page.slug;
    this._breadcrumb = page.breadcrumb;
    this._body = page.body;
    this._image = page.image;
    this._image_crop = page.image_crop;
    this._attachments = page.attachments;
    this._footer = page.footer;
    this._seo_desc = page.seo_desc;
    this._seo_key = page.seo_key;
    this._lang = page.lang;
    this._created_at = page.created_at;
    this._updated_at = page.updated_at;
  }

  get id(): string {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get h1(): string {
    return this._h1;
  }
  get breadcrumb(): string {
    return this._breadcrumb;
  }
  get body(): string {
    return this._body;
  }
  get footer(): string {
    return this._footer;
  }
  get image(): string | undefined {
    return this._image;
  }
  get image_crop(): string | undefined {
    return this._image_crop;
  }
  get slug(): string {
    return this._slug;
  }
  get seo_desc(): string {
    return this._slug;
  }
  get seo_key(): string {
    return this._slug;
  }
  get lang(): string {
    return this._lang;
  }
  get created_at(): string {
    return this._created_at;
  }
  get updated_at(): string {
    return this._updated_at;
  }

  get imageTag(): JSX.Element {
    let img:JSX.Element;
    if (this._image_crop) {
      img = (<img className='w-100' src={this._image_crop} alt={this._title} />);
    } else {
      img = (
        <svg className="bd-placeholder-img text-center"
             width="360"
             height="360"
             xmlns="http://www.w3.org/2000/svg"
             preserveAspectRatio="xMidYMid slice"
             focusable="false"
             role="img"
             aria-label="Placeholder: Thumbnail">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c" />
          <text x="40%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
        </svg>);
    }

    return img
  }
}