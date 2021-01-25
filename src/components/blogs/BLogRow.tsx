import {IBlog} from "../../interfaces/IBlog";
import i18n from "../../I18n";
import {Link} from "react-router-dom";
import React from "react";

export function BlogsRow(props: { blogs: IBlog[]; }) {
  // для удобства записываем значение props.users в переменную users
  const blogs = props.blogs;
  // используя метод map() и заполняем данными тег li
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
              <span>Read More</span>
              <i className="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // Возвращаем список с именами пользователей
  return (
    <div className="row">
      { listItems }
    </div>
  );
}
