import {IBlog} from '../interfaces/IBlog';
import {IAttachment} from '../interfaces/IAttachment';
import React from "react";

export default class Blog implements IBlog {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _user_id: string;
  private readonly _preview: string;
  private readonly _slug: string;
  private readonly _body: string;
  private readonly _image?: string;
  private readonly _image_crop?: string;
  private readonly _attachments: IAttachment[] | undefined;
  private readonly _created_at: string;
  private readonly _lang: string;
  private readonly _updated_at: string;

  constructor(blog: IBlog) {
    this._id = blog.id;
    this._user_id = blog.user_id;
    this._preview = blog.preview;
    this._title = blog.title;
    this._slug = blog.slug;
    this._body = blog.body;
    this._image = blog.image;
    this._image_crop = blog.image_crop;
    this._attachments = blog.attachments;
    this._lang = blog.lang;
    this._created_at = blog.created_at;
    this._updated_at = blog.updated_at;
  }

  get imageTag(): JSX.Element {
    let img:JSX.Element;
    if (this._image_crop) {
      img = (<img className='w-100' src={this._image_crop} alt={this._title} />);
    } else {
      img = (
        <svg className="bd-placeholder-img text-center"
             width="360"
             height="200"
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

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get body(): string {
    return this._body;
  }

  get preview(): string {
    return this._preview;
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

  get lang(): string {
    return this._lang;
  }

  get user_id(): string {
    return this._user_id;
  }

  get created_at(): string {
    return this._created_at;
  }
  get updated_at(): string {
    return this._updated_at;
  }
}
