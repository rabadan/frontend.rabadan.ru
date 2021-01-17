import React, {useEffect} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {BlogsRow} from "./BLogRow";
import {TRootState} from "../../index";
import {getBlogs} from "../../actions/BlogAction";
import i18n from "../../I18n";

const connector = connect(
  ({ BlogReducer }: TRootState) => ({
    blogs: BlogReducer.blogs
  }),
  { getBlogs },
);

type TLatestPostsProps = ConnectedProps<typeof connector>;

const LatestPostsComponent: React.FC<TLatestPostsProps> = ({blogs, getBlogs}) => {
  useEffect(() => {
    getBlogs(1);
  }, [getBlogs]);

  return (
    <section className="section" id="blog">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="section-title">
              <h2>{i18n.t('blog.latest_news')}</h2>
              <p>{i18n.t('blog.description')}</p>
            </div>
          </div>
        </div>
        <BlogsRow blogs={blogs.slice(0, 3)} />
      </div>
    </section>
  );
}

export default connector(LatestPostsComponent);