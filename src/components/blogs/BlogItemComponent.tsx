import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../../index";
import {getBlog} from "../../actions/BlogAction";
import i18n from "../../I18n";

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
            </div>
          </div>
        </div>
      </section>
      <div className='px-3 pt-1'>
        <div>
          <article className="article">
            <div className="article-img">
              <img src={ blog.image } title="" alt="" />
            </div>
            <div className="article-title pb-0">
              <h6><a href="/blogs">Lifestyle</a></h6>
              <h2>{ blog.title }</h2>
            </div>
            <div className="article-content">
              <div dangerouslySetInnerHTML={{__html: blog.body}} />
            </div>
            <div className="nav tag-cloud mt-3">
              <a href="/blogs">Design</a>
              <a href="/blogs">Development</a>
              <a href="/blogs">Travel</a>
              <a href="/blogs">Web Design</a>
              <a href="/blogs">Marketing</a>
              <a href="/blogs">Research</a>
              <a href="/blogs">Managment</a>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default connector(BlogItemComponent);
