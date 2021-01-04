import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../../index";
import {IBlog} from "../../interfaces/IBlog";
import {getBlog} from "../../actions/BlogAction";
// @ts-ignore
import Time from 'react-time-format'
import i18n from "../../I18n";
import {Link} from "react-router-dom";

const connector = connect(
  ({ BlogReducer }: TRootState, {match}: any) => ({
    blog: BlogReducer.blog,
    slug: match.params.slug
  }),
  { getBlog }
);

type TBlogProps = ConnectedProps<typeof connector>;

const BlogItemComponent: React.FC<TBlogProps> = ({blog, slug, getBlog}) => {
  useEffect(() => {
    getBlog(slug)
  }, [slug, getBlog]);

  return (
    <div className="container">
      <div>
        <BlogPage blog={blog} />
      </div>
    </div>
  );
}

function BlogPage(props: { blog?: IBlog; }) {
  // для удобства записываем значение props.users в переменную users
  if (props.blog === undefined) {
    return (
      <div>
        {i18n.t('actions.loading')}
      </div>
    );
  }
  const blog = props.blog;

  return (
    <div>
      <div key={ blog.id } className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <h3 className="mb-0 mt-0">{ blog.title }</h3>
          <div className="mb-1 text-muted">
            <Time value={blog.created_at} format="YYYY-MM-DD" />
          </div>
          <p className="card-text mb-auto">{ blog.preview }</p>
        </div>
        <div className="col-auto d-none d-lg-block">
          {blog.imageTag}
        </div>
      </div>
      <div className="mt-3 shadow border rounded bg-white p-3">
        <div dangerouslySetInnerHTML={{__html: blog.body}} />
      </div>
      <Link to={`/blogs/edit/${blog.slug}`}>
        {i18n.t('actions.update')}
      </Link>
    </div>
  );
}

export default connector(BlogItemComponent);
