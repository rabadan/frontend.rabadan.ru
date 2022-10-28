import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../../index";
import {getBlog} from "../../actions/BlogAction";
import i18n from "../../I18n";
import {Link, useHistory} from "react-router-dom";


const connector = connect(
  ({BlogReducer, ConfigurationReducer}: TRootState, {match}: any) => ({
    blog: BlogReducer.blog,
    lang: ConfigurationReducer.lang,
    slug: match.params.slug
  }),
  {getBlog}
);

type TBlogProps = ConnectedProps<typeof connector>;

const BlogItemComponent: React.FC<TBlogProps> = ({blog, slug, getBlog}) => {
  const history = useHistory();

  useEffect(() => {
    getBlog(slug)
  }, [slug, getBlog]);

  if (blog === undefined) {
    return (
      <div>
        {i18n.t('actions.loading')}
      </div>
    );
  }

  return (
    <div className="gray-bg pb-5">
      <section className="page-title dark-bg pt-4 pb-2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 white-color text-center">
              <h1>{blog.title}</h1>
              <p>{blog.preview}</p>
            </div>
          </div>
        </div>
      </section>
      <div className='px-3 pt-1'>
        <div>
          <article className="article">
            {
              blog.image &&
              (<div className="article-img mb-3"><img src={blog.image} title={blog.title} alt={blog.title}/></div>)
            }
            <div className="article-title py-0">
              <h6><a href="/blogs">{blog.category}</a></h6>
            </div>
            <div className="article-content">
              <div dangerouslySetInnerHTML={{__html: blog.body}}/>
            </div>
            <div className="nav tag-cloud mt-3">
              {blog.tag_list && blog.tag_list.map((value) => {
                return (<Link to="#">{value}</Link>);
              })}
            </div>
            <div className="btn-bar mt-4">
              <Link to='#' onClick={() => history.goBack()}>
                <i className='fa fa-arrow-left mr-2 fa-xs'></i>
                <small>{i18n.t('navbar.back')}</small>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default connector(BlogItemComponent);
