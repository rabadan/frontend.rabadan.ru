import {IBlog} from "../../interfaces/IBlog";
import i18n from "../../I18n";
import {Link} from "react-router-dom";
import React from "react";

export function BlogsRow(props: { blogs: IBlog[]; }) {
  const blogs = props.blogs;
  const listItems = blogs.map(( blog, index ) =>
    <div key={ index.toString() } className="col-sm-4">
      <div className="blog-grid">
        <div className="blog-img">
          <div className="date">
              <span>
                {new Date(blog.created_at).getDate()}
              </span>
            <label>
              {i18n.t(`date.${new Date(blog.created_at).getUTCMonth()}`)}
            </label>
          </div>
          <Link to={`/${i18n.locale}/blogs/${blog.slug}`}>
            {blog.imageTag}
          </Link>
        </div>
        <div className="blog-info">
          <h5>
            <Link to={`/${i18n.locale}/blogs/${blog.slug}`}>
              {blog.title}
            </Link>
          </h5>
          <p>{blog.preview}</p>
          <div className="btn-bar">
            <Link to={`/${i18n.locale}/blogs/${blog.slug}`} className="px-btn-arrow">
              <span>
                {i18n.t('actions.read_more')}
              </span>
              <i className="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="row">
      { listItems }
    </div>
  );
}
