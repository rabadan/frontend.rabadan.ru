import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from "react-redux";
import {TRootState} from "../../index";
import {getBlogs} from "../../actions/BlogAction";
import i18n from "../../I18n";
import ReactPaginate from 'react-paginate';
import { animateScroll as scroll } from "react-scroll";
import { history } from '../../helpers/History';
import {useLocation} from "react-router-dom";
import {BlogsRow} from "./BLogRow";

const connector = connect(
  ({ BlogReducer }: TRootState) => ({
    blogs: BlogReducer.blogs,
    total_pages: BlogReducer.total_pages,
  }),
  { getBlogs },
);

type TBlogListProps = ConnectedProps<typeof connector>;

const BlogListComponent: React.FC<TBlogListProps> = ({blogs, total_pages, getBlogs}) => {
  const [page, setPage] = useState(0);
  const search = useLocation().search;
  const params_page = new URLSearchParams(search).get('page');

  if (page === 0) {
    if (params_page) {
      if (Number(params_page) > 1) {
        setPage(Number(params_page) - 1)
      }
    }
  }

  useEffect(() => {
    scroll.scrollToTop({duration: 100});
    getBlogs(page+1);
  }, [page, getBlogs]);

  const handlePageClick = function(paginate: any) {
    const new_page:number = paginate.selected
    setPage(new_page)
    history.push(`/blogs?page=${new_page+1}`)
  }

  let paginator;

  if (total_pages) {
    paginator = (
      <ReactPaginate
        previousLabel={i18n.t('paginator.previous')}
        nextLabel={i18n.t('paginator.next')}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={total_pages}
        marginPagesDisplayed={2}
        initialPage={page}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        activeClassName={'page-item active'}
        pageClassName={'page-item'}
        previousClassName={'page-item'}
        nextClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
      />
    )
  }

  return (
    <div className="">
      <section className="page-title dark-bg pt-4 pb-2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 white-color text-center">
              <h1>{i18n.t('blog.title')}</h1>
              <p>{i18n.t('blog.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-listing gray-bg">
        <div className="container">
          <div className="row align-items-start">
            <div className="m-15px-tb">
              <BlogsRow blogs={blogs} />

              <div className="col-12">
                {paginator}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default connector(BlogListComponent);
