import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../../index";
import {IBlog} from "../../interfaces/IBlog";
import {getBlogs} from "../../actions/BlogAction";
// @ts-ignore
import Time from 'react-time-format'
import {Link} from "react-router-dom";
import i18n from "../../I18n";

const connector = connect(
  ({ BlogReducer }: TRootState) => ({
    blogs: BlogReducer.blogs,
  }),
  { getBlogs },
);

type TBlogListProps = ConnectedProps<typeof connector>;

const BlogListComponent: React.FC<TBlogListProps> = ({blogs, getBlogs}) => {
  useEffect(() => {
    getBlogs()
  }, [getBlogs]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>{i18n.t('blog.title')}</h1>
      </header>
      <div>
        <BlogsRow blogs={blogs} />
      </div>
    </div>
  );
}

function BlogsRow(props: { blogs: IBlog[]; }) {
  // для удобства записываем значение props.users в переменную users
  const blogs = props.blogs;
  // используя метод map() и заполняем данными тег li
  const listItems = blogs.map(( blog, index ) =>
    <div key={ index.toString() } className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <h3 className="mb-0 mt-0">{ blog.title }</h3>
        <div className="mb-1 text-muted">
          <Time value={blog.created_at} format="YYYY-MM-DD" />
        </div>
        <p className="card-text mb-auto">{ blog.preview }</p>
        <Link to={`/blogs/${blog.slug}`} className="stretched-link">
          {i18n.t('blog.continue_reading')}
        </Link>
      </div>
      <div className="col-auto d-none d-lg-block">
        {blog.imageTag}
      </div>
    </div>
  );
  // Возвращаем список с именами пользователей
  return (
    <div> { listItems } </div>
  );
}


export default connector(BlogListComponent);
